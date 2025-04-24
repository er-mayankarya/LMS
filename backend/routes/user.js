import { Router } from "express";
import { userModel , purchaseModel } from "../db.js"
import jwt from 'jsonwebtoken';
import { JWT_USER_SECRET } from "../config.js";


export const userRouter = Router();

userRouter.post("/signup" , (req, res) => {

    const { email , password , firstName , lastName } = req.body;

    userModel.create({
        email ,
        password, 
        firstName,
        lastName
    })

    res.json({
        message : "User Signed Up"
    })

});

userRouter.post("/signin" , (req ,res) => {

    const { email , password } = req.body;

    const user = userModel.findOne({
        email , 
        password
    })

    if (user) {
        
        const token = jwt.sign({
            email 
        } , JWT_USER_SECRET)

        res.header("token" , token);

        res.send({
            token
        })

        
    } else {
        res.status(403).json({
            message : "Incorrect Credintials"
        })
    }

});

userRouter.get("/purchases" , (req , res) => {

});

