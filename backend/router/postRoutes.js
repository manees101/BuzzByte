import { createPost,getAllPosts,updatePost,deletePost } from "../controllers/postControllers.js";
import express from "express"
import auth from "../middleware/auth.js";
const postRouter=express.Router()
postRouter.route("/").get(getAllPosts).post(auth,createPost)
postRouter.route("/:postId").patch(auth,updatePost).delete(auth,deletePost)

export default postRouter