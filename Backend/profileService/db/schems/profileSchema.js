
const validator = require("validator");

const mongoose = require("mongoose");
const bcrypt  =  require("bcrypt");

const Profile = new mongoose.Schema({
    name:{
        type: String,
        require :[true, "please add name"]
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate : [validator.isEmail, "enter email is not valid"]
    },
    password :{
        type: String,
        require: [true,"please enter password"],
        select: false
    },
    confirmPassword :{
        type: String,
        require: [true,"please enter confirmPassword"],
        select: false
    },

}, { timestamps: true})
 
Profile.pre('save',async(next)=>{
    this.password =  await bcrypt.hash(this.password,10);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword,10);
    next();
})
module.exports =mongoose.model("Profile", Profile);