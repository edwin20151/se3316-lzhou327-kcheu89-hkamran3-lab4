const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ListSchema = new Schema({
    modifiedDate: {
        type:Date,
         required:true
    },
    name:{
        type: String,
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
    tracksNum:{
        type:Number,
        required:true
    },
    tracks:{
        type:Array,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
}); 

module.exports = mongoose.model('list', ListSchema);