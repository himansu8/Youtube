import express from 'express'
import { googleAuth, logoutToken, signin, signup } from '../controllers/authController.js';



const router = express.Router();


//create a user
router.post("/signup", signup)

//sign in a user
router.post("/signin", signin)

//google auth
router.post("/google", googleAuth)

router.get("/removetoken", logoutToken)





export default router;