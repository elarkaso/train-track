const workoutService = require("../services/workoutService");

async function createWorkout(req, res, next) {
  try {
    const dtoIn = { 
      ...req.body 
    };

    const dtoOut = await workoutService.createWorkout(dtoIn);
    res.status(201).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

async function getWorkout(req, res, next) {
  try {
    const dtoIn = {
      id: req.params.id
    };

    const dtoOut = await workoutService.getWorkout(dtoIn);
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
    const dtoIn = {
      id: req.params.id
    };

    const dtoOut = await workoutService.deleteWorkout(dtoIn);
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

async function listWorkouts(req, res, next) {
  try {
    const { from, to, ...rest } = req.query;
    const dtoIn = {
      ...rest,
      from: from ? String(from) : undefined,
      to: to ? String(to) : undefined
    };

    const dtoOut = await workoutService.listWorkouts(dtoIn);
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