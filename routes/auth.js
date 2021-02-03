const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const { JWT_SECRET } = require('../config/dev') //dev.js에만 gitignore 설정을 해두었기 때문에 이곳에 임의의 문자열을 둔다. 하지만, 원래라면 dev말고 다른 파일에 저장했어야 했다.
const bcrypt = require('bcrypt')
const saltRounds = 12;
const jwt = require("jsonwebtoken");

// 사용자 등록
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ error: " please add all fields" })
    }

    // 이메일을 기준으로 사용자를 찾는다
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(400).json({ error: "You already signedup with this email" })
            }

            // 비밀번호 해쉬 이후 사용자의 정보를 저장
            bcrypt.hash(password, saltRounds)
                .then((hashedPassword) => {
                    const user = new User({
                        name,
                        email,
                        password: hashedPassword,
                    })
                    user.save()
                        .then((user) => {
                            return res.status(200).json({ message: 'saved successfully' })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => console.log(err))


        })
        .catch((err) => {
            console.log(err)
        })
})

// 로그인
router.post('/signin', (req, res) => {
    const { email, password } = req.body

    // 이메일 혹은 비밀번호가 입력되지 않은 경우
    if (!email || !password) {
        return res.status(400).json({ error: "please add email and password" })
    }

    // 이메일을 기준으로 사용자를 찾는다
    User.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(400).json({ error: "Invalid Email" })
        }
        bcrypt
            .compare(password, savedUser.password)
            .then((matchedPassword) => {
                if (matchedPassword) {
                    // unique한 id 값을 사용하여 서로 다른 사용자 두 개의 token 값이 같은 경우를 방지한다
                    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                    const { _id, name, email } = savedUser
                    res.json({
                        token,
                        user: { _id, name, email }
                    })
                }
                else {
                    return res.status(400).json({ error: "Invalid password" })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })
})
module.exports = router   
