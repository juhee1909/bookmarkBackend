const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


var userSchema = new mongoose.Schema({
    name : { 
        type : String,
        default : ''
    },
    email : {
        type    : String,
        unique  : true,
        required : true
    },
    password : {
        type        : String,
        required    : true
    }
},{
    timestamps :{createdAt : 'created_at',updatedAt : 'updated_at'}
});
userSchema.methods.generateHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
  
userSchema.methods.verifyPassword = function(password){
    let user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('users',userSchema);