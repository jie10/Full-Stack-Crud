const Crud = require('../models/Crud')
async function createUser(req, res) {
    const { fname, lname, email, phone } = req.body
    const exists = await Crud.findOne({ email })
    if (exists) {
        return res.status(400).json({ error: 'User already exists' })
    }
    if (!fname || !lname || !email || !phone) {
        return res.status(400).json({ error: 'Please provide all fields' })
    }
    try {

        const user = await Crud.create({ ...req.body })
        res.status(201).json({ user })
    } catch (error) {
        console.error(error)
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await Crud.find({}).lean()
        const count = await Crud.countDocuments()
        res.status(200).json({ users, count })
    } catch (error) {
        console.error(error)
    }
}

async function getUserById(req, res) {
    try {
        const user = await Crud.findOne({ _id: req.params.id }).lean()
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json({ user })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById
}