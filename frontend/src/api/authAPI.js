import axios from "axios"
const authAPI=axios.create({baseURL:"https://buzz-byte-server.vercel.app"})
// const authAPI=axios.create({baseURL:"http://localhost:8000"})

authAPI.login=async({userData})=>{
    try
    {
      const result=await authAPI.post("/api/v1/auth/login",{...userData})
      localStorage.setItem("token",result.data.token)
      return result.data
    }
    catch(err)
    {
       console.log(err)
       return err
    }
}

authAPI.register=async({userData})=>{
    try
    {
      const result=await authAPI.post("/api/v1/auth/register",userData)
      
      localStorage.setItem("token",result.data.token)
      return result.data
    }
    catch(err)
    {
      console.log(err)
      return err
    }
}

authAPI.logout=async({token})=>{
   try
   {
      await authAPI.patch(`/api/v1/auth/logout`,{},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      localStorage.removeItem("token")
      return true
   }
   catch(err)
   {
     console.log(err)
     return err
   }
}

export default authAPI