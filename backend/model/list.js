const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  modifiedDate: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  playtime: {
    type: String,
    required: true,
  },
  tracksNum: {
    type: Number,
    required: true,
  },
  tracks: {
    type: Array,
    required: true,
  },
  rating: {
    type: Number,
  },
  userEmail: {
    type: String,
  },
  Public: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
  },
  reviews: {
    type: Array,
  },
  description:{
    type : String
  }
});

module.exports = mongoose.model("list", ListSchema);
