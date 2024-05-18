import React,{useState,useEffect} from 'react'
import { getImage } from '../api/imageAPI'
import { Link } from 'react-router-dom'
const Author = ({name,username,Image,id}) => {
    const [image, setImage] = useState(null)
  useEffect(()=>{
    const img = getImage({ id:Image?.split(".")[0] });
      setImage(img?.href);
  })
  return (
    <div className="w-[60%] h-[100%] flex pt-2">
    <div className="w-[30%] h-[100%] flex items-center justify-center">
      <Link to={`/author/posts/${id}`}> 
      <img
          src={image}
          alt={name}
          className="h-[40px] w-[40px] rounded-full bg-red-500"
        />
      </Link>  
    </div>
    <div className="w-[70%] h-[100%] p-2 flex flex-col gap-2 md:gap-0 justify-center">
     <Link to={`/author/posts/${id}`}>
     <h2 className="text-white font-bold text-[12px] md:text-[15px] ">
        {name}
      </h2>
     </Link> 
     <Link to={`/author/posts/${id}`}>
      <h3 className="text-dimWhite text-[10px] md:text-[12px]">
        @{username}
      </h3>
     </Link>
    </div>
  </div>
  )
}

export default Author