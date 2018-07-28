const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'users'
    },
    url : {
        type : String, 
        required : true 
    },
    title : {
        type : String, 
        required : true 
    },
    tags  : []
},{
    timestamps : { createdAt : 'created_at',updatedAt : 'updated_at' }
});

module.exports = mongoose.model('bookmarks',bookmarkSchema);