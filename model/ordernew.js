const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    userId:{
        type:mongoose.Types.ObjectId,
        ref:'Userdb',
        required:true
    },
    payment:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    phone1:{
        type:Number,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
        
    },
    city:{
        type:String,
        required:true
    },
    houseName:{
        type:String,
        required:true 
    },
    country:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
      },
      products: {
        item: [{
          productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Productdb'
            // required:true
          },
          qty: {
            type: Number
            // required:true
          },
          price: {
            type: Number
          }
        }],
        totalPrice: {
          type: Number,
          default: 0
        }
      },
    
      status: {
        type: String,
        
      },
      reason: {
        type: String,
        
      }
      , 
      productReturned: [{
        type: Number
      }]
    

})

const Ordersdb = mongoose.model('ordersDB',schema)

module.exports=Ordersdb;
