
const {tripDetails} = require("../db/schems/eventSchema");
const {staySchema} = require("../db/schems/staySchema");
const {connect} = require("../db/mongodbConnection");

let conn = null;

/**
 * 
 * @param {createTrip} event for creating tripname, from to destination, budget, mode of transport, days.
 */

module.exports.createTrip = async(event)=>{

    if(!conn){
       conn = await connect()
    } 

    const {tripname , from , destination, budget, transport, Days,email } = JSON.parse(event.body);

    if(!tripname || !from || !destination || !transport || !email  ){
        return {
            statusCode : 400,
            body : JSON.stringify({
                error : "please enter important feilds"
            })
        }
    }

    const savedata = new tripDetails({
        tripname , from , destination, budget, transport, Days, email
    })

    await savedata.save();

    const completeData = await tripDetails.find({email : email})
    return{
        statusCode : 200,
        body : JSON.stringify({completeData})
    }
}

/**
 * 
 * @param {editTrip} event for creating trip name, from to destination, budget, mode of transport, days
 */
module.exports.editTrip = async(event)=>{

    if(!conn){
        conn = await connect()
     } 

    const {tripname , from , destination, budget, transport, Days, id, email } = JSON.parse(event.body);
    const findData  = await tripDetails.find({_id : ObjectId(id)});

    if(!findData){
        return{
            statusCode : 401,
            body : JSON.stringify({
                error : "data not found"
            })
        }
    }

    await tripDetails.findByIdAndUpdate({_id : ObjectId(id)},{tripname , from , destination, budget, transport, Days ,email});

    const completeData = await tripDetails.find({email : email});

    return{
        statusCode : 200,
        body : JSON.stringify({completeData})
    }
    
}

/**
 * 
 * @param {getAlltrip} event for get all details of particular trip by email and (seggigrate data for baisc visual) next
 */
module.exports.getAlltrip = async(event,context)=>{
    
    const { email } = JSON.parse(context.body);


    const completeData = await tripDetails.find({email : email});

    return{
        statusCode : 200,
        body : JSON.stringify({completeData})
    }
}

/**
 * 
 * @param {addExpenses} event for add details like stay and send that details of particalur catigory based on created tripObjectid and catigory 
 */
module.exports.addExpenses = async(event)=>{
    if(!conn){
        conn = await connect()
     } 

    const { email,id, category, price } = JSON.parse(event.body);

    if(!email || !id || !category || !price  ){
        return {
            statusCode : 400,
            body : JSON.stringify({
                error : "please enter important feilds"
            })
        }
    }

    const newData =  new staySchema({
        email,
        id, category, price
    });


    await newData.save();

    const findcatogrydata = await  staySchema.find({id: id,category:category, email:email });

    return{
        statusCode : 200,
        body : JSON.stringify({findcatogrydata})
    }
}

/**
 * 
 * @param {gettripExpensesBycatogry} event  for getting data based on category and created tripObjectid
 */
module.exports.gettripExpensesBycatogry = async(event)=>{

    if(!conn){
        conn = await connect()
     } 

    const { id, category } = JSON.parse(event.body);


    const findcatogrydata = await  staySchema.find({id: id,category:category, email:email});

    return{
        statusCode : 200,
        body : JSON.stringify({findcatogrydata})
    }


}
