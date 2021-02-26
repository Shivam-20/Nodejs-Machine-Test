const exam = require("../models/exam");
const Candidates = require("../models/candidate");
const eH = require("../_helper/examHelper");

exports.getAverageScore = async (req, res, next) => {
  let examsData = await exam.find({}).exec();
  if (examsData.length < 1) {
    return res.status(404).json({
      status: "failed",
      message: "No score found",
      Data: null,
    });
  }
  let average = await eH.averageScore(examsData);
  return res.status(201).json({
    status: "success",
    message: "Average score",
    Data: average,
  });
};
exports.getHightestScoreCandidate = async (req, res, next) => {
  let examsData = await exam.find({}).exec();
  if (examsData.length < 1) {
    return res.status(404).json({
      status: "failed",
      message: "No score found",
      Data: null,
    });
  }
  let hSC = await eH.getHighestScore(examsData);
  let candidateDetails = await Candidates.findOne({
    _id: hSC.candidate,
  }).exec();
  let finalObject = {
    user: candidateDetails.name,
    email: candidateDetails.email,
    score: {
      first_round: hSC.first_round,
      second_round: hSC.second_round,
      third_round: hSC.third_round,
    },
  };
  return res.status(201).json({
    status: "success",
    message: "User with highest score",
    Data: finalObject,
  });
};

// if (candidateData.length < 1) {
//   return res.status(401).json({
//     message: "No candidate added",
//   });
// } else {
//   return res.status(201).json({
//     status: "success",
//     message: candidateData.length + " candidate found",
//     Data: candidateData,
//   });
// }
