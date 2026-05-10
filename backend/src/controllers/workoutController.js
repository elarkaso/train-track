const workoutService = require("../services/workoutService");

async function createWorkout(req, res, next) {
  try {
    const dtoOut = await workoutService.createWorkout(req.body);
    res.status(201).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

async function getWorkout(req, res, next) {
  try {
    const dtoOut = await workoutService.getWorkout(req.params);
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

async function updateWorkout(req, res, next) {
  try {
    const dtoIn = {
      id: req.params.id,
      ...req.body
    };

    const dtoOut = await workoutService.updateWorkout(dtoIn);
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

async function deleteWorkout(req, res, next) {
  try {
    const dtoOut = await workoutService.deleteWorkout(req.params);
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

async function listWorkouts(req, res, next) {
  try {
    const dtoOut = await workoutService.listWorkouts(req.query);
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  listWorkouts
};