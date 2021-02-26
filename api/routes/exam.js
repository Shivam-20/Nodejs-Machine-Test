const express = require("express");
const router = express.Router();
const examController = require("../controller/exam");

router.get("/averagescore", examController.getAverageScore);
router.get("/highestscore", examController.getHightestScoreCandidate);


module.exports = router;
