from django.contrib import admin
from .models import Member, Account, Trade, Position

# Register your models here.
admin.site.register(Member)
admin.site.register(Account)
admin.site.register(Trade)
admin.site.register(Position)