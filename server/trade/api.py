import requests
import json

app_key = "PSEPARn4Ehfa1NOEzoRMA1A3ZpruI99OtOwl"

app_secret = "Vu5v2ivdN+uSo575W0VstxBf1LMLig21GKIN6a8hxduTQGb1nO0ZbeMjgxqmrUFmQ8e7RD+/M8rPoUIYlpLky/6EuyRStg5VhFHJoI1HQHNyh3UeMWqri17tonvBkL2FECy4/vtr5YohjyMvofEynt/DLyPtwaUGtwgnH7LQ9/qO+8m4CMs="

token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImQ5ZGFiZjM3LTVkNDYtNDAyYS04NWU0LTlmNGZkNjMyMWRjNyIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxODQ0MTE3MiwiaWF0IjoxNzE4MzU0NzcyLCJqdGkiOiJQU0VQQVJuNEVoZmExTk9Fem9STUExQTNacHJ1STk5T3RPd2wifQ.WXOR_RCwbHo6eexpy7KFx-KPrOmmvRjrWz96ksaKpWCOetEKUzWdhR5mr_LF9nD0h79naWimwPrKoqeUH3Qm8w"


# 1-1 주식주문(현금)
def get1_1(id):
  url = "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/trading/order-cash"

  payload = json.dumps({
    "CANO": "50111987",
    "ACNT_PRDT_CD": "01",
    "PDNO": f"{id}",
    "ORD_DVSN": "00",
    "ORD_QTY": "1",
    "ORD_UNPR": "55000"
  })
  headers = {
    'content-type': 'application/json',
    'authorization': f'Bearer {token}',
    'appkey': app_key,
    'appsecret': app_secret,
    'tr_id': 'VTTC0802U'
  }

  response = requests.request("POST", url, headers=headers, data=payload)
  return response.json()

#1-2 주식잔고조회
def get1_2(id):

  url = "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/trading/inquire-balance?CANO=50111987&ACNT_PRDT_CD=01&AFHR_FLPR_YN=N&OFL_YN=&INQR_DVSN=01&UNPR_DVSN=01&FUND_STTL_ICLD_YN=N&FNCG_AMT_AUTO_RDPT_YN=N&PRCS_DVSN=00&CTX_AREA_FK100=&CTX_AREA_NK100="

  payload = ""
  headers = {
    'content-type': 'application/json',
    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjExZDEyYWEwLWU5NGItNDRkMi1iYmI1LTdlNWNjNjdmYTYyMSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxODI3MTAwOCwiaWF0IjoxNzE4MTg0NjA4LCJqdGkiOiJQU0VQQVJuNEVoZmExTk9Fem9STUExQTNacHJ1STk5T3RPd2wifQ.aK_25cCwSijOKZ1JbBJsGENVA0MlIKFUES7NoPcZDPCTBAjAO13obD9G_ZmiF11NP5yFu3r3xivwjStNrVz1vw',
    'appkey': 'PSEPARn4Ehfa1NOEzoRMA1A3ZpruI99OtOwl',
    'appsecret': 'Vu5v2ivdN+uSo575W0VstxBf1LMLig21GKIN6a8hxduTQGb1nO0ZbeMjgxqmrUFmQ8e7RD+/M8rPoUIYlpLky/6EuyRStg5VhFHJoI1HQHNyh3UeMWqri17tonvBkL2FECy4/vtr5YohjyMvofEynt/DLyPtwaUGtwgnH7LQ9/qO+8m4CMs=',
    'tr_id': 'VTTC8434R'
  }

  response = requests.request("GET", url, headers=headers, data=payload)
  return response.json()

#1-3 매수가능조회
def get1_3(id):
  
  url = f"https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/trading/inquire-psbl-order?CANO=50111987&ACNT_PRDT_CD=01&PDNO={id}&ORD_UNPR=55000&ORD_DVSN=01&OVRS_ICLD_YN=N&CMA_EVLU_AMT_ICLD_YN=N"

  payload = ""
  headers = {
    'content-type': 'application/json',
    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjExZDEyYWEwLWU5NGItNDRkMi1iYmI1LTdlNWNjNjdmYTYyMSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxODI3MTAwOCwiaWF0IjoxNzE4MTg0NjA4LCJqdGkiOiJQU0VQQVJuNEVoZmExTk9Fem9STUExQTNacHJ1STk5T3RPd2wifQ.aK_25cCwSijOKZ1JbBJsGENVA0MlIKFUES7NoPcZDPCTBAjAO13obD9G_ZmiF11NP5yFu3r3xivwjStNrVz1vw',
    'appkey': 'PSEPARn4Ehfa1NOEzoRMA1A3ZpruI99OtOwl',
    'appsecret': 'Vu5v2ivdN+uSo575W0VstxBf1LMLig21GKIN6a8hxduTQGb1nO0ZbeMjgxqmrUFmQ8e7RD+/M8rPoUIYlpLky/6EuyRStg5VhFHJoI1HQHNyh3UeMWqri17tonvBkL2FECy4/vtr5YohjyMvofEynt/DLyPtwaUGtwgnH7LQ9/qO+8m4CMs=',
    'tr_id': 'VTTC8908R'
  }

  response = requests.request("GET", url, headers=headers, data=payload)
  return response.json()

