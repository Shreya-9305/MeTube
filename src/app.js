import express from "express"

import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//step 1: addded cors and cookie parser
//this will allow us to make request from the frontend to the backend because by default the browser does not allow us to make request from one domain to another domain
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

//STEP 2: this will allow us to parse json data from the request body because we are using express which is a node.js framework and it does not have built in support for parsing json data from the request body
app.use(express.json({limit:"16kb"}))


//STEP 3: this line of code will allow us to parse url encoded data from the request body because url can be in any format ( may include - or %) so we need to parse it

app.use(express.urlencoded({extended:true}))

//STEP 4: this line of code will allow us to serve static files from the public folder(name of the folder can be anything) in the project directory
app.use(express.static("public"))


//STEP 5: this line of code will allow us to parse cookies from the request headers
app.use(cookieParser())

export {app}


