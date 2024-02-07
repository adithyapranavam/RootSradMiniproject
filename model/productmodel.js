const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    
    
    productID: {
        type: String,
        
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    orginalprice:{
        type: Number,
        require:true,
    },
    discription: {
        type: String, 
        required: true
    },
    image: [{ 
        type: String,
        required: true
    }],
    category: {
        type: String,
        required: true,
        
    },
    productOffer:{
        type:Number,
        required:true,
    },
    quantity: {
        type: Number,
        
    },
    availability: {
        type: Boolean,
        require: true,
        default: true,
    }
})
const productCollection = new mongoose.model("productdata", productSchema);


module.exports = productCollection;
