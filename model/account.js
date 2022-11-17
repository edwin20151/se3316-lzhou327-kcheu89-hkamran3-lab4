const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccountSchema = new Schema({
    username: {
        type:String,
         required:true
    },
    passsword:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
}); 

module.exports = mongoose.model('account', AccountSchema);