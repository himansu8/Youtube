import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        videoId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)
export default mongoose.model('commentModel', commentSchema, 'Comments')