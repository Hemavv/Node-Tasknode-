const Auth=require('../models/reglog');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const config=require('../config/database');

module.exports= (passport)=>{
let opts={};

opts.jwtFromRequest=ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey=config.secret;

passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    Auth.getAuthById(jwt_payload._id,(err,user)=>{
        if(err){
            return done(err,false);
        }
        else if(user){
            return done (null,user);
        }
        else{
            return done (null,false);
        }
    })
}))

}