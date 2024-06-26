import  jwt from "jsonwebtoken";
import { createError } from "./error.js";
import config from "./config/config.js";

export function verifyToken(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You Are Not Authenticated!!"))

    jwt.verify(token, config.PRIVATE_KEY, (error, user) => {
        if (error) return next(createError(403, "Invalid Token"))
        req.user = user;
        next()
    })
} 