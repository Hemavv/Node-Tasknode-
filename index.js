const express=require('express');
const bp=require('body-parser');
const mongoose=require('mongoose');
const config=require('./config/database');
const path=require('path');

//Set instance for express
const app=express();
app.use(bp.json());

mongoose.connect(config.database,{useNewUrlParser:true});
mongoose.connection.on('connected',()=>{
    console.log('Connected to Database')
});
mongoose.connection.on('error',()=>{
console.log('Error in connection');
});

const addr=require('./routes/addr');
app.use('/addr',addr);

app.get('/',(req,res)=>{
    res.send('Get Used');
    console.log('Get is used');
});

//Listening to the port
app.listen(1234,()=>{
console.log('Listening to port 1234');
});
