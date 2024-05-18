import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authAPI from '../api/authAPI'
import { setData } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import  Loader from "../components/Loader"
const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [userData, setUserData] = useState({
    username:"",
    password:""
  })

  const handleChange=(e)=>{
    setUserData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit=async()=>{
    setIsLoading(true)
    const result=await authAPI.login({userData})
    if(!result.userData)
      {
        setErrors(result.response.data.msg)
        setIsLoading(false)
        return
      }
    dispatch(setData({userData:result.userData,token:result.token}))
    setIsLoading(false)
    navigate("/")
  }
  return (
    <div className='w-[100%] h-screen bg-slate-400 flex justify-center items-center'>
     <div className=' sm:w-[40%] h-[40%] md:h-[35%] lg:h-[50%] w-[95%] '>
       {errors && <p className='text-red-600'>Error: {errors}</p>}
      <div className='w-[90%] h-[35%] flex flex-col gap-4'>
        <label htmlFor="username" className='text-[20px] font-semibold'>Username</label>
        <input type="text" name='username' value={userData.username} 
        onChange={handleChange} id='username'
        className='h-10 rounded-lg bg-slate-200 p-4 outline-none'
        />
      </div>
      <div className='w-[90%] h-[35%] flex flex-col gap-4'>
        <label htmlFor="password" className='text-[20px] font-semibold'>Password</label>
        <input type="password" name='password' value={userData.password}
         onChange={handleChange} id='password'
         className='h-10 rounded-lg bg-slate-200 p-4 outline-none'
         />
      </div>
      <div className='h-[30%] flex flex-col'>
        <button className='h-10 w-20 bg-slate-800 text-white rounded-md
         shadow-md shadow-slate-500 flex items-center justify-center gap-2
        '
        onClick={handleSubmit}
        >
          {isLoading ? <div className="h-5 w-5 flex">
            <Loader h={'full'} w={'full'} color={'text-dimWhite'}/>
          </div>:""} Login
        </button>
        <h2 className='mt-4'>
          Don't have an account <span className='text-slate-900 px-2 font-semibold underline'> 
          <Link to={'/auth/register'}>
          Register
          </Link>
           </span>
        </h2>
      </div>
     </div>
    </div>
  )
}

export default Login