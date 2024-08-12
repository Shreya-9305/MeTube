import {Router} from 'express';
import {registerUser} from '../controllers/user.contoller.js';


//STEP 1 : Created the router object


const router = Router();

//step 2: added the route for the registerUser endpoint
router.route("/register").post(registerUser)

export default router;