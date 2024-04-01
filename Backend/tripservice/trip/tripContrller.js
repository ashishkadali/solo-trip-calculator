
const {TripDetails} = require("../db/schems/eventSchema");
const {StaySchema} = require("../db/schems/staySchema");
const {connect} = require("../db/mongodbConnection");

let conn = null;

/**
 * 
 * @param {createTrip} event for creating tripname, from to destination, budget, mode of transport, days.
 */

async function createTrip (event,context){

    try {
        
        await connect();

        const {tripname , from , destination, budget, transport, Days,email } = JSON.parse(event.body);
    
        if(!tripname || !from || !destination || !transport || !email  ){
            return {
                statusCode : 400,
                body : JSON.stringify({
                    error : "please enter important feilds"
                })
            }
        }
    
        const savedata = new TripDetails({
            tripname , from , destination, budget, transport, Days, email
        })
    
        await savedata.save();
    
        const completeData = await TripDetails.find({email : email})
        return{
            statusCode : 200,
            body : JSON.stringify({completeData})
        }

    } catch (error) {
        console.log(error)
        if(error){
            return {
                statusCode : 400,
                body: JSON.stringify({
                    error : "Internal server error"
                })
            }
        }
    }
 
}

exports.createTrip = createTrip
/**
 * 
 * @param {editTrip} event for creating trip name, from to destination, budget, mode of transport, days
 */
async function editTrip (event,context){

    try {
        
    await connect()
  

    const {tripname , from , destination, budget, transport, Days, id, email } = JSON.parse(event.body);
    const findData  = await TripDetails.findOne({_id : ObjectId(id)});

    if(findData.length ==0 ){
        return{
            statusCode : 401,
            body : JSON.stringify({
                error : "data not found"
            })
        }
    }

    await TripDetails.findByIdAndUpdate({_id : ObjectId(id)},{tripname , from , destination, budget, transport, Days ,email});

    const completeData = await TripDetails.find({email : email});

    return{
        statusCode : 200,
        body : JSON.stringify({completeData})
    }
        
    } catch (error) {
        if(error){
            return {
                statusCode : 400,
                body: JSON.stringify({
                    error : "Internal server error"
                })
            }
        }
    }

    
}
exports.editTrip =editTrip;
/**
 * 
 * @param {getAlltrip} event for get all details of particular trip by email and (seggigrate data for baisc visual) next
 */
async function getAlltrip (event,context){

    try {
        console.log(context);

        const { email } = JSON.parse(context.body);

        const completeData = await TripDetails.find({email : email});
    
        return{
            statusCode : 200,
            body : JSON.stringify({completeData})
        }
        
    } catch (error) {
        if(error){
            return {
                statusCode : 400,
                body: JSON.stringify({
                    error : "Internal server error"
                })
            }
        }
    }
    

}

exports.getAlltrip =getAlltrip;

/**
 * 
 * @param {addExpenses} event for add details like stay and send that details of particalur catigory based on created tripObjectid and catigory 
 */
async function addExpenses (event){

    try {

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
    
        const newData =  new StaySchema({
            email,
            id,
            category,
            price
        });
    
    
        await newData.save();
    
        const findcatogrydata = await  StaySchema.find({id: id,category:category, email:email });
    
        return{
            statusCode : 200,
            body : JSON.stringify({findcatogrydata})
        }
        
    } catch (error) {
        if(error){
            return {
                statusCode : 400,
                body: JSON.stringify({
                    error : "Internal server error"
                })
            }
        }
    }

}

/**
 * 
 * @param {gettripExpensesBycatogry} event  for getting data based on category and created tripObjectid
 */
async function gettripExpensesBycatogry(event,context){
    try {
        
   
        conn = await connect()
         
    
        const { id, category } = JSON.parse(event.body);
    
    
        const findcatogrydata = await  StaySchema.find({id: id,category:category, email:email});
    
        return{
            statusCode : 200,
            body : JSON.stringify({findcatogrydata})
        }

    } catch (error) {
        if(error){
            return {
                statusCode : 400,
                body: JSON.stringify({
                    error : "Internal server error"
                })
            }
        }
    }
}
