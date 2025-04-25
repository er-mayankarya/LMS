import { Router } from "express";
import { userModel , purchaseModel, courseModel } from "../db.js"
import jwt from 'jsonwebtoken';
import { JWT_USER_SECRET } from "../config.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";


export const userRouter = Router();

userRouter.post("/signup" , async (req, res) => {

    const { email , password , firstName , lastName } = req.body;

    try {
        await userModel.create({
            email ,
            password, 
            firstName,
            lastName
        })
    } catch (error) {
        console.log(`Error : ${error}`);
    }

    res.json({
        message : "User Signed Up"
    })

});

userRouter.post("/signin" , async (req ,res) => {

    const { email , password } = req.body;

    const user = await userModel.findOne({
        email , 
        password
    })

    if (user) {
        
        const token = jwt.sign({
            id : user._id
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

userRouter.get("/purchases" , userMiddleware, async (req , res) => {

    const userId = req.userId;
    
    const purchases = await purchaseModel.find({
        userId
    })

    let puschasedCourseIds = [];

    for (let i = 0 ; i<purchases.length ; i++){
        puschasedCourseIds.push(purchases[i].courseId);
    }

    const courseData = await courseModel.find({
        _id : { $in : puschasedCourseIds }
    })

    res.json({
       purchases ,
       courseData
    })

});

