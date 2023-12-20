const mongoose = require('mongoose')
const product = require('../model/productmodel')

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
       },
       cart: {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: product
            },
            name: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1
            }, 
            realPrice: {
                type: Number,
            },
            price: {
                type: Number,
            },
            offer: {
                type: Number,
            }
        }]
    },
    grantTotal: {
        type: Number,
    },
    total: {
        type: Number,
    }

    }
)
const user = mongoose.model("user",userSchema);
module.exports = user;