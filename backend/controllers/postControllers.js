import Post from "../models/post.js"
export const createPost=async(req,res)=>{
    try
    {
      const newPost=await Post.create(req.body)
      res.status(201).json({postData:newPost})
    }
    catch(err)
    {
      res.status(500).json({msg:"Internal server error"})
    }
}

export const updatePost=async(req,res)=>{
    const {postId}=req.params
    try
    { 
      await Post.updateOne({_id:postId},{...req.body},{new:true})
      res.status(200).json({msg:"post updated successfully"})
    }
    catch(err)
    {
        res.status(500).json({msg:"Internal server error"})
    }
}

export const deletePost=async(req,res)=>{
    const {postId}=req.params
    try
    {
      await Post.deleteOne({_id:postId})
       res.status(200).json({msg:"Post deleted successfully"})
    }
    catch(err)
    {
        res.status(500).json({msg:"Internal server error"})
    }
}

export const getAllPosts=async(req,res)=>{
    try
    {
       const postList=await Post.find()
       res.status(200).json({postList})
    }
    catch(err)
    {
        res.status(500).json({msg:"Internal server error"})
    }
}