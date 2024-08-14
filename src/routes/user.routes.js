import {Router} from 'express';
import {registerUser} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

//STEP 1 : Created the router object


const router = Router();

//step 2: added the route for the registerUser endpoint
router.route("/register").post(
    upload.fields([
        {
            name: "avatar", 
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

export default router;