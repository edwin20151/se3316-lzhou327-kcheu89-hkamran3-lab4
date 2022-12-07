const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PolicySchema = new Schema({
  document: {
    type: String,
    equired: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("policy", PolicySchema);
