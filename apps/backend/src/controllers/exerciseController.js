const exerciseService = require("../services/exerciseService");

async function createExercise(req, res, next) {
  try {
    const dtoOut = await exerciseService.createExercise(req.body);
    res.status(201).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

async function getExercise(req, res, next) {
  try {
    const dtoOut = await exerciseService.getExercise(req.params);
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

async function updateExercise(req, res, next) {
  try {
    const dtoIn = {
      id: req.params.id,
      ...req.body
    };

    const dtoOut = await exerciseService.updateExercise(dtoIn);
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

async function deleteExercise(req, res, next) {
  try {
    const dtoOut = await exerciseService.deleteExercise(req.params);
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

async function listExercises(req, res, next) {
  try {
    const dtoOut = await exerciseService.listExercises();
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createExercise,
  getExercise,
  updateExercise,
  deleteExercise,
  listExercises
};