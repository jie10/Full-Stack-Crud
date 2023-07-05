const mongoose = require('mongoose')

function connectDB(url) {
    try {
        mongoose.connect(url)
        console.log('MongoDB Connected...')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB