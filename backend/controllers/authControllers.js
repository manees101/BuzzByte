import bcryptjs from "bcryptjs"
import User from "../models/user.js"
export const register=async(req,res)=>{
    const {password}=req.body
    try{
        const hashPass=await bcryptjs.hash(password,12)
        const newUser=await User.create({...req.body,password:hashPass})
        const token=await newUser.generateToken()
        res.status(201).json({userData:newUser,token})
    }
    catch(err)
    {
        res.status(500).json({msg:"Internal server error"})
    }
}
export const login=async(req,res)=>{
    const {username,password}=req.body
    try
    {
       const userData=await User.findOne({username})
       if(userData)
       {
        const checkPassword=await bcryptjs.compare(password,userData.password)
        if(checkPassword)
        {
           const token=await userData.generateToken()
           res.status(200).json({userData,token})
        }
        else
        {
         res.status(400).json({msg:"password is not correct"})
        }
       }
       else
       {
        res.status(404).json({msg:"User not found"})
       }
      
    }
    catch(err)
    {
        res.status(500).json({msg:"Internal server error"})
    }
}

export const logout=async(req,res)=>{
    try
    {
       const {id}=req.params
       const {authorization}=req.headers
       const token=authorization.split(" ")[1]
    
       const user=await User.findOne({_id:id})
       await user.deleteToken(token)
        res.status(200).json({success:true,msg:"Token deleted successfully"})
    }
    catch(err)
    {
        res.status(500).json({success:false,err})
    }
}
