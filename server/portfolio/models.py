from django.db import models
from django.utils import timezone

# 계좌
class Account(models.Model):
    account_num = models.CharField(max_length=20)  # 계좌번호
    deposit = models.IntegerField(default=0)  # 예수금(잔액)
    deposit_limit = models.IntegerField(default=1000)  # 예수금 한도

    def __str__(self):
        return self.account_num

# 회원
class Member(models.Model):
    user_id = models.CharField(max_length=20)  # 회원 아이디
    pwd = models.CharField(max_length=30)  # 회원 비밀번호
    account_num = models.ForeignKey(Account, related_name="members", on_delete=models.CASCADE)  # 계좌번호

    def __str__(self):
        return self.user_id

# 보유종목
class Position(models.Model):
    stock_code = models.IntegerField(default=0)  # 보유종목코드 
    stock_quantity = models.IntegerField(default=0)  # 보유수량
    average_price = models.IntegerField(default=0)  # 평균가격
    account_num = models.ForeignKey(Account, related_name="positions", on_delete=models.CASCADE)  # 계좌번호

    def __str__(self):
        return f"Account {self.account.account_num} - Stock {self.stock_code}"

# 거래내역    
class Trade(models.Model):
    stock_code = models.IntegerField(default=0)  # 종목코드
    buy_or_sell = models.CharField(max_length=10)  # 매수 or 매도
    trade_quantity = models.IntegerField(default=0)  # 매수, 매도 수량
    trade_price = models.IntegerField(default=0)  # 매수, 매도 가격(단가)
    order_price = models.IntegerField(default=0) # 주문총액(금액)
    trade_time = models.DateTimeField('date published', default=timezone.now)  # 거래일자
    account_num = models.ForeignKey(Member, related_name="trades", on_delete=models.CASCADE)  # 계좌번호

    def __str__(self):
        return f"{self.buy_or_sell} - {self.stock_code} - {self.trade_quantity}"
