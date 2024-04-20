import React from 'react'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <div className='w-full h-[80vh] bg-gray-500 p-4 flex justify-center items-center flex-col'>
     <h1 className='text-[60px] md:text-[80px] font-bold text-white '>
      404
     </h1>
     <p className='text-dimWhite text-[20px] md:text-[30px]'>
      Oops! The page you are looking for does not exist
     </p>
     
     <Link to={"/"}>
     <button className='w-[100px] h-[40px] bg-gray-800 text-white mt-8 rounded-lg'>
     Home
     </button>
     </Link>
    </div>
  )
}

export default ErrorPage