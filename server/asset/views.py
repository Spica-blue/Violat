import logging
from django.http import JsonResponse
from django.views import View

logger = logging.getLogger('asset')

class BalanceView(View):
    get_greeting = {"message": "get good day"}
    post_greeting = {"message": "post good day"}

    def get(self, request):
        logger.info("balance get")
        return JsonResponse(self.get_greeting)

    def post(self, request):
        logger.info("balance post")
        return JsonResponse(self.post_greeting)
