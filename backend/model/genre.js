const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GenreSchema = new Schema({
    genre_id: {
        type:Number,
         required:true
    },
    parent:{
        type:Number,
        required : true
    },
    title:{
        type:String,
        required:true
    }
}); 

module.exports = mongoose.model('genre', GenreSchema);