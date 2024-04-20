import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImage } from "../api/imageAPI";
import parse from "html-react-parser";
import userAPI from "../api/userAPI";
import Author from "./Author";
const PostCard = ({ id, Image, category, authorId, title, desc }) => {
  const [image, setImage] = useState(null);

  const shortTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;
  const shortDesc =
    desc.length > 100 ? desc.substr(0, 80) + "<span> ...<span/>" : desc;
  const [authorList, setAuthorList] = useState(null);
  const author = authorList?.filter((author) => author._id === authorId);
  useEffect(() => {
    const data = getImage({ id: Image.split(".")[0] });
    setImage(data);
    userAPI.getAllUsers().then((data) => setAuthorList(data));
  }, []);
  return (
    <div
      className=" p-4 md:w-[400px] w-[90%] h-[500px] md:h-[500px] bg-slate-900 
    rounded-lg backdrop-brightness-50 shadow-gray-600 shadow-lg 
    hover:scale-[1.02]  transition-all duration-500 m-4"
    >
      <div className="h-[50%] md:h-[60%] w-[95%] mx-auto relative">
        <img
          src={image?.href}
          alt={Image}
          className="h-[100%] w-[100%] object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <div className="w-[95%] md:h-[25%] h-[30%] mx-auto flex flex-col gap-2 md:gap-2 mt-4 overflow-hidden text-white">
        <Link to={`/post/${id}`} className="h-[30%]">
          <h2 className="font-bold text-[20px] leading-[25px] overflow-hidden">
            {shortTitle}
          </h2>
        </Link>
        <Link to={`/post/${id}`} className="h-[70%]">
          <h2 className=" text-[15px]">{parse(shortDesc)}</h2>
        </Link>
      </div>
      <div className="md:h-[15%] h-[20%] w-[95%] flex justify-between items-center">
       {author && <Author Image={author[0]?.Image} name={author[0]?.name} username={author[0]?.username}/>}
        <div className="bg-slate-600 h-[40px] px-4 rounded-lg text-white text-[15px]  md:text-[20px] flex items-center justify-center">
          <Link to={`/post/category/${category}`}>{category}</Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
