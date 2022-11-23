const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AlbumSchema = new Schema({
    album_id: {
        type:Number,
         required:true
    },
    album_comments:{
        type:Number,
        required : true
    },
    album_date_created:{
        type:Date,
        required:true
    },
    album_favorites :{
        type:String,
        required:true
    }
}); 

module.exports = mongoose.model('album', AlbumSchema);