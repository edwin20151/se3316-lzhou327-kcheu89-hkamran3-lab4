const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ListSchema = new Schema({
    modifiedDate: {
        type:Date,
         required:true
    },
    name:{
        type:Number,
        required : true
    },
    creator:{
        type:String,
        required:true
    },
    playtime:{
        type:String,
        required:true
    },
    tracks:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
}); 

module.exports = mongoose.model('list', ListSchema);