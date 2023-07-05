const mongoose = require('mongoose')

const crudSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'Please provide a first name'],
    },
    lname: {
        type: String,
        required: [true, 'Please provide a last name'],
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
        required: [true, 'Please provide an email'],
    },
    phone: {
        type: Number,
        required: [true, 'Please provide a phone number'],
    }
})

module.exports = mongoose.model('Crud', crudSchema)