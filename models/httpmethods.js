const mongoose=require('mongoose');
const config=require('../config/database');
const passport=require('passport');
const MethodSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    temp:{
        type:String,
        required:true
    },
    pressure:{
        type:String,
        required:true
    },
    humidity:{
        type:String,
        required:true
    },
});
const Method=module.exports=mongoose.model("Method",MethodSchema);
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}