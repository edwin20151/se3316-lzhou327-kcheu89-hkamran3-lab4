const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  listName: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: new Date(),
  },
  userName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
  },
  isHidden: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("review", ReviewSchema);
