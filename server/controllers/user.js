const Crud = require("../models/Crud")

// To create user
async function createUser(req, res) {
   const {fname, lname, email, phone} = req.body
   // Validation if the user is existing
   const exists = await Crud.findOne({email})
   if (exists) {
      return res.status(400).json({error: "User already exists"})
   }
   if (!fname || !lname || !email || !phone) {
      return res.status(400).json({error: "Please provide all fields"})
   }
   try {
      // if the user is not exist then the user will be created
      const user = await Crud.create({...req.body})
      res.status(201).json({user})
   } catch (error) {
      console.error(error)
   }
}

// fetch all user data
async function getAllUsers(req, res) {
   try {
      const users = await Crud.find({})
      res.status(200).json({users})
   } catch (error) {
      console.error(error)
   }
}

async function getUserById(req, res) {
   try {
      const user = await Crud.findOne({_id: req.params.id}).lean()
      if (!user) {
         return res.status(404).json({error: "User not found"})
      }
      res.status(200).json(user)
   } catch (error) {
      console.error(error)
   }
}

// to update specific user
async function updateUser(req, res) {
   // check if the data email is already exist
   const {email} = req.body
   const exists = await Crud.findOne({email})
   if (exists) {
      return res.status(400).json({error: "User already exists"})
   }
   try {
      // if email does not exist it will proceed to submit new data
      // updating the specific user by ID
      const user = await Crud.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      res.status(200).json({user})
   } catch (error) {
      console.error(error)
   }
}

// delete user by ID
async function deleteUser(req, res) {
   try {
      const user = await Crud.findOneAndDelete({_id: req.params.id})
      res.status(200).json({user})
   } catch (error) {
      console.error(error)
   }
}

module.exports = {
   createUser,
   getAllUsers,
   getUserById,
   updateUser,
   deleteUser,
}