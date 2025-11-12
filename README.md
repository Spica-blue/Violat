# 프로젝트 개요
쉬운 접근성으로 주식이 어렵다는 생각이 들지않게 하고, 주식 용어 공부, 자신의 기법 숙달, 매매연습 등을 위해
자신의 가상계좌에 임의로 돈을 넣어놓고 실제 주식매매 연습을 해볼 수 있는 주식 모의투자 사이트입니다.

# 주요 기능
- 로그인/회원가입
- 실시간 주식 차트
- 매매연습 기능

# 기술 스택
- Frontend : React
- Backend : Django
- DB : MongoDB
- 협업도구 : GitHub, Discord
- API : OpenAPI

# 팀원
- yongqyu49 : https://github.com/yongqyu49
- lsw0798 : https://github.com/lsw0798

---

## Docker로 실행하기

### 사전 요구사항
- Docker 및 Docker Compose 설치 필요
- Windows: Docker Desktop 권장
- Mac/Linux: Docker Engine + Docker Compose

### 빠른 시작

#### 1. 환경변수 설정 (최초 1회)
```bash
# .env.example을 복사하여 .env 파일 생성
copy .env.example .env  # Windows
cp .env.example .env    # Mac/Linux

# .env 파일을 열어서 실제 값으로 수정
# - KOREA_INVESTMENT_API_KEY=실제_API_키
# - KOREA_INVESTMENT_API_SECRET=실제_API_시크릿
# - KOREA_INVESTMENT_ACCOUNT=실제_계좌번호
```

#### 2. 이미지 빌드 및 컨테이너 실행
```bash
docker-compose up --build
```

#### 2. 백그라운드 실행
```bash
docker-compose up -d
```

#### 3. 컨테이너 중지
```bash
docker-compose down
```

### 서비스 접속
- **React 클라이언트**: http://localhost:3000
- **Django API**: http://localhost:8000

React 앱(포트 3000)에서 `/portfolio/`, `/member/`, `/trade/` 경로는 자동으로 Django 서버(포트 8000)로 프록시됩니다.

### 초기 설정 (최초 실행 시)

#### Django 마이그레이션
```bash
docker-compose run --rm web python manage.py migrate
```

#### Django 슈퍼유저 생성 (선택사항)
```bash
docker-compose run --rm web python manage.py createsuperuser
```

#### 정적 파일 수집 (필요시)
```bash
docker-compose run --rm web python manage.py collectstatic --noinput
```

### 환경변수 설정

#### 권장 환경변수

`docker-compose.yml` 파일의 `web` 서비스에서 환경변수를 설정할 수 있습니다:

```yaml
services:
  web:
    environment:
      - DEBUG=0                    # 프로덕션: 0, 개발: 1
      - SECRET_KEY=your-secret-key  # Django SECRET_KEY (필수)
      - USE_SQLITE=0               # SQLite 사용: 1, MongoDB 사용: 0
      - ALLOWED_HOSTS=localhost,127.0.0.1  # 허용 호스트
      - MONGO_URI=mongodb+srv://...  # MongoDB 연결 URI (선택)
```

#### 프로덕션 환경 체크리스트
- [ ] `DEBUG=0` 설정
- [ ] `SECRET_KEY` 변경 (랜덤 문자열 사용)
- [ ] `ALLOWED_HOSTS` 설정 (실제 도메인 추가)
- [ ] MongoDB Atlas 연결 정보 환경변수로 관리
- [ ] HTTPS 설정 (nginx SSL 인증서)
- [ ] Gunicorn 워커 수 조정 (`--workers` 옵션)

### 개발 모드

개발 중 코드 변경사항을 실시간으로 반영하려면 볼륨 마운트를 사용하세요:

```yaml
services:
  web:
    volumes:
      - ./server:/app
    command: python manage.py runserver 0.0.0.0:8000
```

### 로그 확인
```bash
# 전체 로그
docker-compose logs

# 특정 서비스 로그
docker-compose logs web
docker-compose logs client

# 실시간 로그 추적
docker-compose logs -f
```

### 트러블슈팅

#### 포트 충돌
포트 3000 또는 8000이 이미 사용 중인 경우, `docker-compose.yml`에서 포트를 변경하세요:
```yaml
ports:
  - "3001:80"    # 3000 대신 3001 사용
```

#### 빌드 캐시 삭제
```bash
docker-compose build --no-cache
```

#### 컨테이너 전체 재시작
```bash
docker-compose down
docker-compose up --build
```

#### MongoDB 연결 문제
- `USE_SQLITE=1`로 설정하여 SQLite를 임시로 사용
- MongoDB Atlas 방화벽에서 Docker 컨테이너 IP 허용 확인
- 연결 URI 형식 확인 (username, password 인코딩)

### 로컬 개발 (Docker 없이)

#### Backend
```bash
cd server
python -m venv env
.\env\Scripts\activate  # Windows
source env/bin/activate  # Mac/Linux
pip install -r requirements.txt
python manage.py runserver
```

#### Frontend
```bash
cd client
npm install
npm start
```
