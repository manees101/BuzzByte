import User from "../models/user.js"
import bcryptjs from "bcryptjs"
export const getUser=async(req,res)=>{
    try{
      const userData=await User.findOne({_id:req.params.id},{tokens:0})
      res.status(200).json({userData})
    }
    catch(err)
    {
        res.status(500).json({msg:"get user : Internal server error"})
    }
}
export const updateUser=async(req,res)=>{
    const {id}=req.params
    try{
       await User.updateOne({_id:id},{...req.body})
       res.status(200).json({msg:"user updated successfully"})
    }
    catch(err)
    {
        res.status(500).json({msg:"update user : Internal server error"})
    }
}
export const updatePassword=async(req,res)=>{
    try
    {
      const {id}=req.params
      const {password}=req.body
      const hashPass=await bcryptjs.hash(password,12)
      await User.updateOne({_id:id},{password:hashPass})
      res.status(200).json({password:hashPass})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({msg:"Internal server error"})
    }
}
export const deleteUser=async(req,res)=>{
    const {id}=req.params
    try
    {
        await User.deleteOne({_id:id})
        res.status(200).json({msg:"user deleted successfully"})
    }
    catch(err)
    {
        res.status(500).json({msg:"delete user: Internal server error"})
    }
}

export const getUserById=async(req,res)=>{
    try
    {
       const user=await User.findById(req.params.id).select("name username")
       res.status(200).json({
        user
       })
    }
    catch(err)
    {
    res.status(500).json({
        msg:err.message
    })
    }
}
export const getAllusers=async(req,res)=>{
    try
    {
      const userList=await User.find({},{password:0,tokens:0})
      res.status(200).json({userList})
    }
    catch(err)
    {
        res.status(500).json({msg:"get all users: Internal server error"})
    }
}