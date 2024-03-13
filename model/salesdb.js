const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    productNames:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
      },

})

const Salesdb = mongoose.model('salesDB',schema)

module.exports=Salesdb;