#1-4 투자계좌자산현황조회 //실전투자
#1-5 매도가능수량조회 //실전투자


# 2-1 주식 현재가 시세
def get2_1(id):
  
  url = f'https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-price?fid_cond_mrkt_div_code=J&fid_input_iscd={id}'

  payload = ""
  headers = {
      'content-type': 'application/json',
      'authorization': f'Bearer {token}',
      'appkey': app_key,
      'appsecret': app_secret,
      'tr_id': 'FHKST01010100'
  }

  response = requests.request("GET", url, headers=headers, data=payload)
  return response.json()

#2-2 주식현재가 체결(최근30건)
def get2_2(id):
  url = f"https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-ccnl?fid_cond_mrkt_div_code=J&fid_input_iscd={id}"

  payload = {}
  headers = {
    'content-type': 'application/json',
    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjExZDEyYWEwLWU5NGItNDRkMi1iYmI1LTdlNWNjNjdmYTYyMSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxODI3MTAwOCwiaWF0IjoxNzE4MTg0NjA4LCJqdGkiOiJQU0VQQVJuNEVoZmExTk9Fem9STUExQTNacHJ1STk5T3RPd2wifQ.aK_25cCwSijOKZ1JbBJsGENVA0MlIKFUES7NoPcZDPCTBAjAO13obD9G_ZmiF11NP5yFu3r3xivwjStNrVz1vw',
    'appkey': 'PSEPARn4Ehfa1NOEzoRMA1A3ZpruI99OtOwl',
    'appsecret': 'Vu5v2ivdN+uSo575W0VstxBf1LMLig21GKIN6a8hxduTQGb1nO0ZbeMjgxqmrUFmQ8e7RD+/M8rPoUIYlpLky/6EuyRStg5VhFHJoI1HQHNyh3UeMWqri17tonvBkL2FECy4/vtr5YohjyMvofEynt/DLyPtwaUGtwgnH7LQ9/qO+8m4CMs=',
    'tr_id': 'FHKST01010300'
  }

  response = requests.request("GET", url, headers=headers, data=payload)
  return response.json()



#2-3 주식현재가 일자별
def get2_3(id):

  url = f"https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-daily-price?fid_cond_mrkt_div_code=J&fid_input_iscd={id}&fid_period_div_code=D&fid_org_adj_prc=1"

  payload = {}
  headers = {
    'content-type': 'application/json',
    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjExZDEyYWEwLWU5NGItNDRkMi1iYmI1LTdlNWNjNjdmYTYyMSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxODI3MTAwOCwiaWF0IjoxNzE4MTg0NjA4LCJqdGkiOiJQU0VQQVJuNEVoZmExTk9Fem9STUExQTNacHJ1STk5T3RPd2wifQ.aK_25cCwSijOKZ1JbBJsGENVA0MlIKFUES7NoPcZDPCTBAjAO13obD9G_ZmiF11NP5yFu3r3xivwjStNrVz1vw',
    'appkey': 'PSEPARn4Ehfa1NOEzoRMA1A3ZpruI99OtOwl',
    'appsecret': 'Vu5v2ivdN+uSo575W0VstxBf1LMLig21GKIN6a8hxduTQGb1nO0ZbeMjgxqmrUFmQ8e7RD+/M8rPoUIYlpLky/6EuyRStg5VhFHJoI1HQHNyh3UeMWqri17tonvBkL2FECy4/vtr5YohjyMvofEynt/DLyPtwaUGtwgnH7LQ9/qO+8m4CMs=',
    'tr_id': 'FHKST01010400'
  }

  response = requests.request("GET", url, headers=headers, data=payload)
  return response.json()

