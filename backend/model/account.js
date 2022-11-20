const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccountSchema = new Schema({
    username: {
        type:String,
         required:true
    },
    password:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    account:{
        type:Boolean,
        require:true
    }
}); 

module.exports = mongoose.model('account', AccountSchema);