import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getImage } from '../api/imageAPI'
const AuthorCard = ({
    id,
    Image,
    name,
    posts

}) => {
const [image, setImage] = useState(null)
useEffect(()=>{
  const data=getImage({id:Image.split(".")[0]})
  setImage(data)
},[Image])
  return (
    <div className='w-full md:w-[400px] h-[180px] bg-slate-800 rounded-lg shadow-lg hover:scale-[1.02] 
    transition-transform duration-500 ease-in-out shadow-slate-600 flex gap-4
     items-center justify-around p-4 md:p-0'>
      <div className='w-[50%] h-[90%] flex justify-center items-center'>
        <img src={image?.href} alt={name} className='w-[80%] h-[100%] lg:h-[80%] lg:w-[70%] md:w-[70%] md:h-[80%]  rounded-full'/>
      </div>
      <div className='h-[90%] w-[50%] flex flex-col justify-around'>
        <Link to={`/author/posts/${id}`}>
        <h1 className='font-bold text-[20px] md:text[30px] text-white'>
            {name}
        </h1>
        </Link>
       <Link to={`/author/posts/${id}`}>
       <p className='text-white'>
            {posts}
        </p>
       </Link>
       
      </div>
    </div>
  )
}

export default AuthorCard