import jwt from "jsonwebtoken";

const generateToken = (id, time) => {
    return jwt.sign({id}, process.env.JWT_KEY, {expiresIn: time});
};

export default generateToken;