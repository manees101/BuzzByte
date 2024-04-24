import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImage, deleteImage, uploadImage } from "../api/imageAPI";
import userAPI from "../api/userAPI";
import { updateUser, updatePassword } from "../reducers/userReducer";
import { FiEdit } from "react-icons/fi";
import { useNavigate,useParams } from "react-router-dom";
import Loader from "../components/Loader";
import bcryptjs from "bcryptjs"
import validator from "validator"
import { v1 } from "uuid";
const UserProfile = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.token);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    username: userData?.username || "",
    email: userData?.email || "",
  });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [userImage, setUserImage] = useState(null)
  const {id}=useParams()
  const [userList, setUserList] = useState(null)
  const [errors, setErrors] = useState({
    username:false,
    email:false,
    password:false,
    strongPass:false,
    confPass:false,
    image:false,
    emailFormate:false
  })
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    const checkUsername=userList?.some((user)=>user.username===formData.username&&user._id!==id)
    if(checkUsername)
    {
      return setErrors((prev)=>({...prev,username:true}))
    }
    else
    {
      setErrors((prev)=>({...prev,username:false}))
    }
    if(validator.isEmail(formData.email))
    {
      setErrors((prev)=>({...prev,emailFormate:false}))
      const checkEmail=userList?.some((user)=>user.email===formData.email&&user._id!==id)
      if(checkEmail)
      {
       return setErrors((prev)=>({...prev,email:true}))
      }
      else
      {
        setErrors((prev)=>({...prev,email:false}))
      }
      
    }
    else
    {
       return setErrors((prev)=>({...prev,emailFormate:true}))

    }
    if(userImage)
    {
      const imgId=v1()+"."+userImage?.name.split(".")[1]
      await deleteImage({id:userData?.Image?.split(".")[0]})
      await uploadImage({id:imgId.split(".")[0],image:userImage})
      await userAPI.updateUser({userData:{...formData,Image:imgId},token})
      dispatch(updateUser({userData:{...formData,Image:imgId}}))
      setIsEditable(false);
      return;   
    }
    await userAPI.updateUser({userData:{...formData,Image:userData.Image},token})
    dispatch(updateUser({userData:{...formData}}))
    setIsEditable(false);
  };
  const handlePasswordChange = async () => {
    const checkPass=await bcryptjs.compare(password,userData?.password)
    if(!checkPass)
    {
      return setErrors((prev)=>({...prev,password:true}))
    }
    else
    {
      setErrors((prev)=>({...prev,password:false}))
      if(!validator.isStrongPassword(newPassword))
      {
        return setErrors((prev)=>({...prev,strongPass:true,confPass:false}))
      }
      else
      {
        setErrors((prev)=>({...prev,strongPass:false}))
        if(newPassword!==confPassword)
        {
          return setErrors((prev)=>({...prev,confPass:true}))
        }
        else
        {
          setErrors((prev)=>({...prev,confPass:false}))
        }
      }
    }
    setLoading(true)
    const newPass=await userAPI.updatePassword({password:newPassword,token})
    dispatch(updatePassword({password:newPass}))
    setLoading(false)
  };
  useEffect(() => {
    const img = getImage({ id: userData?.Image?.split(".")[0] });
    setImage(img);
    userAPI.getAllUsers().then((data)=>setUserList(data.filter((user)=>user._id!=id)))
  }, []);
  return !userData ? (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-2">
      <Loader h={10} w={10} color={"text-blue-600"} />
      <p>Loading...</p>
    </div>
  ) : (
    <div className="w-full min-h-[80vh] bg-gray-700 p-4">
      <div className="w-full h-[20%] flex items-center justify-center ">
        <img
          src={image?.href}
          alt={userData.username}
          className="w-[120px] h-[120px] rounded-full bg-red-300"
        />
      </div>
      <div className="w-full h-[80%] flex md:flex-row flex-col md:gap-0 gap-4">
        <div className=" w-[100%] md:w-[60%] h-[100%] flex flex-col items-center justify-center gap-4 mt-4">
          <div className="md:w-[60%] w-[100%] h-[80px] flex flex-col gap-2 ">
            <label
              htmlFor="name"
              className="text-[20px] font-semibold text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-dimWhite h-[80%] rounded-lg p-2"
              disabled={!isEditable}
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className=" w-full md:w-[60%] h-[80px] flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-[20px] font-semibold text-white"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-dimWhite h-[80%] rounded-lg p-2"
              disabled={!isEditable}
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-600">
              *This username is not available.
              </p>}
              
          </div>
          <div className=" w-full md:w-[60%] h-[80px] flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[20px] font-semibold text-white"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="bg-dimWhite h-[80%] rounded-lg p-2"
              disabled={!isEditable}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-600">
              *This email is already taken.
              </p>}
              {errors.emailFormate && <p className="text-red-600">
              *The email formate is not correct.
              </p>}
          </div>
          <div className={`${isEditable ? "block":"hidden"}`}>
           <input type="file" name="image" id="image" onChange={(e)=>{
             if (e.target.files && e.target.files[0]) {
              setUserImage(e.target.files[0]);
            }
           }}
           accept=".jpg,.png"
           />
          </div>
          {isEditable ? (
            <button
              className="flex gap-2 h-[40px] font-semibold mt-4
        hover:bg-blue-600 text-white justify-center
         items-center w-[80px] bg-blue-500 rounded-lg"
              onClick={handleSubmit}
            >
              <p>Save</p>
            </button>
          ) : (
            <button
              className="flex gap-2 h-[40px] font-semibold mt-4 hover:bg-blue-600
         text-white justify-center items-center
          w-[80px] bg-blue-500 rounded-lg"
              onClick={() => setIsEditable(true)}
            >
              <FiEdit /> <p>Edit</p>
            </button>
          )}
        </div>
        <div className=" w-[100%] md:w-[50%] h-[100%] flex flex-col items-center justify-center gap-4 mt-4">
          <div className="md:w-[60%] w-[100%] h-[80px] flex flex-col gap-2">
            <label
              htmlFor="oldPass"
              className="text-[20px] font-semibold text-white"
            >
              Old Password
            </label>
            <input
              type="password"
              name="oldPass"
              id="oldPass"
              className="bg-dimWhite h-[60%] rounded-lg p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           <p className="text-red-600 h-[10%]"> {errors.password && 
              "*The password is not correct."
              }
              </p>
          </div>
          <div className=" w-full md:w-[60%] h-[80px] flex flex-col gap-2">
            <label
              htmlFor="newPass"
              className="text-[20px] font-semibold text-white"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPass"
              id="newPass"
              className="bg-dimWhite h-[60%] rounded-lg p-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
           <p className="text-red-600 h-[20%]"> {errors.strongPass && 
              "*Please choose a strong password."
              }
              </p>
             
          </div>
          <div className=" w-full md:w-[60%] h-[80px] flex flex-col gap-2">
            <label
              htmlFor="confPass"
              className="text-[20px] font-semibold text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confPass"
              id="confPass"
              className="bg-dimWhite h-[60%] rounded-lg p-2"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
           <p className="text-red-600 h-[20%]">  {errors.confPass && 
             "*The passwords does not match."
              }
              </p>
          </div>

          <button
            className="flex gap-2 h-[40px] font-semibold mt-4
        hover:bg-blue-600 text-white justify-center
         items-center w-[150px] bg-blue-500 rounded-lg"
            onClick={handlePasswordChange}
          >
            {loading ? <p>Submitting...</p> :<p>Change Password</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
