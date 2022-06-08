# :rocket:주제
![logo](/uploads/647ebad4d676a801662947a2d5990a19/logo.png)

---

# 👩‍🦱 구성원

이름 | 학번 |  학과 | 학년 | 이메일
------------ | ------------- | ------------- | ------------- | -------------  
공태현 | 2019102144 | 컴퓨터공학과 | 2 |  kong3047@khu.ac.kr
정지호 | 2019103025 | 컴퓨터공학과 | 4 | stop.ho@khu.ac.kr

---
# :metal: 프로젝트 소개

2019년 코로나 사태가 터진 후로 집에서 운동을 하는 이른바 홈트족들이 많아지고 있다.  
홈 트레이닝은 쉽고 간편하다는 장점이 있지만, 바른 운동 자세를 유지하기에 어렵다는 단점이 있다.  
운동 자세를 정확히 인지하지 못 한 상태에서 운동을 하게 되면, 부상을 입을 위험이 높아진다.  
올바른 자세는 부상을 방지하여 정기적으로 운동을 할 수 있게 하며, 운동의 효율을 높여 준다.  
따라서 본 프로젝트에서는 다음과 같은 기능을 하는 '방구석 헬스 트레이너'를 구현해보고자 한다.  
1. 정확한 운동 자세 영상을 띄워준다.  
2. 자신이 운동하는 모습을 실시간으로 확인할 수 있도록 한다.  
3. 영상에서의 자세와 달라지면 경고음이 나온다.  
4. 정확한 자세로 동작을 수행해야만 카운트가 올라간다.  

---
# Usage
![image](/uploads/b5e4828606ed50a71d42609293244754/image.png)  
  
![image](/uploads/e45eb6186df16c33a59fdb94c0181463/image.png)  
  
![image](/uploads/a9c24b96c2b0f3f63c46134b13194d4e/image.png)  

---

# 기술 스택
### Backend
node.js , express  
MongoDB , mogoose

### Frontend
HTML , Javascript, CSS

### Server 
AWS , EC2

---
### Architecture
![dddd.drawio__1_](/uploads/46df407fa692c72c4a8b230b6081009c/dddd.drawio__1_.png)  

# 설치 및 실행
```
npm install
npm run start
```
GO to localhost:8000 
* 테스트 케이스 추가 및 설정 `https://teachablemachine.withgoogle.com`
* URL 연결 on squat.js

---

# for developer
* server.js : API Implement, mongodb database access IP 추가 필요 `https://www.mongodb.com`
* change mongoose.connect("Key") for own database.
* model/user.js : Database user schema

---

# RoadMap
* 다양한 운동 자세 추가
* 여러 케이스 추가로 정확도 향상
* 데이터 베이스를 활용한 운동량 분석

---

# 프로젝트 진행 상황
- [x] 구글 API를 통한 자세 학습(서있는 자세, 스쿼트 자세, 틀린 자세) - 공태현  
- [x] poseCount - 공태현  
- [x] pront : 웹캠 띄우기 - 정지호  
- [x] pront : 카운팅 기록 - 정지호  
- [x] pront : 홈페이지 디자인 - 정지호  
- [x] 배포 : https://2019102144.osschatbot2022.tk:23023 
- [] PPT/발표 자료 준비

---

