const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const legalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  typeofrequest: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("report", legalSchema);
