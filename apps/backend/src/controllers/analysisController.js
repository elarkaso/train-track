const analysisService = require("../services/analysisService");

async function getTrainingBalanceAnalysis(req, res, next) {
  try {
    const dtoOut = await analysisService.getTrainingBalanceAnalysis(req.query);
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTrainingBalanceAnalysis
};