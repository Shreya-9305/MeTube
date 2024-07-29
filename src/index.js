// require("dotenv").config({path: "./env"});

//STEP 3: commented out the code before and  imported the dotenv file (shouldve been the first step)


//STEP 4: Changed the syntax to use an import statmenet instead of require
import dotenv from "dotenv";


//STEP 5 : Commented out the unused imports

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js";


import connectDB from "./db/index.js";



//STEP 6: Added the dotenv config function to the index.js file and configured the path to the env file
dotenv.config({path: "./.env"});



connectDB();






































//step 1: connect to the database using  an iffie function using async await




//APPROACH 1: Adding db connection function directly in the index.js file


//step 2 added express .js and related code , incase the error is because of express not listening to the database

/** import express from "express";

const app = express();

;(async ()=> {

    try {

        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}` )

        application.on("error", (error) => {
            console.log("Error", error);
            throw error;
        }   
        )

        application.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
        
    } catch (error) {

        console.error("Error", error);
        throw error;
        
    }
}) **/


