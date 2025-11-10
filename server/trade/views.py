from rest_framework.decorators import api_view
from rest_framework.response import Response
from concurrent.futures import ThreadPoolExecutor
import asyncio
from .api import get_filter_data, fetch_stock_info, get_stock_code_by_name, connect, start_websocket_server, load_realtime_stock_data, fetch_stock_daily_data 

executor = ThreadPoolExecutor(max_workers=2)
websocket_server_running = False  # 웹소켓 서버 실행 상태 추적

# 애플리케이션 초기화 시 실시간 데이터 로드
load_realtime_stock_data()

@api_view(['GET'])
def get_all_stocks_view(request):
    all_stocks = get_filter_data()
    return Response(all_stocks)

@api_view(['POST'])
def get_stock_info_view(request):  # 함수 이름 변경
    stock_name = request.data.get("stock_name")
    # print("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnname:",stock_name)
    if stock_name:
        stock_code = get_stock_code_by_name(stock_name)
        # print("stock_code::::", stock_code)
        if stock_code:
            resp = fetch_stock_info(stock_code, stock_name)
            # print("resppppppp", resp)
            if resp is None:
                return Response({"error": "데이터를 가져오지 못했습니다: {}".format(stock_name)}, status=500)
            # print("뷰에서 받은 데이터:", resp)  # 필터링된 데이터를 로그로 출력
            
            return Response(resp)
        else:
            return Response({"error": "종목명을 찾을 수 없습니다: {}".format(stock_name)}, status=404)
    else:
        return Response({"error": "종목명을 입력해주세요"}, status=400)

def start_websocket_server_in_thread():
    global websocket_server_running
    if not websocket_server_running:
        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            websocket_server_running = True
            load_realtime_stock_data()  # 웹소켓 서버 시작 전 실시간 데이터 로드
            loop.run_until_complete(start_websocket_server())
        except Exception as e:
            print(f"Error in websocket server: {str(e)}")
            websocket_server_running = False

@api_view(['POST'])
def start_websocket_server_view(request):
    global websocket_server_running
    if websocket_server_running:
        return Response({"message": "웹소켓 서버가 이미 실행 중입니다."})
    try:
        executor.submit(start_websocket_server_in_thread)
        return Response({"message": "웹소켓 서버가 시작되었습니다."})
    except Exception as e:
        return Response({"error": str(e)}, status=500)

async def connect_to_realtime_data_async():
    await connect()

def connect_to_realtime_data_in_thread():
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(connect_to_realtime_data_async())
    except Exception as e:
        print(f"Error in connecting to real-time data: {str(e)}")

@api_view(['POST'])
def connect_to_realtime_data(request):
    try:
        executor.submit(connect_to_realtime_data_in_thread)
        return Response({"message": "실시간 데이터에 연결되었습니다."})
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
def get_filtered_stock_data(request):
    data = get_filter_data()
    # print("viewwwwwwwwwww", data)
    if data:
        return Response(data)
    else:
        return Response({"error": "필터링된 데이터가 없습니다."}, status=404)
    
@api_view(['POST'])
def get_stock_daily_data_view(request):
    stock_name = request.data.get('stock_name')
    if not stock_name:
        return Response({"error": "stock_name is required"}, status=400)
    stock_code = get_stock_code_by_name(stock_name)
    if not stock_code:
        return Response({"error": "Stock code not found"}, status=404)
    daily_data = fetch_stock_daily_data(stock_code)
    if not daily_data:
        return Response({"error": "Failed to fetch daily data"}, status=500)
    print("dataaaaaaa", daily_data)
    return Response(daily_data)