#2-4 주식현재가 호가/예상체결
def get2_4(id):

  url = f"https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn?fid_cond_mrkt_div_code=J&fid_input_iscd={id}"

  payload = {}
  headers = {
    'content-type': 'application/json',
    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjExZDEyYWEwLWU5NGItNDRkMi1iYmI1LTdlNWNjNjdmYTYyMSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxODI3MTAwOCwiaWF0IjoxNzE4MTg0NjA4LCJqdGkiOiJQU0VQQVJuNEVoZmExTk9Fem9STUExQTNacHJ1STk5T3RPd2wifQ.aK_25cCwSijOKZ1JbBJsGENVA0MlIKFUES7NoPcZDPCTBAjAO13obD9G_ZmiF11NP5yFu3r3xivwjStNrVz1vw',
    'appkey': 'PSEPARn4Ehfa1NOEzoRMA1A3ZpruI99OtOwl',
    'appsecret': 'Vu5v2ivdN+uSo575W0VstxBf1LMLig21GKIN6a8hxduTQGb1nO0ZbeMjgxqmrUFmQ8e7RD+/M8rPoUIYlpLky/6EuyRStg5VhFHJoI1HQHNyh3UeMWqri17tonvBkL2FECy4/vtr5YohjyMvofEynt/DLyPtwaUGtwgnH7LQ9/qO+8m4CMs=',
    'tr_id': 'FHKST01010200'
  }

  response = requests.request("GET", url, headers=headers, data=payload)
  return response.json()

#2-5 주식현재가 투자자
def get2_5(id):

  url = f"https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-investor?fid_cond_mrkt_div_code=J&fid_input_iscd={id}"

  payload = {}
  headers = {
    'content-type': 'application/json',
    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjExZDEyYWEwLWU5NGItNDRkMi1iYmI1LTdlNWNjNjdmYTYyMSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxODI3MTAwOCwiaWF0IjoxNzE4MTg0NjA4LCJqdGkiOiJQU0VQQVJuNEVoZmExTk9Fem9STUExQTNacHJ1STk5T3RPd2wifQ.aK_25cCwSijOKZ1JbBJsGENVA0MlIKFUES7NoPcZDPCTBAjAO13obD9G_ZmiF11NP5yFu3r3xivwjStNrVz1vw',
    'appkey': 'PSEPARn4Ehfa1NOEzoRMA1A3ZpruI99OtOwl',
    'appsecret': 'Vu5v2ivdN+uSo575W0VstxBf1LMLig21GKIN6a8hxduTQGb1nO0ZbeMjgxqmrUFmQ8e7RD+/M8rPoUIYlpLky/6EuyRStg5VhFHJoI1HQHNyh3UeMWqri17tonvBkL2FECy4/vtr5YohjyMvofEynt/DLyPtwaUGtwgnH7LQ9/qO+8m4CMs=',
    'tr_id': 'FHKST01010900'
  }

  response = requests.request("GET", url, headers=headers, data=payload)
  return response.json()

#2-6 주식현재가 회원사
def get2_6(id):

  url = f"https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-member?fid_cond_mrkt_div_code=J&fid_input_iscd={id}"

  payload = {}
  headers = {
    'content-type': 'application/json',
    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjExZDEyYWEwLWU5NGItNDRkMi1iYmI1LTdlNWNjNjdmYTYyMSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxODI3MTAwOCwiaWF0IjoxNzE4MTg0NjA4LCJqdGkiOiJQU0VQQVJuNEVoZmExTk9Fem9STUExQTNacHJ1STk5T3RPd2wifQ.aK_25cCwSijOKZ1JbBJsGENVA0MlIKFUES7NoPcZDPCTBAjAO13obD9G_ZmiF11NP5yFu3r3xivwjStNrVz1vw',
    'appkey': 'PSEPARn4Ehfa1NOEzoRMA1A3ZpruI99OtOwl',
    'appsecret': 'Vu5v2ivdN+uSo575W0VstxBf1LMLig21GKIN6a8hxduTQGb1nO0ZbeMjgxqmrUFmQ8e7RD+/M8rPoUIYlpLky/6EuyRStg5VhFHJoI1HQHNyh3UeMWqri17tonvBkL2FECy4/vtr5YohjyMvofEynt/DLyPtwaUGtwgnH7LQ9/qO+8m4CMs=',
    'tr_id': 'FHKST01010600'
  }

  response = requests.request("GET", url, headers=headers, data=payload)
  return response.json()


