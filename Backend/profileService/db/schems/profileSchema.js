
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
    },
    confirmPassword :{
        type: String,
        require: [true,"please enter confirmPassword"],
        select: false
    },

}, { timestamps: true})
 
Profile.pre('save', async function(next) {
    this.password =  bcrypt.hashSync(this.password, 10);
    this.confirmPassword =  bcrypt.hashSync(this.confirmPassword, 10);
    next();
});

const profile = mongoose.model("Profile", Profile);
module.exports = {profile}