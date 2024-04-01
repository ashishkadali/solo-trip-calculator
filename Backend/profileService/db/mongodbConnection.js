const mongoose = require("mongoose");


async function connect() {
    try {
        await mongoose.connect("mongodb+srv://ashishkadali7:LRNbQKuB8q3jBtoA@cluster0.qe2yn7m.mongodb.net/test").then((res) => {
            
            // console.log(res,"Connected to database")
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
};

exports.connect = connect;

