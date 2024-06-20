import logging
import json
import time
import os
import threading
import csv
from datetime import datetime
from django.http import JsonResponse
from django.views import View
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
# from django.views.decorators.csrf import ensure_csrf_cookie
# from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

logger = logging.getLogger('asset')

uri = "mongodb+srv://admin:admin1234@cluster0.eguqpjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["violat"]

class BalanceView(View):
    def get(self, request):
        collection = db['account']
        
        # 모든 문서를 가져오고 필요한 필드만 선택
        result = collection.find({'account_num': '1111'}, {'_id': 0, 'account_num': 1, 'deposit': 1, 'deposit_limit': 1})
        
        # _id 필드를 문자열로 변환하여 JSON 직렬화 가능하도록 함
        data_list = []
        for item in result:
            item['account_num'] = str(item['account_num'])
            data_list.append(item)
        
        return JsonResponse(data_list, safe=False)

    def post(self, request):
        return JsonResponse({'message': 'POST request not implemented'}, status=405)


class RankingsView(View):
    csv_file_path = './asset/stock_data.csv'

    def fetch_stock_data(self):
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-infobars")
        options.add_argument("--disable-browser-side-navigation")
        options.add_argument("--disable-features=VizDisplayCompositor")
        prefs = {"profile.managed_default_content_settings.images": 2}
        options.add_experimental_option("prefs", prefs)

        service = Service(ChromeDriverManager().install())
        browser = webdriver.Chrome(service=service, options=options)

        stock_data = []

        try:
            browser.get("https://finance.naver.com/sise/lastsearch2.naver")
            filter_cancel_button = WebDriverWait(browser, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "#option12"))
            )
            filter_cancel_button.click()
            
            filter_button = WebDriverWait(browser, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "#option4"))
            )
            filter_button.click()

            apply_button = WebDriverWait(browser, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, ".item_btn > a > img"))
            )
            apply_button.click()

            WebDriverWait(browser, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".type_5"))
            )

            rows = browser.find_elements(By.CSS_SELECTOR, ".type_5 tr")

            for row in rows[1:]:
                cols = row.find_elements(By.TAG_NAME, "td")
                if len(cols) >= 6:
                    stock_info = {
                        'rank': cols[0].text,
                        'name': cols[1].text,
                        'search_ratio': cols[2].text,
                        'current_price': cols[3].text,
                        'change': cols[4].text,
                        'change_percentage': cols[5].text,
                        'trade_amount': cols[6].text,
                        'start_price': cols[7].text,
                        'high_price': cols[8].text,
                        'low_price': cols[9].text,
                        'volume': cols[10].text,
                        'per': cols[11].text,
                    }
                    stock_data.append(stock_info)

            with open(self.csv_file_path, mode='w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(['rank', 'name', 'search_ratio', 'current_price', 'change', 'change_percentage', 'trade_amount', 'start_price', 'high_price', 'low_price', 'volume', 'per'])
                for data in stock_data:
                    writer.writerow([data['rank'], data['name'], data['search_ratio'], data['current_price'], data['change'], data['change_percentage'], data['trade_amount'], data['start_price'], data['high_price'], data['low_price'], data['volume'], data['per']])
        except Exception as e:
            logger.error(f"주식 데이터를 로드하는 중 오류 발생: {e}")
        finally:
            browser.quit()

    def read_stock_data_from_csv(self):
        stock_data = []
        try:
            with open(self.csv_file_path, mode='r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    stock_data.append(row)
        except FileNotFoundError:
            logger.error(f"CSV 파일을 찾을 수 없습니다: {self.csv_file_path}")
        except Exception as e:
            logger.error(f"CSV 파일을 읽는 중 오류 발생: {e}")
        return stock_data

    def get(self, request):
        stock_data = self.read_stock_data_from_csv()
        return JsonResponse(stock_data, safe=False)

    def post(self, request):
        return JsonResponse({'message': 'POST 요청은 구현되지 않았습니다.'}, status=405)
    
    
@csrf_exempt
def buy_stock(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            logger.info(f"Received buy stock request: {data}")
            
            trade = db['trade']
            account = db['account']
            
            account_num = data.get('account_num')
            order_price = data.get('order_price')
            stock_code = data.get('stock_code')
            trade_quantity = data.get('trade_quantity') 
            
            # order_price와 trade_quantity가 숫자 형식인지 확인하고 변환
            if isinstance(order_price, str):
                order_price = float(order_price)
            if isinstance(trade_quantity, str):
                trade_quantity = int(trade_quantity)
            
            # Account 컬렉션에서 account_num을 기준으로 deposit 값을 업데이트
            result = account.update_one({"account_num": account_num}, {"$inc": {"deposit": -order_price}})
            
            if result.modified_count == 0:
                return JsonResponse({"error": "Account not found or deposit not updated"}, status=400)
            
            # trade_time 필드에 현재 시간 추가
            data['trade_time'] = datetime.now()
            
            buy_or_sell = data.get('buy_or_sell')
            if buy_or_sell == '매수':
                position = db['position']
                
                # 현재 평균 매수가를 계산하여 업데이트
                trade_records = trade.find({"account_num": account_num, "stock_code": stock_code, "buy_or_sell": "매수"})
                total_quantity = 0
                total_cost = 0
                for record in trade_records:
                    record_quantity = int(record['trade_quantity'])
                    record_price = float(record['trade_price'])
                    total_quantity += record_quantity
                    total_cost += record_quantity * record_price
                
                new_average_price = total_cost / total_quantity if total_quantity > 0 else 0

                # Position 컬렉션에서 stock_code와 account_num에 해당하는 문서 업데이트 또는 삽입
                result = position.update_one(
                    {"stock_code": stock_code, "account_num": account_num}, 
                    {"$inc": {"stock_quantity": trade_quantity}, "$set": {"average_price": new_average_price}},
                    upsert=True
                )
                
            # trade 컬렉션에 데이터 삽입
            result = trade.insert_one(data)
            logger.info(f"Stock bought successfully: {result.inserted_id}")

            return JsonResponse({"message": "Stock bought successfully!"})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    return JsonResponse({"error": "Invalid request"}, status=400)
        
@csrf_exempt
def sell_stock(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            logger.info(f"Received sell stock request: {data}")
            collection = db['trade']
            # result = collection.update()
            # logger.info(f"Stock bought successfully: {result.inserted_id}")

            return JsonResponse({"message": "Stock bought successfully!"})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    return JsonResponse({"error": "Invalid request"}, status=400)

class TradeLogView(View):
    def get(self, request):
        trade = db['trade']
        # 필요한 모든 필드를 포함하여 결과를 반환
        result = trade.find({"account_num": "1111"}, {'_id': 0, 'account_num': 1, 'stock_code': 1, 'buy_or_sell': 1, 'trade_quantity': 1, 'trade_price': 1, 'order_price': 1, 'trade_time': 1})
        
        data_list = []
        for item in result:
            item['account_num'] = str(item['account_num'])
            data_list.append(item)
        
        return JsonResponse(data_list, safe=False)


def update_stock_data_periodically():
    rankings_view = RankingsView()
    while True:
        rankings_view.fetch_stock_data()
        time.sleep(300)  # 5분마다 업데이트

# 주식 데이터를 주기적으로 업데이트하는 스레드 시작
update_thread = threading.Thread(target=update_stock_data_periodically, daemon=True)
update_thread.start()





# def get(self, request):
    #     logger.info("Rankings get")

        # # Fetch Kospi and Kosdaq symbols
        # kospi = broker.fetch_kospi_symbols()        # 코스피
        # kosdaq = broker.fetch_kosdaq_symbols()      # 코스닥

        # # Log head of the dataframes
        # logger.info(kospi.head())
        # logger.info(kosdaq.head())

        # def fetch_stock_info(symbol):
        #     """Fetch stock information including market cap and current price."""
        #     try:
        #         info = broker.fetch_price(symbol)
        #         # logger.info(f"API response for {symbol}: {info}")
        #         if 'output' in info:
        #             return {
        #                 'stock_code': symbol,
        #                 'current_price': info['output'].get('stck_prpr', 'N/A'),
        #                 'market_cap': info['output'].get('hts_avls', 'N/A')
        #             }
        #         else:
        #             logger.error(f"No 'output' key in response for {symbol}")
        #             return None
        #     except Exception as e:
        #         logger.error(f"Error fetching info for {symbol}: {e}")
        #         return None

        # # Combine Kospi and Kosdaq symbols
        # all_symbols = pd.concat([kospi, kosdaq])

        # # Fetch information for each symbol with delay to avoid rate limit
        # stock_info_list = []
        # for symbol in all_symbols['단축코드']:
        #     stock_info = fetch_stock_info(symbol)
        #     if stock_info:
        #         stock_info_list.append(stock_info)
        #         logger.info(f"Fetched info for {symbol}: {stock_info}")
        #     time.sleep(0.6)  # 100ms delay between requests