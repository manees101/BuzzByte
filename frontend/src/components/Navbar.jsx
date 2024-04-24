import React,{useState} from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { Link,useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"
const Navbar = () => {
    const [logo, setLogo] = useState(null)
    const [toggle, setToggle] = useState(false);
    const userData=useSelector(state=>state.user.userData)
    const navigate=useNavigate()
  return (
    <div className=' flex justify-between items-center p-4 w-full h-[100%] bg-slate-800'>
     <div className=' md:ml-10 w-10 h-10 cursor-pointer' onClick={()=>navigate("/")}>
       {logo ? <img src="logo" alt="logo" className='w-full h-full object-contain '/>:<h2 className='font-semibold  text-[20px] md:text-[30px] text-white'>BuzzByte</h2>} 
     </div>
     <div className='mr-20 lg:block hidden'>
        <ul className=' flex items-center gap-10 text-white font-semibold'>
            <li className='cursor-pointer hover:bg-blue-500 p-2 rounded-lg' onClick={()=>{setToggle(false);navigate('/dashboard')}}> {userData?.username} </li>
            <li  className='cursor-pointer hover:bg-blue-500 p-2 rounded-lg' onClick={()=>{setToggle(false);navigate('/pot/create')}}>Create Posts </li>
            <li  className='cursor-pointer hover:bg-blue-500 p-2 rounded-lg' onClick={()=>{setToggle(false);navigate('/authors')}}> Authors</li>
            {
             userData ? <li  className='cursor-pointer hover:bg-blue-500 p-2 rounded-lg ' onClick={()=>{setToggle(false);navigate('/auth/logout')}}>Logout</li> : <li  className='cursor-pointer p-2 rounded-lg hover:bg-blue-500 ' onClick={()=>{setToggle(false);navigate('/auth/login')}}>Login</li>
            }
        </ul>
     </div>
     
     <div className='md:mr-10 block lg:hidden '>
     {
        toggle ? <div className='absolute z-[5] top-0 p-4 right-0 w-[70%] h-full scale-100 bg-slate-900 opacity-90'>
            <IoCloseSharp className='text-white text-[30px] cursor-pointer hover:text-teal-500' onClick={()=>setToggle((prev)=>!prev)}/>
            <div className='m-10'>
        <ul className=' flex flex-col justify-center gap-10 text-white font-semibold'>
        <li className='cursor-pointer' onClick={()=>{setToggle(false);navigate('/dashboard')}}>{userData?.username} </li>
            <li  className='cursor-pointer ' onClick={()=>{setToggle(false);navigate('/post/create')}}>Create Posts</li>
            <li  className='cursor-pointer 'onClick={()=>{setToggle(false);navigate('/authors')}}> Authors</li>
            {
             userData ? <li  className='cursor-pointer ' onClick={()=>{setToggle(false);navigate("/auth/logout")}}>Logout</li> : <li  className='cursor-pointer hover:text-teal-400 ' onClick={()=>{setToggle(false);navigate("/auth/login")}}>Login</li>
            }
        </ul>
     </div>
        </div>:<HiMenuAlt3 className='text-white text-[30px] cursor-pointer' onClick={()=>setToggle((prev)=>!prev)}/>
     }
     </div>
   
     {/* </div> */}
    
    </div>
  )
}

export default Navbar