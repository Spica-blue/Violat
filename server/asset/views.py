import logging
from django.http import JsonResponse
from django.views import View
from pymongo import MongoClient

logger = logging.getLogger('asset')

uri = "mongodb+srv://admin:admin1234@cluster0.eguqpjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["violat"]

class BalanceView(View):
    get_greeting = {"message": "get good day"}
    post_greeting = {"message": "post good day"}

    def get(self, request):
        logger.info("balance get")
        collection = db['account']
        
        # 모든 문서를 가져오고 필요한 필드만 선택
        result = collection.find({}, {'_id': 0, 'account_num': 1, 'deposit': 1, 'deposit_limit': 1})
        
        # _id 필드를 문자열로 변환하여 JSON 직렬화 가능하도록 함
        data_list = []
        for item in result:
            item['account_num'] = str(item['account_num'])
            data_list.append(item)
        
        return JsonResponse(data_list, safe=False)

    def post(self, request):
        logger.info("balance post")
        return JsonResponse(self.post_greeting)
