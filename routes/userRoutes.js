const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController.js');
const validator = require('../helpers/validator.js');


userRouter.post('/login',(req,res,next)=>{
    validator.validate(req,res,next,['email','password'])
},function(req,res){
    userController.login(req,res);
});

userRouter.post('/signup',(req,res,next)=>{
    validator.validate(req,res,next,['email','password','name'])
},function(req,res){
    userController.signUp(req,res);
});

module.exports = userRouter;