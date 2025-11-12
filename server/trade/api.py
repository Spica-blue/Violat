import websockets
import json
import requests
import asyncio
from datetime import datetime
import pandas as pd
from mojito import KoreaInvestment
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from base64 import b64decode
import os
import threading
import time
from dotenv import load_dotenv
from pathlib import Path

# Load .env file from project root
env_path = Path(__file__).resolve().parent.parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

# AES256 DECODE
def aes_cbc_base64_dec(key, iv, cipher_text):
    cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv.encode('utf-8'))
    return bytes.decode(unpad(cipher.decrypt(b64decode(cipher_text)), AES.block_size))

# 웹소켓 접속키 발급
def get_approval(key, secret):
    url = 'https://openapivts.koreainvestment.com:29443'
    headers = {"content-type": "application/json"}
    body = {"grant_type": "client_credentials",
            "appkey": key,
            "secretkey": secret}
    PATH = "oauth2/Approval"
    URL = f"{url}/{PATH}"
    res = requests.post(URL, headers=headers, data=json.dumps(body), verify=False)
    approval_key = res.json().get("approval_key")
    return approval_key

# 해외주식(미국)호가 출력라이브러리
def stockhoka_overseas_usa(data):
    recvvalue = data.split('^')
    stock_data = {
        "stock_code": recvvalue[1],
        "current_price": recvvalue[11],
        "price_change": recvvalue[13],
        "trading_volume": recvvalue[7]
    }
    # print(stock_data)
    return stock_data

# 국내주식체결처리 출력라이브러리
def stockspurchase_domestic(data):
    global filter_data
    pValue = data.split('^')
    trading_volume = int(float(pValue[14]) / 1_000_000)  # 거래대금을 백만 단위로 변환
    stock_data = {
        "stock_code": pValue[0],
        "stock_name": stock_name_map.get(pValue[0], "Unknown"),  # 한글명 추가
        "current_price": format(int(pValue[2]), ',d'),  # 현재가 형식화
        "price_change": format(int(pValue[4]), ',d'),  # 전일대비 형식화
        "trading_volume": format(trading_volume, ',d')  # 거래대금 형식화
    }
    # print(stock_data)
    filter_data = stock_data
    return stock_data

# 모의 투자 환경에서 한국투자증권 API를 사용하여 브로커 객체를 생성합니다.
# Load API credentials from environment variables to avoid committing secrets.
key = os.getenv('KOREA_INVESTMENT_API_KEY')
secret = os.getenv('KOREA_INVESTMENT_API_SECRET')
acc_no = os.getenv('KOREA_INVESTMENT_ACCOUNT')

# Allow running without API credentials for development/testing
broker = None
if key and secret and acc_no:
    broker = KoreaInvestment(
        api_key=key,
        api_secret=secret,
        acc_no=acc_no,
        mock=True
    )
    print("Korea Investment API initialized successfully", flush=True)
else:
    print("Warning: Korea Investment API credentials not found. Trading features will be limited.", flush=True)

filter_data = {}
all_stocks_data = []
stock_name_map = {}

def fetch_stock_price(stock_code):
    if not broker:
        print(f"Warning: Cannot fetch stock price for {stock_code} - broker not initialized", flush=True)
        return 0
    try:
        data = broker.fetch_price(stock_code)
        output = data.get('output', {})
        return int(output.get('stck_prpr', 0))
    except Exception as e:
        print(f"Error fetching price for {stock_code}: {e}")
        return 0

def fetch_stock_names_and_codes():
    # 코스피 종목 가져오기
    kospi_symbols = broker.fetch_kospi_symbols().head(100)
    kospi_symbols['현재가'] = kospi_symbols['단축코드'].apply(fetch_stock_price)
    kospi_symbols = kospi_symbols.sort_values(by='현재가', ascending=False).head(30)
    
    # 코스닥 종목 가져오기
    kosdaq_symbols = broker.fetch_kosdaq_symbols().head(100)
    kosdaq_symbols['현재가'] = kosdaq_symbols['단축코드'].apply(fetch_stock_price)
    kosdaq_symbols = kosdaq_symbols.sort_values(by='현재가', ascending=False).head(30)
    
    # 코스피와 코스닥 종목 합치기
    all_symbols = pd.concat([kospi_symbols, kosdaq_symbols], ignore_index=True)
    
    # 필요한 열만 선택
    stock_data = all_symbols[['한글명', '단축코드']]
    
    return stock_data

