 //step1) Creating a wrapper function to handle async functions

 //const asyncHandler = () => {}
 //const asyncHandler = (fn) => {() => {}}   
//const asyncHandler = (fn) => () => {}
    //const asyncHandler = (fn) => async() => {}

//STEP 2 : Implementing the asyncHandler function

// const asyncHnadler = (fn) => async(req,res,next) =>
// {
//     try
//     {
//         await fn(req,res,next) //this will execute the function passed to the asyncHandler
//     }
//     catch(error)
//     {
//         res.status(error.code || 500).json({

//             success:false,
//             message:error.message || "Something went wrong"
//         })
//     }
// }   









//ANOTHER SYNTAX USED IN PRODUCTION GRADE IS PROMISE BASED SYNTAX:

const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
    Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
}
}


export {asyncHandler}
