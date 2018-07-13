![Alt text](./image/woong.png)

### 기본 환경에 대한 설명
* 환경설정
* node_moudels
* PM2 configuration
* src - (controller, models, service, lib)
* .env
* app.js

### 실행절차
1. npm insall -g yarn
2. yarn install

### 환경 실행 방법
1. 로컬에서 개발을 진행할 경우 yarn start:dev
2. 로컬에서 개발을 위한 pm2 실행시 yarn start:pm2
3. 서버에 production 실행시 yarn start:prod


### USING HTTP STATUS CODE

- 200 : 성공
- 204 : 데이터 없음 (요청은 성공)
- 404 : 페이지 없음
- 409 : 데이터 중복
- 422 : Validation Error
- 500 : Internal Server Error

### SWAGGER API

<http://13.125.190.134:3000/api-docs/#//>
