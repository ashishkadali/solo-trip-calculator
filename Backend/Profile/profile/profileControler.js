import { connect } from "../db/mongodbConnection"
import { Profile } from "../db/schems/profileSchema"
import  jwt  from 'jsonwebtoken';
/**
 * mongo password : 6bZrmSzpxPgDuAhy
 * mongo connection string : mongodb+srv://ashishkadali7:6bZrmSzpxPgDuAhy@solotrip.feaaetp.mongodb.net/?retryWrites=true&w=majority&appName=soloTrip
 */

let conn = null;


export const registerUser = async(event, context) =>{
    try {

        console.log(event.body)
        if(!conn){
           conn = await connect()
        }

        const {name,email,password,confirmPassword} = event.body;

        const findUser= await Profile.find({email : email});

        if(findUser){
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

        const userData = new Profile({
            name,email,password,confirmPassword
        })

        const data = await userData.save();

        /**
         * to discoonect to db
         */
        await conn.close();
        conn = null;

        return{
            statusCode : 200,
            body : JSON.stringify({data})
        }

    } catch (error) {
        console.log(error)
        if(error){
            return {
                statusCode : 500,
                body: JSON.stringify({
                    error : "Internal server error"
                })
            }
        }
    }
}

export const Login = async(event) =>{
    if(!conn){
        conn = await connect()
     }

     const {email,password} = event.body;

     const findUser= await Profile.find({email : email});

        if(!findUser){
            return{
                statusCode : 400,
                body : JSON.stringify({
                    error : "user is not found"
                })
            }
        }

        const payload = {
            email :email
          };
          
        const options = {
            expiresIn: '1h', // Token will expire in 1 hour
            algorithm: 'HS256' // HMAC SHA256 algorithm
          };
        const key = "fucker"
        const token = jwt.sign(payload,key, options)

        return {
            statusCode : 200,
            body : JSON.stringify({
                token : token
            })
        }
}