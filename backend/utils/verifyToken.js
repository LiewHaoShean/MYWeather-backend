import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY, (err,res) => {
        if(err){
            console.log(err);
            return false;
        }else{
            return res;
        }
    });
};