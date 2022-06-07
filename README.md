# :rocket:주제
우리집 헬스 트레이너

---

# 구성원

이름 | 학번 |  학과 | 학년 | 이메일
------------ | ------------- | ------------- | ------------- | -------------  
공태현 | 2019102144 | 컴퓨터공학과 | 2 |  kong3047@khu.ac.kr
정지호 | 2019103025 | 컴퓨터공학과 | 4 | stop.ho@khu.ac.kr

---
# :metal: 프로젝트 소개

2019년 코로나 사태가 터진 후로, 집에서 운동을 하는 이른바 홈트족들이 많아지고 있다. 운동 자세를 정확히 인지하지 못 한 상태에서 운동을 하게 되면, 부상을 입을 위험이 높아진다. 올바른 자세는 부상을 방지하여 정기적으로 운동을 할 수 있게 하며, 운동의 효율을 높여 준다.  
따라서 본 프로젝트에서는, 정확한 운동 자세 영상을 띄워주며, 영상에서의 자세와 달라지면 경고 해주며 운동 자세를 올바르게 유지할 수 있도록 도와주고자 한다.  

---

# 프로젝트 진행 상황
[x] 구글 API를 통한 자세 학습(서있는 자세, 스쿼트 자세, 틀린 자세) - 공태현  
[x] poseCount - 공태현  
[x] pront : 웹캠 띄우기 - 정지호  
[x] pront : 카운팅 기록 - 정지호  
[x] pront : 홈페이지 디자인 - 정지호
[x] 배포 : http://54.145.55.30:3000/
[] PPT/발표 자료 준비

---

# 기술 스택
### Backend
node.js , express
MongoDB , mogoose

### Frontend
HTML , Javascript, CSS

### Server 
AWS , EC2

# 설치 및 실행
```
npm install
npm run start
```
GO to localhost:8000 
* 테스트 케이스 추가 및 설정 -> https://teachablemachine.withgoogle.com
* URL 연결 on squat.js

# for developer
* server.js : API Implement, mongodb database access IP 추가 필요 -> https://www.mongodb.com
* change mongoose.connect("Key") for own database.
* model/user.js : Database user schema

# RoadMap
* 다양한 운동 자세 추가
* 여러 케이스 추가로 정확도 향상
* 데이터 베이스를 활용한 운동량 분석

