// Importing the Mongoose library
const mongoose = require("mongoose")

// Function to connect to the MongoDB database
function connectDB(url) {
   try {
      // Connecting to the MongoDB database using the provided URL
      mongoose.connect(url)
      console.log("MongoDB Connected...")
   } catch (error) {
      // Handling any errors that occur during the connection process
      console.error(error)
   }
}

// Exporting the connectDB function to be used in other parts of the codebase
module.exports = connectDB
