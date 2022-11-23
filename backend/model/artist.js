const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const artistSchema = new Schema({
    artist_id: {
        type:Number,
         required:true
    },
    artist_active_year_begin:{
        type:Number,
        required : true
    },
    artist_associated_labels:{
        type:String,
        required:true
    },
    artist_comments:{
        type:Number,
        required : true
    },
    artist_contact:{
        type:String,
        required:true
    },
    artist_date_created:{
        type:Date,
        required:true
    },
    artist_favorites:{
        type:Number,
        required:true
    }

}); 

module.exports = mongoose.model('artist', artistSchema);