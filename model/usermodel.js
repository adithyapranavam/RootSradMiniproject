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
                default: 0
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
    },
    
    wishlist: 
    [{
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: product
    }
}],
address: [{
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    houseName: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
    },
    pin: {
        type: Number,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
      },
}]

})

const user = mongoose.model("user",userSchema);
module.exports = user;