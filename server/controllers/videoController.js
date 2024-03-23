import videoModel from '../models/videoModel.js'



export async function addVideo(req,res,next){
    const newVideo = new videoModel({userId : req.user.id, ...req.body})
    try {
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    } catch (error) {
        next(error)
    }
}

export async function updateVideo(req,res,next){
    try {
        
    } catch (error) {
        next(error)
    }
}

export async function deleteVideo(req,res,next){
    try {
        
    } catch (error) {
        next(error)
    }
}

export async function getVideo(req,res,next){
    try {
        
    } catch (error) {
        next(error)
    }
}