import React from 'react'
import { Link } from 'react-router-dom'
const categories=["Science","Technology","Fiction","Art","Thriller","Fantasy","Novel"]
const Footer = () => {
  //TODO: Fetch categories from redux and display dynamically
  return (
    <div className=' bg-gray-800 w-full h-[100%]'>
     <div className='h-[70%] flex flex-wrap gap-2 md:gap-4 justify-center items-center p-2'>
       {
        categories.map((item,index)=>(
          <Link to={`/post/category/${item.toLocaleLowerCase()}`} key={index} className='text-[15px] font-semibold text-white hover:text-gray-500'>{item}</Link>
        ))
       }
     </div>
     <div className=' bg-gray-700 h-[30%] w-full font-semibold text-[15px] text-center'>
      Developed by Muhammad Anees.
     </div>
    </div>
  )
}

export default Footer