import dotenv from "dotenv"
dotenv.config()
import express from "express"
import "colors"
import authRouter from "./router/authRoutes.js"
import postRouter from "./router/postRoutes.js"
import userRouter from "./router/userRoutes.js"
import connectDB from "./db/connect.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
const PORT=process.env.PORT || 4000
const DB_URI=process.env.MONGO_URI
const app=express()
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
var whitelist = ['https://buzz-byte.netlify.app', 'https://buzzbyte.vercel.app']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
app.get('/',(req,res)=>{
    res.json("Hellow from server")
})
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/post",postRouter)


const startServer=async()=>{
    await connectDB(DB_URI)
    app.listen(PORT,()=>{
        console.log(`Server is running on Port ${PORT}`.bold.yellow)
    })
}
startServer()