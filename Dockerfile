# Node.js 이미지를 베이스로 사용
FROM node:22-alpine

# 작업 디렉토리를 생성하고 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json을 컨테이너에 복사
COPY package*.json ./

# 의존성 설치 후, npm 캐시 정리(불필요 파일 제거)
RUN npm install
# npm cache clean --force

# 소스 코드 복사
COPY . .

# Vite 개발 서버 실행
CMD ["npm", "run", "dev"]