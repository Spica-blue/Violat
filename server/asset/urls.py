from django.contrib import admin
from django.urls import path
from . import views
from asset.views import BalanceView, RankingsView, TradeLogView
# from asset.views import BuyStock
# from rest_framework import DefaultRouter

# router = DefaultRouter()
# router.register(r'')

app_name = 'asset'
urlpatterns = [
       path('admin/', admin.site.urls),
       path('balance/', BalanceView.as_view(), name='balance'),
       path('rankings/', RankingsView.as_view(), name='rankings'),
       path('detailBalance/', views.detail_balance, name='detailBalance'),
       # path('buy/', BuyView.as_view(), name='buy'),
       # path('sell/', SellView.as_view(), name='sell'),
       # path('buyStock/', BuyStock.as_view(), name='buyStock'),
       path('buyStock/', views.buy_stock, name='buyStock'),
       # path('tradeLog/', TradeLogView.as_view(), name='tradeLog'),
       path('availSell/', views.avail_sell, name='availSell'),
       path('sellStock/', views.sell_stock, name='sellStock'),
       path('getAccountNum/', views.get_account, name='getAccountNum'),
       path('inDeTradeLog/', views.inde_trade_log, name='inDeTradeLog'),
       # path('distribution/<str:account_num>/', AssetDistributionView.as_view(), name='asset_distribution'),
]
