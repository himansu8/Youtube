import express from 'express'



const router = express.Router();


//create a user
router.post("/signup")

//sign in a user
router.post("/signin")

//google auth
router.post("/google")



export default router;