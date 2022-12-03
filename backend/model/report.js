const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const legalSchema = new Schema({
    name: {
        type:String,
         required:true
    },
    typeofrequest: {
        type:String,
         required:true
    },
    userEmail: {
        type: String,
      },
    request_date:{
        type:Date,
        required:true
    },
    review :{
        type:String,
        required:true
    }
}); 

module.exports = mongoose.model('report', legalSchema);