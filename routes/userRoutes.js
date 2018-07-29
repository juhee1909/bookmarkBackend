const express = require('express');
const userRouter = express.Router();
const __ = require('../helpers/response.js');

const userController = require('../controllers/userController.js');
const auth = require('../helpers/auth.js');
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
userRouter.get('/verifyToken', auth.authenticate, (req, res) => {
    return __.message(res, 200, "Token Valid");
});
module.exports = userRouter;