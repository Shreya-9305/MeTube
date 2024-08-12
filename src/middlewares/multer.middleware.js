import multer from 'multer';


//WE WILL USE DISK STORAGE TO STORE FILES INSTEAD OF MEMORY bceause it is not efficient
//cb- callback function

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp') //using the temp filder we created at the start.
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
    //   cb(null, file.fieldname + '-' + uniqueSuffix)

    ///--->(not using this yet as it gives every file a unique name with a suffix. We will be using the original name of the file isntead)<------///



        cb(null, file.originalname)
    }
  })
  
 export const upload = multer({ storage: storage })

