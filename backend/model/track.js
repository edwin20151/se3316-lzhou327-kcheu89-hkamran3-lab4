const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const trackSchema = new Schema({
    album_title:{
        type:String,
        required:true
    },
    artist_name:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
        required:true
    },
    track_title:{
        type:String,
        required:true
    },
    track_genres:{
        type:Array,
        required:true
    }

}); 

module.exports = mongoose.model('track', trackSchema);