#2-7 주식당일분봉조회
def get2_7(id):
  
  url = f"https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice?FID_ETC_CLS_CODE=&FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD={id}&FID_INPUT_HOUR_1=092800&FID_PW_DATA_INCU_YN=Y"

  payload = ""
  headers = {
    'content-type': 'application/json',
    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjExZDEyYWEwLWU5NGItNDRkMi1iYmI1LTdlNWNjNjdmYTYyMSIsInByZHRfY2QiOiIiLCJpc3MiOiJ1bm9ndyIsImV4cCI6MTcxODI3MTAwOCwiaWF0IjoxNzE4MTg0NjA4LCJqdGkiOiJQU0VQQVJuNEVoZmExTk9Fem9STUExQTNacHJ1STk5T3RPd2wifQ.aK_25cCwSijOKZ1JbBJsGENVA0MlIKFUES7NoPcZDPCTBAjAO13obD9G_ZmiF11NP5yFu3r3xivwjStNrVz1vw',
    'appkey': 'PSEPARn4Ehfa1NOEzoRMA1A3ZpruI99OtOwl',
    'appsecret': 'Vu5v2ivdN+uSo575W0VstxBf1LMLig21GKIN6a8hxduTQGb1nO0ZbeMjgxqmrUFmQ8e7RD+/M8rPoUIYlpLky/6EuyRStg5VhFHJoI1HQHNyh3UeMWqri17tonvBkL2FECy4/vtr5YohjyMvofEynt/DLyPtwaUGtwgnH7LQ9/qO+8m4CMs=',
    'tr_id': 'FHKST03010200'
  }

  response = requests.request("GET", url, headers=headers, data=payload)
  return response.json()

#3-1 주식기본조회 //실전투자
#3-2 국내주식 대차대조표 //실전투자
#3-3 국내주식 손익계산서 //실전투자
#3-4 국내주식 재무비율 //실전투자
#3-5 국내주식 수익성비율 //실전투자
#3-6 국내주식 안정성비율 //실전투자
#3-7 국내주식 성장성비율 //실전투자

#4-1 국내기관_외국인 매매종목가집계 //실전투자
#4-2 종목별일별매수매도체결량 //실전투자
#4-3 시장별 투자자매매동향(시세) //실전투자

#5-1 거래량순위 //
#5-2 국내주식 등락률 순위 //
#5-3 국내주식 시가총액 상위 //
#5-4 국내주식 재무비율 순위 //

#6-1 국내주식 실시간체결가 //
#6-2 국내주식 실시간호가 //
#6-3 국내주식 실시간체결통보 //

#005930 삼성
  
  


def test():
  while(True):
    print("\n//////////////////////////////")
    print("1.[주문/계좌]")
    print("1-1. 주식주문(현금)")
    print("1-2. 주식잔고조회")
    print("1-3. 매수가능조회")
    print("//1-4. 투자계좌자산현황조회")
    print("//1-5. 매도가능수량조회\n")

    print("2.[기본시세]")
    print("2-1. 주식현재가 시세")
    print("2-2. 주식현재가 체결")
    print("2-3. 주식현재가 일자별")
    print("2-4. 주식현재가 호가/예상체결")
    print("2-5. 주식현재가 투자자")
    print("2-6. 주식현재가 회원사")
    print("2-7. 주식당일분봉조회\n")

    print("//3.[종목정보]")
    print("//3-1. 주식기본조회")
    print("//3-2. 국내주식 대차대조표")
    print("//3-3. 국내주식 손익계산서")
    print("//3-4. 국내주식 재무비율")
    print("//3-5. 국내주식 수익성비율")
    print("//3-6. 국내주식 안정성비율")
    print("//3-7. 국내주식 성장성비율\n")

    print("//4.[시세분석]")
    print("//4-1. 국내기관_외국인 매매종목가집계")
    print("//4-2. 종목별일별매수매도체결량")
    print("//4-3. 시장별 투자자매매동향(시세)\n")

    print("//5.[순위분석]")
    print("//5-1. 거래량순위")
    print("//5-2. 국내주식 등락률 순위")
    print("//5-3. 국내주식 시가총액 상위")
    print("//5-4. 국내주식 재무비율 순위\n")

    print("//6.[실시간시세]")
    print("//6-1. 국내주식 실시간체결가")
    print("//6-2. 국내주식 실시간호가")
    print("//6-3. 국내주식 실시간체결통보\n")

    # 함수 호출 예시
    select = input("(나가려면 exit) 확인할 부분 ex)2_1: ")
    func_name = 'get' + select
    if(select == 'exit'):
      break
    
    print("\n[주식 번호]")
    print("삼성전자: 005930")
    print("시노펙스: 025320")
    print("HLB: 028300")
    print("하이드로리튬: 101670\n")
    
    num = input("주식번호: ")
    res = globals()[func_name](num)
    
    # JSON 데이터를 보기 좋게 정렬하여 파일에 저장
    with open('test.json', 'w', encoding='utf-8') as outfile:
        json.dump(res, outfile, indent=4, ensure_ascii=False)
    # JSON 데이터를 콘솔에 보기 좋게 출력
    print(json.dumps(res, indent=4, ensure_ascii=False))

if __name__ == "__main__":
  test()
