import sys
from pymongo import MongoClient
from rest_framework.response import Response
from rest_framework.decorators import api_view

# UTF-8 인코딩을 사용하도록 설정
sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf8', buffering=1)

# Create your views here.

uri = "mongodb+srv://admin:admin1234@cluster0.eguqpjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["violat"]

@api_view(['GET'])
def main(request):
    if request.method == 'GET':
        collection = db["member"]
        result = collection.find({}, {'_id': 0,'id': 1, 'pwd': 1})  # 필요한 필드만 선택
        data_list = list(result)
        print("db 접속 연결 성공 : ", data_list, flush=True)
        
    return Response({'data': data_list})