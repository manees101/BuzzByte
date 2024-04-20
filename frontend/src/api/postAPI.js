import axios from "axios";
const postAPI=axios.create({baseURL:"https://buzz-byte-server.vercel.app"})
postAPI.getAllPosts=async()=>{
    try
    {
       const result=await postAPI.get("/api/v1/post")
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
       const result=await postAPI.post("/api/v1/post",newPost,{
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
      const result=await postAPI.patch(`/api/v1/post/${id}`,data,{
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
     const result= await postAPI.delete(`/api/v1/post/${id}`,{
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