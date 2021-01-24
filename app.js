const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key')
const { User } = require("./models/user")

app.use(express.json())
app.use(express.urlencoded({ extended: false })) //false를 통해 기본으로 내장된 querystring 모듈 사용. true로 하면 따로 설치가 필요한 qs 모듈을 사용하게 된다.

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDB connected....'))
    .catch(err => console.log(err))

app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
