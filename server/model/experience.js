const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    City: {

    },
    Street:{

    },
    Number:{

    }
})
const DateShcema = new mongoose.Schema({
    Year: {
        type: String,
        required: true
    },
    Month:{
        type: String,
        required: true
    },
    Day:{
        type: String,
        required: true
    }
})

const experience = new mongoose.Schema({
    UserName: {
        type:String,
        // required: true
    },
    Group: {
        type:String,
        // required: false
    },
    Area: {
        type:String,
        // required: false
    },
    Department: {
        type:String,
        // required: true
    },
    Hospital: {
        type:String,
        // required: true
    },
    Address: {
        type:AddressSchema,
        // required: false
    },
    Contact: {
        type:String,
        // required: false
    },
    PhoneNumber: {
        type:String,
        // required: false
    },
    Email: {
        type:String,
        // required: true
    },
    StartDate: {
        type: DateShcema
    },
    EndDate:{
        type: DateShcema
    },
    
})

module.exports = mongoose.model('Experiences',experience)