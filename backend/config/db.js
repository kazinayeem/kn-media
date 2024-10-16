const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
