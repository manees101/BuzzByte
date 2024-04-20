import axios from "axios";
const postAPI=axios.create()
postAPI.getAllPosts=async()=>{
    try
    {
       const result=await axios.get("/api/v1/post")
       return result.data.postList
    }
    catch(err)
    {
       console.log(err)
    }
}

postAPI.createPost=async({newPost,token})=>{
    try
    {
       const result=await axios.post("/api/v1/post",newPost,{
        headers:{
            Authorization:`Bearer ${token}`
        },
       })
       return result.data.postData
    }
    catch(err)
    {
        console.log(err)
    }
}
postAPI.updatePost=async({data,id,token})=>{
    try
    {
      const result=await axios.patch(`/api/v1/post/${id}`,data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
    }
    catch(err)
    {
      console.log(err)
    }
}

postAPI.deletePost=async({id,token})=>{
    try
    {
     const result= await axios.delete(`/api/v1/post/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      return result
    }
    catch(err)
    {
      console.log(err)
    }
}


export default postAPI