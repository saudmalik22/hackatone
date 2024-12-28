const jwt = require('jsonwebtoken');

const authVerify =(req,res, next)=>{
    try {
        const secretKey = process.env.SECRET_KEY;
        if(!req.headers.authorization){
            res.json({
                data:[],
                status:"error",
                error:"token is required"
            })
        } 
        var decoded = jwt.verify(req.headers.authorization, secretKey);
        if(!decoded){
            res.json({
                data:[],
                status:"error",
                error:"token is invalid"
            })
        }
        req.body.user =decoded;
        next();
    } catch (error) {
        res.json({
            data:[],
            status:"error",
            error:"error"
        })
        
    }
  
}

module.exports = authVerify;