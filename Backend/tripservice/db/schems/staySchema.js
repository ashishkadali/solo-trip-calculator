const mongoose = require("mongoose");

const staySchema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true,
    },
    id:{
        type: String,
        require: true,
    },
    category:{
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
}, { timestamps: true})
 

const StaySchema =mongoose.model("staySchema", staySchema);
module.exports = {StaySchema}