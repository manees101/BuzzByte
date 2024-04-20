import jsonwebtoken from "jsonwebtoken"
import User from "../models/user.js"
const auth=async(req,res,next)=>{
    const {authorization}=req.headers
    if(authorization &&authorization.startsWith("Bearer"))
    {
        try
        {
          const token=authorization.split(" ")[1]
          const tokenData=jsonwebtoken.verify(token,process.env.SECRET_KEY)

          const user=await User.findOne({_id:tokenData._id})
          if(user)
          {
            if(user.verifyToken(token))
            {
                req.params.id=tokenData._id
                next()
            }
            else
            {
              res.status(403).json({msg:"Invalid token"})
            }
          }
          else
          {
             res.status(404).json({msg:"user does not exist"})
          }
        }
        catch(err)
        {
          res.status(500).json({msg:"auth : Internal server error"})
        }
    }
    else
    {
        res.status(404).json({msg:"token not found"})
    }
}

export default auth