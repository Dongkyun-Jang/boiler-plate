//배포용
module.exports = {
    mongoURI: process.env.MONGO_URI
}

//이 MONGO_URI는 heroku 같은 앱에서 배포할 때 내 데이터베이스 value를 담는 key값
//때문에 배포할 때 내 데이터베이스 value를 담는 key값을 MONGO_URI와 동일하게 설정
//해야 한다.