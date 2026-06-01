const express = require("express");
const { getTrainingBalanceAnalysis } = require("../controllers/analysisController");

const router = express.Router();

router.get("/training-balance", getTrainingBalanceAnalysis);

module.exports = router;