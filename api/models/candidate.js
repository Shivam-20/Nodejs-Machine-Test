const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const candidateSchema = new Schema({
  name: String,
  email: String,
  examId: Schema.ObjectId,
});

module.exports = mongoose.model("candidates", candidateSchema);
