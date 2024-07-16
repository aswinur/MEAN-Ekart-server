const jwt=require('jsonwebtoken')

const jwtMiddle=(req,res,next)=>{
    try{
        const token=req.headers['authorization'].split(" ")[1]
        if(token){
            const result =jwt.verify(token,process.env.SECRETKEY)
            const {userId}=result
            req.payload=userId
            next()
        }
        else{
            res.status(404).json("Invalid token , Please login first")
        }
    }
    catch(err){
        console.log(err);
        res.status(406).json("Login first")
    }
}

module.exports=jwtMiddle