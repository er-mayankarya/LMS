import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema({

    email : String,
    password : String ,
    firstName : String ,
    lastName : String ,
});

const adminSchema = new Schema({

    email : String,
    password : String ,
    firstName : String ,
    lastName : String ,
});

const courseSchema = new Schema({

    title : String,
    description : String,
    price : Number,
    imageUrl : String ,
    creatorId : Types.ObjectId

})

const purchaseSchema = new Schema({

    courseId : Types.ObjectId,
    userId : Types.ObjectId
})

export const userModel = mongoose.model("User" , userSchema);
export const adminModel = mongoose.model("Admin" , adminSchema);
export const courseModel = mongoose.model("Courses" , courseSchema);
export const purchaseModel = mongoose.model("Purchases" , purchaseSchema);