const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:
        {
            type:String,
            unique:true,
            required:true
        },
        number:{
            type:Number,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
       
       isBlocked:
       {
        type:Boolean,
        default:false,
        require:true
       },
       isAdmin:{
        type:Boolean
       }
    }
)
const user = mongoose.model("user",userSchema);
module.exports = user;