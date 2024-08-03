
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";




dotenv.config({path: "./.env"});

connectDB()
.then(()=>{

    //putting a middleware code before the app.listen just in case 
    app.on("error", (error) => {
        console.log("Error", error);
        throw error;
    })

    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })

})
.catch((err) => {

    console.log("MongoDb Connection failed (index)", err);
  
})






































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


