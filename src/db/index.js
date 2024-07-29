import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

// Load environment variables from .env file
dotenv.config();

// Step 1: Creating a function to connect to the database
const connectDB = async () => {
  try {
    // Storing the connection in a variable
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {

        // These are the options to pass in to avoid warnings
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    // This code will run if the connection is successful
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR", error);

    // Instead of throwing an error, use an exit function to exit the process
    process.exit(1);
    // 1 here means exit with failure
    // 2 means exit with success and so on...
  }
};

export default connectDB;
