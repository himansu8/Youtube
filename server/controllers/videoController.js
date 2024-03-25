import videoModel from '../models/videoModel.js'
import {createError} from '../error.js'
import userModel from '../models/userModel.js'

export async function addVideo(req, res, next) {
    const newVideo = new videoModel({ userId: req.user.id, ...req.body })
    try {
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    } catch (error) {
        next(error)
    }
}

export async function updateVideo(req, res, next) {
    try {
        const video = videoModel.findById(req.params.id);
        if (!video) return next(createError(404, "video not found"))
        if (req.user.id === video.userId) {
            const updatedVideo = await videoModel.findByIdAndUpdate(
                req.params.id, {
                $set: req.body,
            },
                { new: true }
            )
            res.status(200).json(updatedVideo)
        } else {
            return next(createError(403, "You can updated on;y your video"))
        }
    } catch (error) {
        next(error)
    }
}

export async function deleteVideo(req, res, next) {
    try {
        const video = videoModel.findById(req.params.id);
        if (!video) return next(createError(404, "video not found"))
        if (req.user.id === video.userId) {
            await videoModel.findByIdAndDelete(req.params.id)
            res.status(200).json("the video deleted successfully")
        } else {
            return next(createError(403, "You can updated on;y your video"))
        }
    } catch (error) {
        next(error)
    }
}

export async function getVideo(req, res, next) {
    try {
        const video = await videoModel.findById(req.params.id);
        res.status(200).json(video);
    } catch (error) {
        next(error)
    }
}


export async function addView(req, res, next) {
    try {
        await videoModel.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
    } catch (error) {
        next(error)
    }
}


export async function random(req, res, next) {
    try {
        const videos = await videoModel.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (error) {
        next(error)
    }
}



export async function trend(req, res, next) {
    try {
        const videos = await videoModel.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (error) {
        next(error)
    }
}




export async function sub(req, res, next) {
    try {
        const user = await userModel.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers
        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await videoModel.find({ userId: channelId });
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
        next(error)
    }
}




export async function getByTag(req, res, next) {
    const tags = req.query.tags.split(",");
    try {
        const videos = await videoModel.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (error) {
        next(error)
    }
}




export async function search(req, res, next) {
    const query = req.query.q;
    try {
        const videos = await videoModel.find({
            title: { $regex: query, $options: "i" },
          }).limit(40);
          res.status(200).json(videos);
    } catch (error) {
        next(error)
    }
}