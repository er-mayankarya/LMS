import { Router } from "express";
import { courseModel, purchaseModel } from "../db.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
export const courseRouter = Router();

courseRouter.post("/purchase" ,userMiddleware , async (req , res) => {

    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId ,
        courseId
    })
    res.json({
        message : "You have sucessfully bought the course"
    })

});

courseRouter.get("/preview" , async (req , res) => {

    const courses = await courseModel.find({});

    res.json({
        courses
    })

});