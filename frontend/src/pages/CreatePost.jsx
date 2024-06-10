import React, { useState, useRef } from "react";
import Tiptap from "../components/Tiptap";
import { IoImageOutline } from "react-icons/io5";
import Loader from "../components/Loader";
import {v1 } from "uuid"
import { uploadImage } from "../api/imageAPI";
import postAPI from "../api/postAPI";
import { useSelector,useDispatch } from "react-redux";
import { addPost } from "../reducers/postReducer";
import { useNavigate } from "react-router-dom";
const categories = [
  "",
  "Technology",
  "Science",
  "Health",
  "Travel",
  "Food",
  "Fashion",
  "Sports",
  "Entertainment",
  "Lifestyle",
  "Finance",
  "Education",
  "Books",
  "Gaming",
  "Environment",
  "Fitness",
  "others"
];
const CreatePost = () => {
  const imgRef = useRef();
  const [image, setImage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(0);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("")
  const [contentHtml, setContentHtml] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const userData=useSelector(state=>state.user.userData)

  const token=useSelector((state)=>state.user.token)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [errors, setErrors] = useState({
    category: false,
    title: false,
    image: false,
    content:false
  });
  const handleSubmit =async (e) => {
    e.preventDefault();
    if (category === "" || !title || !image || !contentHtml) {
      setErrors({
        category: category === "",
        title: !title,
        image: !image,
        content: !contentHtml
      });
      return;
    }
  setErrors({
      category: false,
      title: false,
      image: false,
      content: false
    });
    setIsLoading(true)
    const id=v1()+"."+image.name.split(".")[1]
    try
    {
      await uploadImage({id:id.split(".")[0],image})
      const newPost={
        title,
        desc:contentHtml,
        Image:id,
        status,
        category,
        authorId:userData._id
      }
      const post=await postAPI.createPost({newPost,token})
      dispatch(addPost({postData:post}))    
    }
    catch(err)
    {
      
    }

    
    setTitle("")
    setImage(null)
    setContentHtml(null)
    setCategory('')
    setStatus(0)
    setIsLoading(false)
    navigate("/")
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4 pt-4">
      <div className="w-full ">
        <button
         disabled={isLoading}
          type="submit"
          className="  w-[120px] h-10 bg-blue-600 disabled:bg-gray-500 text-white rounded-lg 
        font-bold text-[20px] float-right mr-4 shadow-lg shadow-slate-400 flex items-center justify-center gap-2"
          onClick={handleSubmit}
        >
          Submit {isLoading ? <div className="h-5 w-5 flex">
            <Loader h={'full'} w={'full'} color={'text-blue-900'}/>
          </div>:""}
        </button>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-[70%] md:h-full h-[70%] flex flex-col gap-4 mt-4 md:mt-0">
          <div className="mx-auto w-[90%] flex flex-col gap-4">
            <h2 className={` font-bold text-[15px] ${errors.title ? "text-red-600":"text-black"} md:text-[20px]`}>Title</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => {setTitle(e.target.value);setErrors((prev)=>({...prev,title:false}))}}
              className="border-solid border-[2px] border-black rounded-md w-[100%] h-10 bg-gray-300 p-4"
            />
             {errors.category ? (
              <h1 className="text-red-600">*Title cannot be empty </h1>
            ) : (
              ""
            )}
          </div>
          <div className="w-[90%] mx-auto mt-4 flex flex-col gap-4">
          {errors.content ? (
              <h1 className="text-red-600">*Content cannot be empty</h1>
            ) : (
              ""
            )}
            <h2 className={` font-bold text-[15px] ${errors.content ? "text-red-600":"text-black"} md:text-[20px]`}>Content</h2>
            <Tiptap content={content} setContentHtml={setContentHtml}/>
          </div>
        </div>
        <div className="md:w-[30%] w-full md:h-full h-[30%] flex flex-col gap-4">
          <div className="flex flex-col gap-4 w-[90%] mx-auto">
            <h2 className={`text-[15px] md:text-[20px] ${errors.image ? "text-red-600":"text-black"} 
            font-bold`}>Image</h2>
            <div className={`border-solid ${errors.image ? "border-red-600":"border-slate-600"}  text-slate-400 border-[2px]  
            rounded-md flex justify-center items-center gap-4 cursor-pointer h-10`}>
              <input
                type="file"
                name="image"
                id="img"
                accept=".jpg,.png,.webp"
                className="hidden"
                ref={imgRef}
                onChange={(e)=>{onImageChange(e);setErrors((prev)=>({...prev,image:false}))}}
              />

              <IoImageOutline
                className={`text-[30px] ${errors.image ? "text-red-600":'text-black'}`}
                onClick={() => imgRef.current.click()}
              />
              <h2 className="text-[10px] lg:text-[15px]">{image ? image.name:"Choose an image"}</h2>
            </div>
            {errors.image ? (
              <h1 className="text-red-600">*Please select an image</h1>
            ) : (
              ""
            )} 
          </div>

          <div className="flex flex-col gap-4 w-[90%] mx-auto">
            <h2 className="text-[15px] md:text-[20px] font-bold ">Status</h2>
            <select
              name="status"
              id="status"
              className="w-[100%] h-[35px] rounded-md 
     border-solid border-[2px] border-black text-[10px] md:text-[15px]"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={0} className="">
                Inactive
              </option>
              <option value={1} className="">
                Active
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-4 w-[90%] mx-auto">
            <h2 className={`text-[15px] ${errors.category ? "text-red-600":"text-black"} md:text-[20px] font-bold `}>Category</h2>
            <select
              name="categories"
              className={`w-[100%] h-[35px] rounded-md border-solid 
     border-[2px] ${
       errors.category ? " border-red-600" : "border-black"
     }  text-[10px] md:text-[15px]`}
              onChange={(e) => {setCategory(e.target.value);setErrors((prev)=>({...prev,category:false}))}}
            >
              {categories.map((item, index) => (
                <option
                  key={index}
                  value={item.toLowerCase()}
                  className="rounded-md"
                >
                  {item}
                </option>
              ))}
            </select>
            {errors.category ? (
              <h1 className="text-red-600">*Please select a category</h1>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
