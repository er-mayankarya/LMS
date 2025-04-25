import jwt from "jsonwebtoken";
import { JWT_ADMIN_SECRET } from "../config.js";

export function adminMiddleware(req , res , next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token , JWT_ADMIN_SECRET);

    if (decoded) {
        req.adminId = decoded.id;
        next();
    } else {
        res.status(403).json({
            message : "You ain't signed in"
        })
        
    }
}
