mongoose = require('mongoose')

const ExperienceScheme = new mongoose.Schema({
    Region: {
        type: String,
        required: true
    },
    Hospital:{
        type: String,
        required: true
    },
    Experience:{
        type: String,
        required: true
    }
})
const requestForm = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    Requests : [{
        type: ExperienceScheme,
        required: true,
    }]
})

module.exports = mongoose.model('requestForm',requestForm)   