def save_all_stocks_and_codes_to_json():
    stock_data = fetch_stock_names_and_codes()
    # print("모든 종목: ", stock_data)
    stock_data = stock_data.fillna('')

    stock_data_list = stock_data.to_dict(orient='records')

    with open('all_stock_codes3.json', 'w', encoding='utf-8') as file:
        json.dump(stock_data_list, file, ensure_ascii=False, indent=4)
    # print("모든 종목 및 코드 데이터가 JSON 파일로 저장되었습니다.")

def load_stock_codes_from_json():
    with open('all_stock_codes3.json', 'r', encoding='utf-8') as file:
        stock_codes = json.load(file)
        # print("json 파일 읽기ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ", stock_codes)
    global stock_name_map
    stock_name_map = {stock['단축코드']: stock['한글명'] for stock in stock_codes}
    return stock_codes

def update_stock_data(new_data):
    global all_stocks_data
    for i, stock in enumerate(all_stocks_data):
        if stock['stock_code'] == new_data['stock_code']:
            all_stocks_data[i] = new_data
            break
    else:
        all_stocks_data.append(new_data)
        
def load_realtime_stock_data():
    global all_stocks_data
    if os.path.exists('realtime_stock_data.json'):
        with open('realtime_stock_data.json', 'r', encoding='utf-8') as file:
            all_stocks_data = json.load(file)
        # print("실시간 데이터 파일 읽기: ", all_stocks_data)

# 열 이름에 맞추어 종목명을 통해 종목코드를 조회하는 함수
def get_stock_code_by_name(stock_name):
    # Try fast lookup from cached mapping first (code -> name)
    # stock_name_map is populated by `load_stock_codes_from_json()` when available.
    # Reverse lookup: name -> code
    for code, name in stock_name_map.items():
        if name == stock_name:
            return code

    # If not found in cache, fall back to fetching from broker, but serialize
    # broker.fetch_* calls to avoid mojito creating/removing the same temp files
    # concurrently which causes PermissionError on Windows.
    if not hasattr(get_stock_code_by_name, '_fetch_lock'):
        get_stock_code_by_name._fetch_lock = threading.Lock()

    retries = 3
    delay = 0.5
    for attempt in range(retries):
        acquired = get_stock_code_by_name._fetch_lock.acquire(timeout=10)
        if not acquired:
            # couldn't acquire lock, wait and retry
            time.sleep(delay)
            continue
        try:
            try:
                kospi_symbols = broker.fetch_kospi_symbols()
                kosdaq_symbols = broker.fetch_kosdaq_symbols()
                all_symbols = pd.concat([kospi_symbols, kosdaq_symbols], ignore_index=True)
                stock_code = all_symbols.loc[all_symbols['한글명'] == stock_name, '단축코드']
                if not stock_code.empty:
                    # update cache for future lookups
                    stock_name_map.update({r['단축코드']: r['한글명'] for r in all_symbols.to_dict(orient='records')})
                    return stock_code.values[0]
                else:
                    return None
            except PermissionError as e:
                # mojito/djongo may lock temp files; retry a few times
                if attempt < retries - 1:
                    time.sleep(delay)
                    delay *= 2
                    continue
                raise
        finally:
            try:
                get_stock_code_by_name._fetch_lock.release()
            except RuntimeError:
                pass

    return None

def fetch_stock_info(stock_code, stock_name):
    try:
        data = broker.fetch_price(stock_code)
        if 'output' not in data:
            return None
        output = data['output']
        trading_volume = int(float(output.get('acml_tr_pbmn', 0)) / 1_000_000)
        filtered_data = {
            'stock_name': stock_name,
            'current_price': format(int(output.get('stck_prpr', 0)), ',d'),
            'price_change': format(int(output.get('prdy_vrss', 0)), ',d'),
            'trading_volume': format(trading_volume, ',d')
        }
        return filtered_data
    except Exception as e:
        print(f"Exception fetching data for {stock_name} ({stock_code}): {e}")
        return None
    
