const jwt = require('jsonwebtoken');
const userModel = require('../models/user.js');
const __ = require('../helpers/response.js');

class User{
    async login(req,res){
        try{
            let user = await userModel.findOne({email : (req.body.email).toLowerCase()});
            if(!user){
                return __.notFound(res,'No user exists with this email');
            }
            let password = user.verifyPassword(req.body.password);
            if(!password){
                return __.notAuthorized(res,'Password is Wrong');
            }
            let token = jwt.sign({_id : user._id},process.env.RandomString);
            return __.success(res,token,'Succesfully Logged In');
        }catch(error){
            __.errorInternal(res,error);
        }
    }
    async signUp(req,res){
        try{
            let user = await userModel.findOne({email : (req.body.email).toLowerCase()}).lean();
            if(user){
                return __.notAuthorized(res,'Email is already taken. Please try with some other email');
            }
            if(!user){
                let temp = {
                    name : req.body.name,
                    email : req.body.email
                }
                let userdata = new userModel(temp);
                userdata.password = await userdata.generateHash(req.body.password);
                let usernew = await userdata.save();
                let token = jwt.sign({_id : usernew._id},process.env.RandomString);
                return __.success(res,token,'Successfully signed up');
            }
        }catch(error){
            __.errorInternal(res,error);            
        }
    }
}

User = new User();
module.exports = User;