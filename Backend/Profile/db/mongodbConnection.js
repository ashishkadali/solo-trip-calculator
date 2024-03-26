const mongoose =  require("mongoose");
let conn = null;

export const connect  = async() =>{
    if(conn == null){
        conn = await mongoose.connect(process.env.DB_URL , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        })
    }

    return conn
}