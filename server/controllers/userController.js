import { createError } from "../error.js";
import userModel from "../models/userModel.js";


export async function updateUser(req, res, next) {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can updated only your account!!"))
    }
}

export async function deleteUser(req, res, next) {
    if (req.params.id === req.user.id) {
        try {
            await userModel.findByIdAndDelete(req.params.id,
            )
            res.status(200).json("user has been deleted")
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can delete only your account!!"))
    }
}


export async function getUser(req, res, next) {
    try {
        const user = await userModel.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}


export async function subscribe(req, res, next) {
    try {
        await userModel.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id },
          });
          await userModel.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
          });
          res.status(200).json("Subscription successfull.")
    } catch (error) {
        next(error)
    }
}


export async function unSubscribe(req, res, next) {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id },
          });
          await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
          });
          res.status(200).json("Unsubscription successfull.")
    } catch (error) {
        next(error)
    }
}


export async function like(req, res, next) {
    try {

    } catch (error) {
        next(error)
    }
}

export async function disLike(req, res, next) {
    try {

    } catch (error) {
        next(error)
    }
}