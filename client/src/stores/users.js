import { defineStore } from "pinia"
import axios from "axios"

export const useUserStore = defineStore("user", {
   state: () => ({
      users: [],
      fname: "",
      errFname: "",
      lname: "",
      errLname: "",
      email: "",
      errEmail: "",
      phone: "",
      errPhone: "",
   }),
   actions: {
      async fetchUsers() {
         try {
            const res = await axios.get(`http://localhost:3002/api/v1/crud`)
            this.users = res.data.users
         } catch (error) {
            console.log(error)
         }
      },
      async getUserById(id) {
         try {
            const res = await axios.get(`http://localhost:3002/api/v1/crud/${ id }`)
            this.users = res.data.user._id
         } catch (error) {
            console.log(error)
         }
      },

      async createUser() {
         try {
            /*if (!this.fname || !this.lname || !this.email || !this.phone) {
               console.log("Please fill in all fields")
               return this.error = "Please fill in all fields"
            }*/
            if (!this.fname) {
               return this.errFname = "Enter your first name"
            }
            if (!this.lname) {
               return this.errLname = "Enter your last name"
            }
            if (!this.email) {
               return this.errEmail = "Enter your email"
            }
            if (!this.phone) {
               return this.errPhone = "Enter your phone"
            }
            const res = await axios.post(`http://localhost:3002/api/v1/crud`, {
               fname: this.fname,
               lname: this.lname,
               email: this.email,
               phone: this.phone,
            })
            this.users.push(res.data.user) // Update the users array with the new user
            this.fname = ""
            this.lname = ""
            this.email = ""
            this.phone = ""
         } catch (error) {
            if (error.response && error.response.status === 400) {
               console.log("User already exists")
               return this.errEmail = "User already exists"

               // You can show an error message or perform any other action here
            } else {
               console.log(error)
            }
         }
      },
      // create update user
      async updateUser(id, updatedData) {
         console.log("id", id)
         console.log("new content", updatedData)
         try {
            if (!updatedData.fname) {
               return this.errFname = "Enter your first name"
            }
            if (!updatedData.lname) {
               return this.errLname = "Enter your last name"
            }
            if (!updatedData.email) {
               return this.errEmail = "Enter your email"
            }
            if (!updatedData.phone) {
               return this.errPhone = "Enter your phone"
            }
            const res = await axios.patch(`http://localhost:3002/api/v1/crud/${ id }`, updatedData)
            const updatedUser = res.data.user._id
            this.users = this.users.map((user) =>
               user.id === updatedUser ? {...user, ...updatedUser} : user,
            )
         } catch (error) {
            if (error.response && error.response.status === 400) {
               console.log("User already exists")
               return this.errEmail = "User already exists"

               // You can show an error message or perform any other action here
            } else {
               console.log(error)
            }
         }
      },

      async deleteUser(id) {
         try {
            const res = await axios.delete(`http://localhost:3002/api/v1/crud/${ id }`)
            const deletedUserId = res.data.user._id
            this.users = this.users.filter(user => user._id !== deletedUserId)
            console.log("this user is deleted", deletedUserId)
         } catch (error) {
            console.error(error)
         }
      },
   },
})