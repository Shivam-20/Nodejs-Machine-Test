const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const examSchema = new Schema({
  first_round: Number,
  second_round: Number,
  third_round: Number,
  candidate: Schema.ObjectId,
});

module.exports = mongoose.model("exams", examSchema);
