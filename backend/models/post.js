import mongoose from "mongoose"
const postSchema=new mongoose.Schema({
    category:{
        type:String,
        required:[true,'Please provide name']
    },
    authorId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    Image:{
        type:String
    },
    status:Boolean
},
{
    timestamps:true
})

const Post=new mongoose.model("Post",postSchema)

export default Post