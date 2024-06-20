from django.urls import path
from . import views

urlpatterns = [
    path('stocks/', views.get_all_stocks_view, name='get_all_stocks'),
    path('stock-info/', views.get_stock_info_view, name='get_stock_info'),
    path('start-websocket-server/', views.start_websocket_server_view, name='start_websocket_server'),
    path('connect-realtime-data/', views.connect_to_realtime_data, name='connect_to_realtime_data'),
    path('filtered-stock-data/', views.get_filtered_stock_data, name='get_filtered_stock_data'),
    path('stock-daily/', views.get_stock_daily_data_view, name='get_stock_daily_data'),
]
