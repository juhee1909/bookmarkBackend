require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const userRouter = require('./routes/userRoutes.js');
app.use('/user',userRouter);

const bookmarkRouter = require('./routes/bookmarkRoutes.js');
app.use('/bookmark',bookmarkRouter);

switch(process.env.mode){
    case 'development':
        process.env.DATABASE = process.env.DevelopmentDatabase;
        process.env.PORT = process.env.DevelopmentPort;
        break;
    case 'local':
        process.env.DATABASE = process.env.LocalDatabase;
        process.env.PORT = process.env.LocalPort;
        break;
    case 'test':
        process.env.DATABASE = process.env.TestDataBase;
        process.env.PORT = process.env.TestPort;
        break;
    default:
        process.env.DATABASE = process.env.DevelopmentDatabase;
        process.env.PORT = process.env.DevelopmentPort;
        break;
}

if(process.env.mode != 'production'){
    console.log('DATABASE => ' + process.env.DATABASE);
    console.log('PORT => ' + process.env.PORT);
}
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true });
mongoose.set('debug',true);


app.listen(5000,function(){
    console.log('Server is running on 5000');
});

module.exports = app;