const express = require('express');
const router = express.Router();
const Method = require('../models/httpmethods');
const mongo = require('mongodb');
const config = require('../config/database');

router.get('/getting', (req, res, next) => {
    Method.find({}).then(data => {
        res.send(data);
    });
});

router.get('/geting/:id',(req,res,next)=>{
    const _id=req.params.id;
    Method.findById({_id}).then(data=>{
     console.log(data)
        res.send(data);
    })
})


//Post
router.post('/posting', (req, res, next) => {

    let newMethod = new Method({
        id:req.body.id,
        name: req.body.name
    });
    console.log(req.body.name);
    console.log(newMethod);
    Method.create(newMethod, (err, method) => {
        if (err) {
            res.json({ success: false, msg: 'Failed' });
        }
        else {
            res.json({ success: true, msg: 'Success' });

        }
    })
});

//Patch
router.patch('/updating/:id', (req, res) => {
    const id = req.params.id;
    Method.findById(id, (err, method) => {
        if (err) {
            res.send('ERROR in updating');
        }
        else {
            method.name = req.body.name;
            // method.save();
            res.send(method)
            // res.send('SUCCESS in updating');

        }
    });
});


router.patch('/update/id',(req,res)=>{
    const _id=res.params._id;
    Method.findById(_id,(err,method)=>{
        if(err){
            console.log(Error);
        }
        else{

        }
    });
});

router.delete('/delete/:id',(req,res)=>{
    const id=req.params.id
    Method.findOneAndRemove(id).then(data=>{
        res.send(data);

    });
});

module.exports = router;