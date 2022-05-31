mongoose = require('mongoose')

const configuration = new mongoose.Schema({
    target: {
        type: String,
        required: true
    },
    value: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('configurations',configuration)   