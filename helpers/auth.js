const __ = require('./response');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user.js');
class auth {
    async authenticate(req,res,next){
        try{
            let token = req.headers['authorization'];
            if(!token){
                __.sessionExpired(res);
            }
            jwt.verify(token,process.env.RandomString,function(err,decoded){
                if(err){
                    __.sessionExpired(res);     
                }
                req.user = decoded;
                next();
            })
        }catch(error){
            __.errorInternal(res,error);
        };
    }
}
auth = new auth();
module.exports = auth;