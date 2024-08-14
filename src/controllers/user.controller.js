// import express from 'express';
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';


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



   //step d: check for avatar file type and other validations

   const avatarLocalPath = req.files?.avatar[0]?.path; //this is how we access the file path in the request object,multer provides the files object in the request object
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Please upload avatar")
    } //not checking for coverImage because that wasnt a required field in the schema



    //step e: upload files to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    //using await because we want to wait for the file to be uploaded before moving on to the next step


    //step f : rechecking avatar

    if(!avatar){
        throw new ApiError(500, "Failed to upload avatar")
    }


    //step g: create user

    const user = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", //optional chaining operator because coverImage is not a required field
    })





    //step h : check if user was created successfully

  const createdUser =   await User.findById(user._id).select("-password -refreshToken") 
  //select("-password") : this is how we exclude a field from the response , minus sign is used to exclude a field


  if(!createdUser){
      throw new ApiError(500, "Failed to create user")
  }


    //step i: send response to the frontend

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
    //ApiResponse is a class that we created in the utils folder, it takes in 3 arguments: status code, data, and message. It also has a success property that is true if the status code is less than 400, and false otherwise.



})

export {registerUser}


