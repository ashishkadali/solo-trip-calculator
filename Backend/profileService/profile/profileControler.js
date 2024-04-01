
const jwt = require('jsonwebtoken');
const {profile} = require("../db/schems/profileSchema");
const { connect} = require("../db/mongodbConnection");
const bcrypt  =  require("bcrypt");



  async function register(event, context){
    try {

        console.log("ashish1 ",event.body);

         await connect()
     
        const {name,email,password,confirmPassword} = JSON.parse(event.body);
        
        const findUser= await profile.find({email : email});
        
        console.log("ashish 2 ",findUser); 

        if(findUser.length >0 ){
            return{
                statusCode : 400,
                body : JSON.stringify({
                    error : "user is already registerd"
                })
            }
        }

        if(password !== confirmPassword){
            return{
                statusCode : 400,
                body : JSON.stringify({
                    error : "password missmatch"
                })
            }
        }

        const userData = new profile({
            name,email,password,confirmPassword
        })

        const data = await userData.save();

    
        return{
            statusCode : 200,
            body : JSON.stringify({data})
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

exports.register =  register;

async function login(event){

    try {
        console.log("--------",event.body);
        await connect();

        const {email,password} = JSON.parse(event.body);
   
        const findUser= await profile.find({email : email});
   
           if(findUser.length == 0){
               return{
                   statusCode : 400,
                   body : JSON.stringify({
                       error : "user is not found"
                   })
               }
           };

           console.log("--------",findUser);

   
           const payload = {
               email :email
             };
            
            const isMatch =  bcrypt.compareSync(password,findUser[0].password);

            if(!isMatch){
                return {
                    statusCode : 500,
                    body: JSON.stringify({
                        error : "Password didn't match"
                    })
                }
            }
            


           const options = {
               expiresIn: '1h', // Token will expire in 1 hour
               algorithm: 'HS256' // HMAC SHA256 algorithm
             };

           const key = "fucker";

           const token = jwt.sign(payload,key, options);
   
           return {
               statusCode : 200,
               body : JSON.stringify({
                   token : token
               })
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

exports.login =  login;


async function update(event){

    try {

        console.log(event.body)
   
        await connect();

        
        const {name,email,password,confirmPassword} = JSON.parse(event.body);
    
        const findUser  = await profile.find({email :email});
    
    
        if(findUser.length == 0 ){

            return{
                statusCode : 401,
                body : JSON.stringify({
                    error : "user is not registerd"
                })
            }
        }
    
        const data =await  profile.findOneAndUpdate({_id :  ObjectId(findUser[0]._id)}, {name, password, confirmPassword})
    
        const findUpdatedUser  = await profile.findOne({email :email});
        
        return({
            statusCode : 200,
            body: {
                data : JSON.stringify(findUpdatedUser)
            }
        })
        
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

exports.update =  update;
