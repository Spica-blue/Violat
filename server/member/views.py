# views.py
import random
import os
import sys
sys.setrecursionlimit(2000)
from pymongo import MongoClient
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User

# Django 설정 모듈을 환경 변수로 지정
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
# import django
# django.setup()

# UTF-8 인코딩을 사용하도록 설정
sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf8', buffering=1)

# MongoDB URI 설정 및 클라이언트 생성
uri = "mongodb+srv://admin:admin1234@cluster0.eguqpjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["violat"]


@api_view(['POST'])
def login(request):
    input_id = request.data.get('id') #Login.js const values(id, password)
    input_pwd = request.data.get('password')
    
    print("inputid : ", input_id, flush=True)
    print("inputpwd : ", input_pwd, flush=True)
    
    if not input_id or not input_pwd:
        return Response({'message': 'ID와 비밀번호를 입력해주세요.'}, status=status.HTTP_400_BAD_REQUEST)
    
    collection = db["member"]
    user = collection.find_one({'id': input_id, 'pwd': input_pwd}, {'_id': 0, 'id': 1, 'pwd': 1})
    print("user : ", user, flush=True)
    if user:
        print("들어옴ㅁㅁㅁㅁㅁ", flush=True)
        try:
            django_user, created = User.objects.get_or_create(username=input_id)
            print("django_user:", django_user, flush=True)
            print("created:", created, flush=True)
            
            if created or not django_user.check_password(input_pwd):
                django_user.set_password(input_pwd)
                django_user.save()
            
            auth_user = authenticate(request, username=input_id, password=input_pwd)
            print("auth_user:", auth_user, flush=True)
            if auth_user is not None:
                print("유저 들어옴", flush=True)
                auth_login(request, auth_user)
                print("auth_login:", auth_login, flush=True)
                return Response({'message': '로그인 성공'}, status=status.HTTP_200_OK)
            else:
                print("Authentication failed", flush=True)
                return Response({'message': '로그인 실패. 다시 시도해주세요.'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(f"An error occurred: {str(e)}", flush=True)
            return Response({'message': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("User not found", flush=True)
        return Response({'message': '로그인 실패. 다시 시도해주세요.'}, status=status.HTTP_401_UNAUTHORIZED)



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def check_login_status(request):
#     print("유저이름:", request.user.username)
#     return JsonResponse({'is_logged_in': True, 'user_id': request.user.username})


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
  try:
    username = request.data.get('id')
    password = request.data.get('password')

    if not username or not password:
      return Response({'success': False, 'message': '아이디와 비밀번호를 입력해주세요.'}, status=400)

    collection = db["member"]

    if collection.find_one({'id': username}):
      return Response({'success': False, 'message': '이미 존재하는 아이디입니다.'}, status=400)
    
    account_number = random.randint(10000, 99999)
    print("계좌 생성", account_number, flush=True);

    new_user = {
      'id': username,
      'pwd': password,
      'account_num': account_number
    }

    collection.insert_one(new_user)
    print("계좌 적용")

    return Response({
      'success': True,
      'message': '회원가입이 성공적으로 완료되었습니다.',
    }, status=201)
  except Exception as e:
    print(f"에러에러: {str(e)}")
    return Response({'message' : '회원가입 에러', 'error': str(e)}, status=500)
    


@api_view(['POST'])
@permission_classes([AllowAny]) #사용자 인증, 인증된 사용자와 인증되지 않은 사용자 모두
def id_check(request):
    try:
        print("idcheck")
        username = request.data.get('id')
        if not username:
            return Response({'error': 'ID is required'}, status=400)

        collection = db["member"]
        
        if collection.find_one({'id': username}):
            print("true")
            return Response({'exists': True})
        else:
            print("false")
            return Response({'exists': False})
        

    except Exception as e:
        print(f"Error: {str(e)}")
        return Response({'error': 'Internal Server Error'}, status=500)


# @permission_classes([IsAuthenticated]) #사용자 인증, 인증된 사용자
@api_view(['DELETE'])
def deleteUser(request):
    print("back통과")
    try:
        user_id = request.data.get('user_id')
        print("현재 id:", user_id, flush=True)

        collection = db["member"]
        collection.delete_one({'id': user_id})
        
        return Response({'message': '회원탈퇴 성공'}, status=status.HTTP_200_OK)
    except Exception as e:
        print("오류")
        return Response({'message' : '회원탈퇴 처리 중 오류 발생', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    