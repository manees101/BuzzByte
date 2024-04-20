import React,{useState,useEffect} from 'react'
import { getImage } from '../api/imageAPI'
const Author = ({name,username,Image}) => {
    const [image, setImage] = useState(null)
  useEffect(()=>{
    const img = getImage({ id:Image?.split(".")[0] });
      setImage(img?.href);
  })
  return (
    <div className="w-[60%] h-[100%] flex pt-2">
    <div className="w-[30%] h-[100%] flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="h-[40px] w-[40px] rounded-full bg-red-500"
        />
    
    </div>
    <div className="w-[70%] h-[100%] p-2 flex flex-col gap-2 md:gap-0 justify-center">
      <h2 className="text-white font-bold text-[12px] md:text-[15px] ">
        {name}
      </h2>
      <h3 className="text-dimWhite text-[10px] md:text-[12px]">
        @{username}
      </h3>
    </div>
  </div>
  )
}

export default Author