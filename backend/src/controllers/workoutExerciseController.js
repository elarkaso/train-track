const workoutExerciseService = require("../services/workoutExerciseService");

async function assignExerciseToWorkout(req, res, next) {
  try {
    const dtoIn = {
      workoutId: req.params.workoutId,
      ...req.body
    };

    const dtoOut = await workoutExerciseService.assignExerciseToWorkout(dtoIn);
    res.status(201).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  assignExerciseToWorkout
};