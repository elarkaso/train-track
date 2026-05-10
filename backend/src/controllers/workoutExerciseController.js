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

async function updateWorkoutExercise(req, res, next) {
  try {
    const dtoIn = {
      id: req.params.id,
      ...req.body
    };

    const dtoOut = await workoutExerciseService.updateWorkoutExercise(dtoIn);
    res.status(200).json(dtoOut);
  } catch (error) {
    next(error);
  }
}

async function deleteWorkoutExercise(req, res, next) {
    try {
        const dtoIn = {
            id: req.params.id
        };

        const dtoOut = await workoutExerciseService.deleteWorkoutExercise(dtoIn);
        res.status(200).json(dtoOut);
    } catch (error) {
        next(error);
    }
}

module.exports = {
  assignExerciseToWorkout,
  updateWorkoutExercise,
  deleteWorkoutExercise
};