import React, { useState, useEffect } from "react";
import { getImage } from "../api/imageAPI";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaEye } from "react-icons/fa";
import { FiPlusCircle,FiEdit  } from "react-icons/fi";
import Loader from "../components/Loader";
const Dashboard = () => {
  const userData = useSelector((state) => state.user.userData);
  const [image, setImage] = useState(null);
  const postList=useSelector(state=>state.user.posts)
  console.log(postList)
  const posts=postList?.filter((post)=>post.authorId===userData?._id)
  useEffect(() => {
    const img = getImage({ id: userData?.Image.split(".")[0] });
    setImage(img?.href);
  }, []);
  return !posts ? <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center">
    <Loader h={10} w={10} color={'text-blue-500'}/>
    Loading...
    </div>
     : (
    <div className="w-full flex flex-col gap-2 md:gap-4 mt-4">
      <div className="mx-4 flex flex-col gap-4">
        <h1 className="font-semibold text-[15px] md:text-[20px]">Profile</h1>
        <div className="h-[200px] w-full md:w-[50%] lg:w-[30%] bg-gray-800 p-4 rounded-lg flex justify-around">
          <div className="w-[50%] h-[100%] flex items-center justify-center">
            <img
              src={image}
              alt={userData?.name}
              className="w-[150px] h-[150px] rounded-full"
            />
          </div>
          <div className="w-[50%] h-[100%] flex flex-col justify-around items-center">
          <div>
          <h1 className="text-white font-bold md:text-[25px] text-[20px]">
           {userData?.name}
          </h1>
          <h2 className="text-dimWhite">
            @{userData?.username}
          </h2>
          </div>
          
          <Link to={`../profile/${userData?._id}`}>
            <div className="w-[120px] h-[40px] bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center gap-2 p-2">
              <CgProfile className="text-[20px]"/>
            <h2 className="text-white font-semibold">My Profile</h2>
            </div>
           
          </Link> 
          </div>
        </div>
      </div>
      <div className=" mx-4 flex flex-col gap-4 mt-4 md:mt-2">
        <div className=" w-full flex justify-between items-center">
        <h1 className="font-semibold text-[15px] md:text-[20px]">
         Posts
        </h1>
        <Link to={`../post/create`}>
          <h2 className="flex w-[100px] h-[40px] hover:bg-blue-600 bg-blue-500 rounded-lg font-semibold items-center justify-evenly text-white">
          <FiPlusCircle className="text-black" /> Create
          </h2>
        </Link>
        </div>
        <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              View
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post._id} className="hover:bg-gray-200">
              <td className="px-4 py-4 ">{post.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`../post/${post._id}`} className="text-blue-600 hover:underline">
                <FaEye className="text-[20px] text-black"/>
                </Link>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap ${post.status ? "text-green-500":"text-red-500"}`}>{post.status ? "Active":"Inactive"}</td>
              <td className="px-6 py-4 whitespace-nowrap ">
                <Link
                  to={`../post/${post._id}/edit`}
                  className="text-white mr-3"
                >
                  <h2 className="w-[60px] h-[30px] flex items-center p-2 gap-1 bg-blue-500 hover:bg-blue-600 rounded-lg ml-3 text-center">
                  <FiEdit /> Edit
                  </h2>
                
                </Link>
                {/* <button
                 className="w-[60px] h-[30px] bg-red-500 rounded-lg mt-4 mx-auto text-center text-white"
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default Dashboard;
