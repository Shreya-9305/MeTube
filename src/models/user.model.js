import mongoose , { Schema } from 'mongoose';
//STEP 1: imported schema to avoid writing mongoose.Schema again and again

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
            
        },
        //trim is used to remove white spaces from the string when saving it to the database 
        //index is going to be used to search the user by username because it is unique
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
           lowercase: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //cloudinary url
           required: true,
        },
        coverImage: {
            type: String, //cloudinary url
           
        },
        watchHistory: {
            type: Schema.Types.ObjectId,
            ref: "Video",
            default: [],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        refreshToken: {
            type: String,
            default: '',
        },


    },
    {
        timestamps: true,
    }
);

//STEP 2:

//validate,save,remove,updateOne,deleteOne,init are some of the middleware functions in mongoose
//using pre middleware to hash the password before saving it to the database

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
//if the password is not modified then we will not hash it again
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
//we cant use callback func here cause it does not know the context of this
// which means it does not know the user object that we are saving


// **********************************************//

//STEP 3: Creating a custom mthod to check if entered password is correct


//these are provided under monngoose only, so diff syntax

userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password, this.password) 
    //this.password is the hashed password in the database
}

// **********************************************//

//STEP 4: Creating other methods for acess token and refresh token
//BOTH ARE JWT TOKENS

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
         _id: this._id,
         email: this.email,
         username: this.username,
         fullName: this.fullName,

         },
         process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,

            }
        );
}
//its a fast function so we do not need to use async await

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
         _id: this._id,
         },
         process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY,

            }
        );
}


export const User =  mongoose.model('User', userSchema);


//note: jwt is a bearer token (like a key) that is used to authenticate the user.
//bearer token means whoever bears this token is the user