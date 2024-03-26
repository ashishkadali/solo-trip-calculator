const mongoose =  require("mongoose");
let conn = null;

export const connect  = async() =>{
    if(conn == null){
        conn = await mongoose.connect("mongodb+srv://ashishkadali7:6bZrmSzpxPgDuAhy@solotrip.feaaetp.mongodb.net/?retryWrites=true&w=majority&appName=soloTrip" , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        })
    }

    return conn
}