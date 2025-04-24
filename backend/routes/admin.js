import { Router } from "express";
export const adminRouter = Router();

adminRouter.post("/signup" , (req, res) => {
    const { email , password , firstName , lastName } = req.body;
    
        userModel.create({
            email ,
            password, 
            firstName,
            lastName
        })
    
        res.json({
            message : "Admin Signed Up"
        })

});

adminRouter.post("/signin" , (req ,res) => {

});

adminRouter.post("/course" , (req , res) => {

});

adminRouter.put("/course" , (req , res) => {

});

adminRouter.delete("/course" , (req , res) => {

});

adminRouter.get("/courses/bulk" , (req , res) => {

});


