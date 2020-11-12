const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    date_registered: {
        type: Date,
        default: Date.now()
    }
})

module.exports = User = mongoose.model('user', userSchema)