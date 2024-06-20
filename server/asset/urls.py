from django.contrib import admin
from django.urls import path
from . import views
from asset.views import BalanceView
from asset.views import RankingsView
from asset.views import TradeLogView
# from asset.views import BuyStock
# from rest_framework import DefaultRouter

# router = DefaultRouter()
# router.register(r'')

app_name = 'asset'
urlpatterns = [
       path('admin/', admin.site.urls),
       path('balance/', BalanceView.as_view(), name='balance'),
       path('rankings/', RankingsView.as_view(), name='rankings'),
       # path('buy/', BuyView.as_view(), name='buy'),
       # path('sell/', SellView.as_view(), name='sell'),
       # path('buyStock/', BuyStock.as_view(), name='buyStock'),
       path('buyStock/', views.buy_stock, name='buyStock'),
       path('tradeLog/', TradeLogView.as_view(), name='tradeLog'),
]
