import { getUser,updateUser,deleteUser,updatePassword, getAllusers } from "../controllers/userControllers.js";
import express from "express"
import auth from "../middleware/auth.js";
const userRouter=express.Router()
userRouter.route("/").patch(auth,updateUser).delete(auth,deleteUser).get(auth,getUser)
userRouter.route("/all").get(getAllusers)
userRouter.route("/password").patch(auth,updatePassword)
export default userRouter