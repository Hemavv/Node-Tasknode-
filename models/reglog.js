const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt=require('bcryptjs');
const passport=require('passport');

const AuthSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const Auth = module.exports = mongoose.model('Auth', AuthSchema);

module.exports.getAuthById = (id, callback) => {
    Auth.findById(id, callback);
}
module.exports.getAuthByEmail = (email, callback) => {
    const query = { email: email };
    Auth.findOne(query, callback);
}

module.exports.create = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log('Error in bcrypt');
            }
            else {
                newUser.password = hash;
                newUser.save(callback);
            }
        });
    });
}
module.exports.campare=(data,hash,callback)=>{
bcrypt.compare(data,hash,(err,isMatch)=>{
    if(err){
        console.log('Error in comparing password');
    }
    else{
        callback(null,isMatch);
    }
});
}