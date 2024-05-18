import mongoose from "mongoose"
import jsonwebtoken from "jsonwebtoken"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name']
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Image:{
        type:String
    },
    tokens: [{
        token: String
    }]
})
userSchema.methods.generateToken = async function () {
    try {
        const newToken = jsonwebtoken.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: newToken })
        await this.save()
        return newToken
    }
    catch (err) {
        throw err
    }
}
userSchema.methods.deleteToken = async function (token) {
    try {
         this.tokens=this.tokens.filter((tokenObj)=>tokenObj.token!=token)
         await this.save()
         return
    }
    catch (err) {
        throw err
    }
}
userSchema.methods.verifyToken=function(token)
{
    try
    {
        return this.tokens.some((tokenObj) => {
            return tokenObj.token === token;
        }); 
    }
   catch(err)
   {
    throw new Error("Invalid token")
   }
  
}
const User=new mongoose.model("User",userSchema)

export default User