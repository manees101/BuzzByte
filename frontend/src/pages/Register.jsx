import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import authAPI from '../api/authAPI'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setData } from '../reducers/userReducer'
import { uploadImage } from '../api/imageAPI'
import { v1 } from 'uuid'
import validator from "validator"
const Register = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [userData, setUserData] = useState({
    name:"",
    email:"",
    username:"",
    password:"",
    confPass:""
  })
  const [errors, setErrors] = useState({
    name:false,
    username:false,
    email:false,
    password:false,
    confPass:false,
    image:false,
    emailFormate:false
  })
  const [image, setImage] = useState(null)
  const handleChange=(e)=>{
    setUserData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleImageChange=(e)=>{
     if(e.target.files&&e.target.files[0])
     {
      setImage(e.target.files[0])
     }
  }
  const handleSubmit=async()=>{
    if(userData.name==="")
    {
     return setErrors((prev)=>({...prev,name:true}))
    }
    else
    {
      setErrors((prev)=>({...prev,name:false}))
    }
    if(userData.email==="")
    {
      setErrors((prev)=>({...prev,emailFormate:false}))
      return setErrors((prev)=>({...prev,email:true}))
    }
    else
    {
      setErrors((prev)=>({...prev,email:false}))
      if(!validator.isEmail(userData.email))
      {
          return setErrors((prev)=>({...prev,emailFormate:true}))
      }
      else
      {
         setErrors((prev)=>({...prev,emailFormate:false}))
      }
      
    }
    if(userData.username==="")
    {
      return setErrors((prev)=>({...prev,username:true}))
    }
    else
    {
      setErrors((prev)=>({...prev,username:false}))
    }
    if(userData.password==="")
    {
     return setErrors((prev)=>({...prev,password:true}))
    }
    else
    {
      setErrors((prev)=>({...prev,password:false}))
    }
    if(!validator.isStrongPassword(userData.password))
    {
     return setErrors((prev)=>({...prev,password:true}))
    }
    else
    {
      setErrors((prev)=>({...prev,password:false}))
    }
    if(userData.confPass!==userData.password)
    {
     return setErrors((prev)=>({...prev,confPass:true}))
    }
    else
    {
      setErrors((prev)=>({...prev,confPass:false}))
    }
    
    if(!image)
    {
     return setErrors((prev)=>({...prev,image:true}))
    }
    else
    {
      setErrors((prev)=>({...prev,image:false}))
    }
    const id=v1()+"."+image.name.split(".")[1]
    await uploadImage({id:id.split(".")[0],image})
    const result=await authAPI.register({userData:{...userData,Image:id}})
    dispatch(setData({userData:result.userData,token:result.token}))
    navigate("/")
  }
  return (
    <div className='w-full h-screen bg-slate-400 flex flex-grow md:items-center'>
    <div className=' w-full h-[100%] md:w-[60%] md:h-[60%] md:mx-auto flex flex-col p-6 rounded-lg'>
   <div className='w-full h-[40%] md:h-[90%] flex flex-col flex-wrap gap-8 '>
   <div className='md:w-[400px] w-[95%] h-20 flex flex-col gap-2  '>
      <label htmlFor="name" className='textBase '>Name</label>
      <input type="text" name='name' id='name' value={userData.name}
       onChange={handleChange}
       className='h-10 rounded-md p-4'
       />
       {
        errors.name && <p className='text-red-500'>* Name cannot be empty</p>
       }
     </div>
     <div className='md:w-[400px] w-[95%]  h-20 flex flex-col gap-2 '>
      <label htmlFor="email" className='textBase'>Email</label>
      <input type="email" name='email' id='email' value={userData.email}
       onChange={handleChange}
       className='h-10 rounded-md p-4'
       />
        {
        errors.email && <p className='text-red-500'>* Email cannot be empty</p>
       }
        {
        errors.emailFormate && <p className='text-red-500'>* Email formate is not correct</p>
       }
     </div>
     <div className='md:w-[400px] w-[95%] h-20 flex flex-col gap-2 '>
      <label htmlFor="username" className='textBase'>Username</label>
      <input type="text" name='username' id='username' value={userData.username}
       onChange={handleChange}
       className='h-10 rounded-md p-4'
       />
        {
        errors.username && <p className='text-red-500'>* username cannot be empty</p>
       }
     </div>
     <div className='md:w-[400px] w-[95%] h-20 flex flex-col gap-2 '>
      <label htmlFor="password" className='textBase '>Password</label>
      <input type="password" name='password' id='password' value={userData.password}
       onChange={handleChange}
       className='h-10 rounded-md p-4'
       />
        {
        errors.password && <p className='text-red-500'>* Please choose a strong password</p>
       }
     </div>
     <div className='md:w-[400px] w-[95%] h-20 flex flex-col gap-2 '>
      <label htmlFor="confPass" className='textBase '>Confirm Password</label>
      <input type="password" name='confPass' id='confPass' value={userData.confPass}
       onChange={handleChange}
       className='h-10 rounded-md p-4'
       />
        {
        errors.confPass && <p className='text-red-500'>* password does not match</p>
       }
     </div>
     <div className='md:w-[400px] w-[95%] h-30 flex flex-col gap-2 '>
      <label htmlFor="image" className='textBase '>Image</label>
      <input type="file" name='image' id='image'
       onChange={handleImageChange}
       className='h-10 rounded-md'
       accept='.jpg,.png'
       />
        {
        errors.image && <p className='text-red-500'>* Image cannot be empty</p>
       }
     </div>
   </div>
    <div className='mt-2'>
       <button className='text-[15px] font-semibold md:text[20px] w-[120px] 
       h-[40px] text-white bg-slate-800 rounded-lg
       shadow-md shadow-slate-500
       '
       onClick={handleSubmit}
       >
        Register
       </button>
       <h2 className='mt-4'>
        Already have an account <span className='text-slate-800 text-[15px] font-bold underline '>
          <Link to={'/auth/login'}>
          Login
          </Link>
          </span> 
       </h2>
     </div>
     
    </div>
    </div>
  )
}

export default Register