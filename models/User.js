const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
        required: true,
    },
    password: {
        type: String,
        minlength: 5,
        required: true,
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }