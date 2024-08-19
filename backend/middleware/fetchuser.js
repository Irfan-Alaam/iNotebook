const jwt = require("jsonwebtoken");
const jwtSecret = "shhhhh";
const fetchuser=(req,res,next)=>{
    //get the user from the jwt oken and add id to req object
    const token =req.header('auth-token')
    if(!token){
        return res.status(400).json({ error: "Please authenticate using valid token" });
    }
    try{
    const data = jwt.verify(token,jwtSecret)
    req.user = data.user;
    next();
}catch(error){
    return res.status(400).json({ error: "Server error occurred" });
}
}
module.exports = fetchuser;