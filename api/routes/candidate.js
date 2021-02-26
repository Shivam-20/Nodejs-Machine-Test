const express = require("express");
const router = express.Router();
const candidateController = require("../controller/candidate");

router.get("/", candidateController.getAllCandidate);
router.post("/", candidateController.addCandidate);
router.get("/:email", candidateController.getCandidate);
router.put("/assignScore/:email", candidateController.assignScore);

module.exports = router;
