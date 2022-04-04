const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    UserName: {
        type:String,
        required: true
    },
    FirstName: {
        type:String,
        required: true
    },
    LastName: {
        type:String,
        required: true
    },
    id: {
        type:Number,
        required: true
    },
    city: {
        type:String,
        required: true
    },
    year: {
        type:Number,
        required: true
    },
    dateOfUpdate: {
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model('details',signUpTemplate)