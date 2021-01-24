const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 12;

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ error: " please add all fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(400).json({ error: "You already signedup with this email" })
            }
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

module.exports = router