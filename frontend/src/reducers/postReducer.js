import { createSlice } from "@reduxjs/toolkit";
const postSlice=createSlice({
    name:"post",
    initialState:{
        postList:null
    },
    reducers:{
        setPostList:(state,action)=>{
           state.postList=action.payload.postList
          return
        },
        getPosts:(state,action)=>{
          return state.postList      
         },
        updatePost:(state,action)=>{
            const {postData,id}=action.payload
            console.log(postData,id)
           state.postList=state?.postList?.map((post)=>(
            post._id===id ? {...post,
            category:postData.category,
            title:postData.title,
            desc:postData.desc,
            status:postData.status,
            Image:postData.Image
            }:post
            ))
        },
        deletePost:(state,action)=>{
           state.postList=state.postList?.filter((post)=>post._id!=action.payload.postId)
        },
        addPost:(state,action)=>{
            state.postList=[...state.postList,action.payload.postData]
        }
    }
})

export const {setPostList,getPosts,updatePost,deletePost,addPost}=postSlice.actions
const postReducer=postSlice.reducer
export default postReducer