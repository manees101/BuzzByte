import axios from "axios"
const userAPI=axios.create()

userAPI.getUser=async({token})=>{
    try
    {
        console.log(token)
       const result=await axios.get("/api/v1/user",{
        headers:{
            Authorization:`Bearer ${token}`
        }
       })
       return result.data.userData
    }
    catch(err)
    {
        console.log(err)
    }
}
userAPI.getAllUsers=async()=>{
    try
    {
         const result=await axios.get("/api/v1/user/all")
         return result.data.userList
    }
    catch(err)
    {
       console.log(err)
    }
}
userAPI.updateUser=async({userData,token})=>{
   try
   {
    const result=await axios.patch(`/api/v1/user`,userData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
     })
     return result.data.userData
   }
   catch(err)
   {
     console.log(err)
   }
}
userAPI.updatePassword=async({password,token})=>{
    try
    {
        const result=await axios.patch(`/api/v1/user/password`,{password},{
        headers:{
            Authorization:`Bearer ${token}`
        }
       })
       return result.data.password
    }
    catch(err)
    {
       console.log(err)
    }
}
export default userAPI