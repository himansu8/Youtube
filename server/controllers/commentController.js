import { createError } from "../error.js"
import commentModel from "../models/commentModel.js"
import videoModel from "../models/videoModel.js"




export async function addComment(req, res, next) {
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
        const comment = await commentModel.findById(res.params.id);
        const video = await videoModel.findById(res.params.id);
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