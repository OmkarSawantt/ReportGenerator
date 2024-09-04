const User = require("../models/UserModel");
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken');
const { getTokenDetails } = require("../utils/getTokenDetails");

exports.registerUser=async(req,res)=>{
  try {
      const {name ,email,password}=req.body;
      const cheackEmail=await User.findOne({email})
      if(cheackEmail){
          return res.json({
              message:"User Already Exsist",
              error:true
          })
      }
      const salt=await bcryptjs.genSalt(10)
      const hashedPassword=await bcryptjs.hash(password,salt)

      const newUser={
          name,
          email,
          password:hashedPassword
      }
      const user=new User(newUser)
      const userSave=await user.save()
      if(userSave){
          return res.json({
              message:"User Created Successfully",
              data:userSave,
              success:true
          })
      }else{
          return res.json({
              message:"Something went Wrong",
              error:true
          })
      }

  } catch (error) {
      return res.json({
        success:false,
        error:error
      })
  }
}

exports.loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.json({
                message:"User not Found",
                error:true
            })
        }

        const verifyPass=await bcryptjs.compare(password,user.password)
        if(!verifyPass){
            return res.json({
                message:"Please Check Password",
                error:true
            })
        }
        const tokendata={
            id:user._id,
            email:user.email,
        }
        const token=jwt.sign(tokendata,process.env.JWT_SECRET,{expiresIn:"1d"})
        const cookieOptions={
            http:true,
            secure:false,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
        const resdata={
            token:token,
            id:user._id,
            email:user.email,
            name:user.name,
        }
        return res.cookie('token',token,cookieOptions).json({
            message:"Login Successfull",
            data:resdata,
            success:true
        })
    } catch (error) {
        return res.json({
            success:false,
            error:error
        })
    }
}
exports.userDetails=async(req,res)=>{
    try {
        const token=req.cookies.token || ""
        if(!token){
            return res.json({
                message:"User not Loged in",
                error:true
            })
        }
        const data=getTokenDetails(token);
        const user=await User.findById(data.id).select('-password')
        return res.json({
            success:true,
            data:user
        })
    } catch (error) {
        return res.json({
            success:false,
            error:error.message
        })
    }
}
exports.logout=async(req,res)=>{
    try {
        const cookieOptions={
            http:true,
            secure:false,
            expires: new Date(0)
        }
        return res.cookie('token','',cookieOptions).json({
            message:"session out",
            success:true
        })
    } catch (error) {
        return res.json({
            success:false,
            error:error.message
        })
    }
}