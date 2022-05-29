const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const Course= new Schema({
    name:{type:String,maxLength:255,required:true,},
    description:{type:String,maxLength:600},
    image:{
         type: String,
    },
    slug:{type:String},
},{timestamps:true,});
module.exports = mongoose.model('Course',Course);