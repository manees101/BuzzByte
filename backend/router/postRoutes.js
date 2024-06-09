import { createPost,getAllPosts,updatePost,deletePost, getUserPosts } from "../controllers/postControllers.js";
import express from "express"
import auth from "../middleware/auth.js";
const postRouter=express.Router()
postRouter.route("/").get(getUserPosts).post(auth,createPost)
postRouter.route("/:postId").patch(auth,updatePost).delete(auth,deletePost)
postRouter.route("/all").get(getAllPosts)
export default postRouter