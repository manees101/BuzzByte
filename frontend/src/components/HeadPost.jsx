import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImage } from "../api/imageAPI";
import parse from "html-react-parser";
import Author from "./Author";
import userAPI from "../api/userAPI";
const HeadPost = ({ id, Image, title, desc, authorId, category }) => {
  const [image, setImage] = useState(null);
  const [authorList, setAuthorList] = useState(null);
  const author = authorList?.filter((author) => author._id === authorId);

  useEffect(() => {
    const data = getImage({ id: Image.split(".")[0] });
    setImage(data);
    userAPI.getAllUsers().then((data) => setAuthorList(data));
  }, []);

  const shortTitle = title.length > 130 ? title.substr(0, 130) + "..." : title;
  const shortDesc =
    desc.length > 340 ? desc.substr(0, 340) + "<span> ...</span>" : desc;
  const mobileTitle = title.length > 50 ? title.substr(0, 50) + "..." : title;
  const mobileDesc =
    desc.length > 50 ? desc.substr(0, 150) + "<span> ...</span>" : desc;
  return author && (
    <div
      className=" p-4 w-[95%] h-[500px] md:h-[400px] bg-slate-900 
    rounded-lg backdrop-brightness-50 shadow-gray-600 shadow-lg 
    hover:scale-[1.02] transition-all duration-500 m-4 flex flex-col md:flex-row gap-0 md:gap-4 "
    >
      <div className="h-[50%] md:h-[100%] w-[95%] md:w-[40%] mx-auto">
        <img
          src={image}
          alt={Image}
          className="h-[100%] w-[100%] relative object-fill rounded-lg"
        />
      </div>
      <div className="w-[95%] md:w-[50%] h-[50%] md:h-[100%] mx-auto flex flex-col gap-4 mt-4 overflow-auto text-white">
        <div className="h-[70%] flex flex-col overflow-hidden">
          <Link to={`/post/${id}`} className="max-h-[40%]">
            <h2 className="font-bold text-[20px] leading-[25px] hidden md:block overflow-hidden truncate md:overflow-hidden">
              {shortTitle}
            </h2>
            <h2 className="font-bold text-[20px] leading-[25px] md:hidden block truncate md:overflow-hidden">
              {mobileTitle}
            </h2>
          </Link>
          <Link to={`/post/${id}`} className="max-h-[60%]">
            <h2 className="text-[15px] hidden md:block overflow-hidden">
              {parse(shortDesc)}
            </h2>
            <h2 className="text-[15px] md:hidden block overflow-hidden">
              {parse(mobileDesc)}
            </h2>
          </Link>
        </div>
        <div className="h-[30%] w-[95%] flex justify-between items-center">
          {/* <div className="w-[60%] h-[100%] flex pt-2 items-center justify-center">
            <div className="w-[30%] h-[100%] flex items-center justify-center">
              {author && <img src={authorImage} alt={author[0]?.name} className="h-[40px] w-[40px] rounded-full " /> }
            </div>
            <div className="w-[70%] h-[100%] p-2 flex flex-col gap-2 md:gap-0 md:items-start md:justify-center">
            <h2 className="text-white font-bold text-[15px]">
              {author && author[0]?.name}
            </h2>
            <h3 className="text-dimWhite text-[12px]">
            @{author && author[0]?.username}
            </h3>
            </div>
          </div> */}
          {author && <Author Image={author[0]?.Image} name={author[0]?.name} username={author[0]?.username}/>}

          <div className="bg-slate-600 w-[30%] h-[40px] px-4 rounded-lg text-white text-[15px]  md:text-[20px] flex items-center justify-center">
           <Link to={`/post/category/${category}`}>
           {category}
           </Link> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadPost;
