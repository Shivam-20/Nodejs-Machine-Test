const Candidate = require("../models/candidate");
const Exam = require("../models/exam");

exports.getAllCandidate = (req, res, next) => {
  Candidate.find({})
    .exec()
    .then((candidateData) => {
      if (candidateData.length < 1) {
        return res.status(401).json({
          message: "No candidate added",
        });
      } else {
        return res.status(201).json({
          status: "success",
          message: candidateData.length + " candidate found",
          Data: candidateData,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};
exports.addCandidate = async (req, res, next) => {
  let candidateData = req.body;
  let selecteCandidate = await Candidate.findOne({
    email: candidateData.email,
  }).exec();

  if (!selecteCandidate) {
    const condidate = new Candidate(candidateData);
    condidate
      .save()
      .then((doc) => {
        res.status(201).json({
          status: "success",
          message: "condidate added successful",
          Data: doc,
        });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.status(401).json({
      status: "failed",
      message: "Email already registered",
    });
  }
};
exports.getCandidate = (req, res, next) => {
  let email = req.params.email;
  Candidate.findOne({
    email: email,
  })
    .exec()
    .then((candidateData) => {
      return res.status(201).json({
        status: "success",
        message: "candidateData found",
        Data: candidateData,
      });
    })
    .catch((err) => {
      next(err);
    });
};
exports.assignScore = async (req, res, next) => {
  let email = req.params.email;
  let reqData = req.body;
  let resp = await Candidate.find({ email });
  if (resp.length < 1) {
    return res.status(404).json({
      status: "failed",
      message: "No user with email",
      Data: null,
    });
  }
  // candidate: Schema.ObjectId,
  reqData.candidate = resp[0]._id;
  const exam = new Exam(reqData);
  exam
    .save()
    .then((doc) => {
      res.status(201).json({
        status: "success",
        message: "score added successful",
        Data: doc,
      });
    })
    .catch((err) => {
      next(err);
    });
};
