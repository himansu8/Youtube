import { createError } from "../error.js"
import commentModel from "../models/commentModel.js"
import videoModel from "../models/videoModel.js"




export async function addComment(req, res, next) {
    console.log("-----------------",req.user)

    const newComment = new commentModel({ ...req.body, userId: req.user.id })
    try {
        const savedComment = await newComment.save()
        res.status(200).send(savedComment)
    } catch (error) {
        next(error)
    }
}

export async function deleteComment(req, res, next) {
    try {
        const comment = await commentModel.findById(req.params.id);
        const video = await videoModel.findById(comment.videoId);
        // console.log("1",comment)
        // console.log("2",video)
        // console.log("-----------------",req.user)
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await commentModel.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted.");
        } else {
            return next(createError(403, "You can delete ony your comment!"));
        }
      

    } catch (error) {
        next(error)
    }
}


export async function getComments(req, res, next) {
    try {
        const comments = await commentModel.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    } catch (error) {
        next(error)
    }
}