
const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')

exports.userRegister=async (req,res)=>{
    try{
        const {username,email,password}=req.body
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(406).json("User already exist...")
        }
        else{
            const newUser=new users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        console.log(err);
        res.status(401).json(err)
    }
}

exports.userLogin=async (req,res)=>{
    const {email,password}=req.body 

    const existingUser=await users.findOne({email,password})
    if(existingUser){
        const token=jwt.sign({userId:existingUser._id},process.env.SECRETKEY)
        res.status(200).json({existingUser,token })
    }
    else{
        res.status(406).json("Invalid email/password")
    }
}