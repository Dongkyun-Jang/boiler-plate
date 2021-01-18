const express = require('express')
const app = express()
const port = 5000
const { User } = require("./models/User")

app.use(express.json())
app.use(express.urlencoded({ extended: false })) //false를 통해 기본으로 내장된 querystring 모듈 사용. true로 하면 따로 설치가 필요한 qs 모듈을 사용하게 된다.

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://JangDongkyun:ehdrbs135!@cluster0.nxywy.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB connected....'))
    .catch(err => console.log(err))


app.get('/', (req, res) => res.send('hello world!'))

app.post('/register', (req, res) => {

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))