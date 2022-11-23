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
    track_title:{
        type:String,
        required:true
    },
    track_genres:{
        type:Array,
        required:true
    },
    track_duration:{
        type:String,
        required:true
    },
    track_date_created:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('track', trackSchema);