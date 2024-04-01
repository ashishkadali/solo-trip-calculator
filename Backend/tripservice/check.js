
const jwt = require("jsonwebtoken");

export async function authorize(event, context) {
    try {
        
        const token =event?.headers?.authorize;
        const key = "fucker"
        const decode = jwt.verify(token,key,(res,err)=>{
            
            if(err){
                context.end();
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: "invalid tolen" })
                };
            }else{
                return {
                    statusCode : 200,
                    body: JSON.stringify(res)
                } 
            }
        })

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
}
