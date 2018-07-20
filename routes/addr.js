const express = require('express');
const router = express.Router();
const Method = require('../models/httpmethods');
const mongo = require('mongodb');
const config = require('../config/database');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Auth = require('../models/reglog');

router.get('/getting', (req, res, next) => {
    Method.find({}).then(data => {
        res.send(data);
    });
});

router.get('/geting/:id', (req, res, next) => {
    const _id = req.params.id;
    Method.findById({ _id }).then(data => {
        console.log(data)
        res.send(data);
    })
})


//Post for weather
router.post('/posting', (req, res, next) => {

    let newMethod = new Method({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        temp: req.body.temp,
        pressure: req.body.pressure,
        humidity: req.body.humidity
    });

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

//Post for Register
router.post('/postreg', (req, res, next) => {
    let newUser = Auth({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    Auth.create(newUser, (err, auth) => {
        if (err) {
            // res.send('Error in Registering')
            res.json({ success: false, msg: 'Failed' });

        }
        else {
            res.json({ success: true, msg: 'Success' });

        }
    });
});
//Post for Authenication to generate jwt 
router.post('/auth', (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    Auth.getAuthByEmail(email, (err, reg) => {
        if (err) {
            res.send('Error in Authenticating email');
        }
        if (!reg) {
            res.json({ success: false, msg: 'User Not Found' });
        }
        bcrypt.compare(password, reg.password, (err, isMatch) => {
            if (err) {
                res.send('Error in Authenticating password');
            }
            if (isMatch) {
                const token = jwt.sign(reg.toJSON(), config.secret, {
                    expiresIn: 648000
                });
                res.json({
                    success: true,
                    token: 'jwt ' + token,
                    reg: {
                        id: reg.id,
                        name: reg.name,
                        email: reg.email,
                        password: reg.password
                    }
                });
            } else {
                res.json({ success: false, msg: 'Wrong password' });
            }
        });

    });
});
//Get from jwt to normal
router.get('/full',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user});

});
//Patch
router.patch('/updating/:id', (req, res) => {
    const id = req.params.id;
    Method.findById(id, (error, method) => {
        if (error) {
            res.send('ERROR in updating');
        }
        else {
            method.name = req.body.name;
            method.description = req.body.description;
            method.temp = req.body.temp;
            method.pressure = req.body.pressure;
            method.humidity = req.body.humidity;
            method.save();
            console.log(method)
            res.send(method)


        }
    });
});

router.patch('update', (req, res) => {
    Method.updateMany()
})



router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    Method.findOneAndRemove(id).then(data => {
        res.send(data);

    });
});

module.exports = router;