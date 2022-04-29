const mongoose = require('mongoose')

const uploadPaper = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    Data: {
        type: Buffer,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    // paperType: {
    //     type: String,
    //     required: true
    // },
    dateOfUpdate: {
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model('papers',uploadPaper)   