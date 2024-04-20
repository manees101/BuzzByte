import React, { useState } from 'react';
import { useDispatch,useSelector  } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Loader from '../components/Loader';
import authAPI from '../api/authAPI';
import { logout } from '../reducers/userReducer';
const Logout = () => {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token=useSelector(state=>state.user.token)
  const handleLogout = async () => {
      setLoading(true)
      const result=await authAPI.logout({token})
      if(result)
      {
        dispatch(logout())
      }
      setLoading(false)
      navigate('/')
  };
  return loading ?  <div className='w-full h-[80vh] font-semibold flex flex-col justify-center items-center gap-2'>
        <Loader h={10} w={10} color={'text-blue-600'} />
        Logging out...
      </div>
      :(
        <div className="bg-white p-4 rounded-md shadow-md w-full h-[80vh] flex flex-col gap-4 items-center justify-center">
          <p className="text-lg mb-4">Are you sure you want to logout?</p>
          <div className="flex justify-end font-semibold">
            <button
              className="px-4 py-2 hover:bg-red-700 bg-red-600 text-white rounded-md mr-2"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
              onClick={()=>navigate("/")}            
            >
              Go Back
            </button>
          </div>
        </div>
      )
};

export default Logout;
