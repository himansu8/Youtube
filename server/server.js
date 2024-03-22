import express from 'express'
import './dbConnect.js'
import userRoutes from './routes/userRoutes.js'
import videoRoutes from './routes/videoRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express();
const port = 8888;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Server started up fine")
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)


app.listen(port, () => {
    console.log(`the server started at port no ${port}`)
})