def fetch_stock_daily_data(stock_code):
    try:
        data = broker.fetch_ohlcv(
            symbol=stock_code,
            timeframe='D',
            adj_price=True
        )
        # 데이터를 출력해서 확인
        # print("데이터 확인:", data)
        df = pd.DataFrame(data['output2'])
        dt = pd.to_datetime(df['stck_bsop_date'], format="%Y%m%d")
        df.set_index(dt, inplace=True)
        df = df[['stck_oprc', 'stck_hgpr', 'stck_lwpr', 'stck_clpr', 'acml_vol']]
        df.columns = ['open', 'high', 'low', 'close', 'volume']
        df.index.name = "date"
        df.reset_index(inplace=True)
        df['date'] = df['date'].dt.strftime('%Y-%m-%d')
        daily_data = df.to_dict(orient='records')
        # print("일봉:",daily_data)
        return daily_data
    except Exception as e:
        print(f"Exception fetching daily data for {stock_code}: {e}")
        return None

# 웹 소켓에 접속
async def connect():
    print("웹 소켓 접속---------------------------------------")
    g_appkey = 'PSEPARn4Ehfa1NOEzoRMA1A3ZpruI99OtOwl'
    g_appsceret = 'Vu5v2ivdN+uSo575W0VstxBf1LMLig21GKIN6a8hxduTQGb1nO0ZbeMjgxqmrUFmQ8e7RD+/M8rPoUIYlpLky/6EuyRStg5VhFHJoI1HQHNyh3UeMWqri17tonvBkL2FECy4/vtr5YohjyMvofEynt/DLyPtwaUGtwgnH7LQ9/qO+8m4CMs='

    url = 'ws://ops.koreainvestment.com:31000'  

    g_approval_key = get_approval(g_appkey, g_appsceret)
    print("approval_key [%s]" % (g_approval_key))

    stock_codes = load_stock_codes_from_json()

    async with websockets.connect(url, ping_interval=None) as websocket:
        senddata_list = [
            {"header": {"approval_key": g_approval_key, "custtype": "P", "tr_type": "1", "content-type": "utf-8"},
             "body": {"input": {"tr_id": "H0STCNT0", "tr_key": stock['단축코드']}}}
            for stock in stock_codes
        ]

        for senddata in senddata_list:
            await websocket.send(json.dumps(senddata))
            await asyncio.sleep(0.5)
            # print(f"Input Command is :{senddata}")

        while True:
            global filter_data, all_stocks_data
            data = await websocket.recv()
            try:
                json_data = json.loads(data)
                # print(f"Received JSON data: {json_data}")
            except json.JSONDecodeError:
                recvstr = data.split('|')
                trid = recvstr[1]

                if trid == "HDFSASP0":
                    # print("#### 해외주식 호가 ####")
                    filter_data = stockhoka_overseas_usa(recvstr[3])
                    # print("if--------------", filter_data)
                elif trid == "H0STCNT0":
                    # print("#### 국내주식 체결 ####")
                    filter_data = stockspurchase_domestic(recvstr[3]) 
                    for stock in all_stocks_data:
                        if stock['stock_code'] == filter_data['stock_code']:
                            filter_data['stock_name'] = stock['stock_name']
                            break   
                    update_stock_data(filter_data)
                    with open('realtime_stock_data.json', 'w', encoding='utf-8') as file:
                        json.dump(all_stocks_data, file, ensure_ascii=False, indent=4)
                    # print("모든 종목 및 코드 데이터가 JSON 파일로 저장되었습니다.-----------------")
                    # print("if--------------", filter_data)
                else:
                    print(f"Unknown real-time data: {data}")

async def stock_price_handler(websocket, path):
    async for message in websocket:
        stock_code = message  # 클라이언트로부터 종목 코드를 수신합니다.
        stock_name = stock_name_map.get(stock_code, "Unknown")  # 종목 코드에 대한 한글명을 가져옵니다.
        async for price in broker.stream_price(stock_code):
            filtered_price = {
                "stock_code": price["stock_code"],
                "stock_name": stock_name,  # 한글명 추가
                "current_price": price["trade_price"],
                "price_change": price["change_price"],
                "trading_volume": price["accumulated_trade_volume"]
            }
            await websocket.send(json.dumps(filtered_price))

# 웹소켓 서버 시작
def start_websocket_server():
    start_server = websockets.serve(stock_price_handler, "localhost", 8002)  # 포트 변경
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
    
# 필터링된 데이터 가져오기
def get_filter_data():
    global all_stocks_data
    # print("fiiiiiiiii", all_stocks_data)
    return all_stocks_data

# 저장 함수 실행
# save_all_stocks_and_codes_to_json()
# load_realtime_stock_data()

# 저장 함수 실행
# save_all_stocks_and_codes_to_json()

# # 비동기로 서버에 접속한다.
# asyncio.get_event_loop().run_until_complete(connect())
# asyncio.get_event_loop().close()
