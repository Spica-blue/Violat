from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('member.urls')),
    path('asset/', include('asset.urls')) ,
    path('', include('trade.urls'))
]
