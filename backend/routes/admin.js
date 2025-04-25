import { Router } from "express";
import jwt from 'jsonwebtoken';
import { adminModel , courseModel } from "../db.js";
import { JWT_ADMIN_SECRET } from "../config.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
export const adminRouter = Router();

adminRouter.post("/signup" , async (req, res) => {
    const { email , password , firstName , lastName } = req.body;
    
        try {
            await adminModel.create({
                email ,
                password, 
                firstName,
                lastName
            })
        } catch (error) {
            console.log(`Error : ${error}`);
        }
    
        res.json({
            message : "Admin Signed Up"
        })

});

adminRouter.post("/signin" , async (req ,res) => {

   const { email , password } = req.body;
   
       const admin = await adminModel.findOne({
           email , 
           password
       })
   
       if (admin) {
           
           const token = jwt.sign({
               id : admin._id
           } , JWT_ADMIN_SECRET)
   
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

adminRouter.post("/course" , adminMiddleware , async (req , res) => {
    const adminId = req.adminId;

    const {title , description , price , imageUrl } = req.body;

    try {

        const course = await courseModel.create({
            title ,
            description ,
            price ,
            imageUrl ,
            creatorId : adminId
        })

        res.json({
            message : "Course Created" ,
            courseId : course._id
        })
        
    } catch (error) {
        console.log(`Error : ${error}`);
    }

});

adminRouter.put("/course" ,adminMiddleware , async (req , res) => {

    const adminId = req.adminId;

    const {title , description , price , imageUrl , courseId } = req.body;

    try {

        const course = await courseModel.updateOne({
            _id: courseId,
            creatorId : adminId
        },
            {
            title ,
            description ,
            price ,
            imageUrl 
            
        })

        res.json({
            message : "Course Updated" ,
            courseId : course._id
        })
        
    } catch (error) {
        console.log(`Error : ${error}`);
    }

});

adminRouter.delete("/course" ,adminMiddleware , async(req , res) => {
    const adminId = req.adminId;
    const courseId = req.body;

    await courseModel.deleteOne({
        _id :  courseId ,
        creatorId : adminId
    })

    res.json({
        message: "Course Deleted"
    })

});

adminRouter.get("/courses/bulk" , adminMiddleware , async (req , res) => {

    const adminId = req.adminId;
    const courses = await courseModel.find({
        creatorId : adminId
    })

    res.json({
        courses
    })

});


