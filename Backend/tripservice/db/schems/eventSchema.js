

const mongoose = require("mongoose");

const tripDetails = new mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true,
    },
    tripname:{
        type: String,
        require: true,
    },
    from: {
        type: String,
        require: true,
    },
    destination :{
        type: String,
        require: true,
    },
    budget :{
        type: String,
        require: true,
        default: 0
    },
    transport :{
        type: String,
        require: true,
        
    },
    days :{
        type: String,
        require: true,
        default: 0
    },
}, { timestamps: true})
 

module.exports =mongoose.model("tripDetails", tripDetails);