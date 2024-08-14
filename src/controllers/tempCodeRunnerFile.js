import express from 'express';
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';


const registerUser = asyncHandler(async (req, res) => {
    // //code to register user
    // res.status(200).json({message: 'User registered successfully muhehehe'})

    //step a: get user details from the request body or frontend.
    //hence we will destructure those exact fields from the request body
    const {fullname, rmail,username, password} =  req.body;
    console.log("email:", email);



    //step b: validation
   if(
       [fullname, email, username, password].some((field)=>field?.trim() === "")
   ){

    throw new ApiError(400, "Please fill in all fields")

   }
   //.some() Method: .some((field) => field?.trim() === ""): This method is called on the array. The .some() method checks if at least one element in the array satisfies the condition provided by the callback function.
   //more in notes





   //step c : check if user already exists

   const existedUser = User.findOne({
      $or: [ {email}, {username} ], //syntax for multiple or query in mongoose
   })

   if(existingUser){
       throw new ApiError(409, "User already exists")
   }

   console.log("req.files?.avatar[0]?.path")

})

export {registerUser}


