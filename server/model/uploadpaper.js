const mongoose = require('mongoose')

const uploadPaper = new mongoose.Schema({
    UserName: {
        type:String,
        required: true
    },
    paper: {

    },
    dateOfUpdate: {
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model('papers',uploadPaper)