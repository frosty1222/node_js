const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const Cart= new Schema({
    name:{type:String,maxLength:255},
    description:{type:String,maxLength:600},
    image:{
         type: String,
    },
    slug:{type:String},
    price:{type:String},
    quantity:{type:Number},
},{timestamps:true,});
module.exports = mongoose.model('Cart',Cart);