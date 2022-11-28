const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const legalSchema = new Schema({
  privacyPolicy: {
    type: String,
    required: true,
  },
  securityPolicy: {
    type: String,
    required: true,
  },
  takeDownPolicy: {
    type: String,
    required: true,
  },
  DMCA: {
    type: String,
    required: true,
  },
  AUP: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("legal", legalSchema);
