const exerciseService = require("../services/exerciseService");

async function listExercises(req, res, next) {
  try {
    const dtoOut = await exerciseService.listExercises();
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listExercises
};