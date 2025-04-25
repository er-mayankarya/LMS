import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../config.js";

export function userMiddleware(req , res , next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token , JWT_USER_SECRET);

    if (decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.status(403).json({
            message : "You ain't signed in"
        })
        
    }

}