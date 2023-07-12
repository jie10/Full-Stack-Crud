const router = require("express").Router()
const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require("../controllers/user")

// routes
router.route("/").get(getAllUsers).post(createUser)
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser)

module.exports = router