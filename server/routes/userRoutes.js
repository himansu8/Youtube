import express from 'express'
import { deleteUser, disLike, getUser, like, subscribe, unSubscribe, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../verifyToken.js';


const router = express.Router();

router.put("/:id",verifyToken, updateUser)

router.delete("/:id",verifyToken, deleteUser)

router.get("/find/:id", getUser)

router.put("/sub/:id",verifyToken, subscribe)

router.put("/unsub/:id",verifyToken, unSubscribe)

router.put("/like/:videoId",verifyToken, like)

router.put("/dislike/:videoId",verifyToken, disLike)


export default router;