const workoutService = require("../services/workoutService");

async function createWorkout(req, res, next) {
  try {
    const dtoOut = await workoutService.createWorkout(req.body);
    res.status(201).json(dtoOut);
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
  listWorkouts
};