import {login,register,logout} from "../controllers/authControllers.js"
import express from "express"
import auth from "../middleware/auth.js"
const authRouter=express.Router()
authRouter.route("/login").post(login)
authRouter.route('/register').post(register)
authRouter.route('/logout').patch(auth,logout)

export default authRouter