require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const cors = require('cors')
const app = express()

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: '*' }))
app.use('/api/v1/crud', require('./routes/user'))
app.use(notFound)
async function start() {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(process.env.PORT, () => {
            console.log('Server is up on port', process.env.PORT)
        })
    } catch (error) {
        console.error(error)
    }
}

start()