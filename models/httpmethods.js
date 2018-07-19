const mongoose=require('mongoose');
const config=require('../config/database')
const MethodSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    }
});
const Method=module.exports=mongoose.model("Method",MethodSchema);
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}