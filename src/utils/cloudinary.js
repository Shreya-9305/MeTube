import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
//fs is a core Node.js module that allows us to work with the file system



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
         // Click 'View Credentials' below to copy your API secret
    });

    //NOTE:YAHI CINFIG CODE HI FILE UPLOAD KI PERMISSION DILWATA HAI VRNA CLOUDINARY KO KAISE PTA CHLEGA KI FILE UPLOAD KRNA HAI , KISKA, KAHA.







    


// **************************************************************************************//

// fileparameter is MY argument name , this is the path of the file that we want to upload



const uploadOnCloudinary = async (fileParameter) => {
    try {

        // Check if file exists , if not return null
        if(!fileParameter){
            return null;
        }

        // else upload file to cloudinary
       const response = await cloudinary.uploader.upload(fileParameter,
            {resource_type: "auto"},
        )
        //(this is a built-in method of cloudinary to upload file, read docs for more).
       
        console.log("File uploaded successfully on cloudinary", response.url); //now well get the url of the uploaded file

        return response;

        
    } catch (error) {
        
        fs.unlinkSync(fileParameter); //delete the file from the local storage , because it can be dangerouse malicious file.
        //unlinkSync instead of unlink because it is synchronous and we want to delete the file BEFORE the function ends.
        return null;
    }
}

export default uploadOnCloudinary;




    
    