const jwt = require("jsonwebtoken");

async function authorize(event, context) {
    try {
        console.log("----", event, context);

        const token = event?.headers?.["x-token"];

        const key = "fucker";

        return new Promise((resolve, reject) => {
            jwt.verify(token, key, (err, decoded) => {
                if (err) {
                    reject({ statusCode: 401, body: JSON.stringify({ error: "Invalid token" }) });
                } else {
                    resolve({ statusCode: 200, body: JSON.stringify({ data: decoded }) });
                }
            });
        });

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Token verification Error" })
        };
    }
}

exports.authorize = authorize;

