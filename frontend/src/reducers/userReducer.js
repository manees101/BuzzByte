import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
  name:"user",
    initialState:{
        userData:null,
        token:null,
        posts:null
    },
    reducers:{
        setData:(state,action)=>{
          state.userData=action.payload.userData
          state.token=action.payload.token
          return
        },
        updateUser:(state,action)=>{
          state.userData={...state.userData,
            name:action.payload.userData.name,
            email:action.payload.userData.email,
            username:action.payload.userData.username,
            Image:action.payload.userData.Image
          }
          return
        },
        logout:(state,action)=>{
          state.token=null
          state.userData=null
          return
        },
        setPosts:(state,action)=>{
         return state.posts=action.payload.postList
        },
        updatePassword:(state,action)=>{
          state.userData.password=action.payload.password
          return
        },
        deleteUser:(state,action)=>{
          state.token=null
          state.userData=null
          localStorage.removeItem("token")
          return
        }
    } 
})

export const {getUser,deleteUser,setData,updatePassword,updateUser,setPosts,getToken,logout}=userSlice.actions
const userReducer=userSlice.reducer
export default userReducer