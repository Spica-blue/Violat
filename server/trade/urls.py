from django.urls import path
from . import views

urlpatterns = [
    path('api/stocks/', views.get_all_stocks_view, name='get_all_stocks'),
    path('api/stock-info/', views.get_stock_info_view, name='get_stock_info'),
    path('api/start-websocket-server/', views.start_websocket_server_view, name='start_websocket_server'),
    path('api/connect-realtime-data/', views.connect_to_realtime_data, name='connect_to_realtime_data'),
    path('api/filtered-stock-data/', views.get_filtered_stock_data, name='get_filtered_stock_data'),
]
