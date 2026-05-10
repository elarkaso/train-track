const workoutRepository = require("../repositories/workoutRepository");
const exerciseRepository = require("../repositories/exerciseRepository");
const workoutExerciseRepository = require("../repositories/workoutExerciseRepository");

async function assignExerciseToWorkout(dtoIn) {
  const uuAppErrorMap = {};

  const workoutId = Number(dtoIn.workoutId);
  const exerciseId = Number(dtoIn.exerciseId);
  const sets = Number(dtoIn.sets);
  const repetitions = Number(dtoIn.repetitions);
  const usedWeight = Number(dtoIn.usedWeight);

  if (!workoutId || Number.isNaN(workoutId)) {
    const error = new Error("Workout id is not valid.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  if (!exerciseId || Number.isNaN(exerciseId)) {
    const error = new Error("Exercise id is not valid.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  if (!Number.isInteger(sets) || sets <= 0) {
    const error = new Error("Sets must be a positive integer.");
    error.statusCode = 400;
    error.code = "invalidWorkoutExerciseValues";
    throw error;
  }

  if (!Number.isInteger(repetitions) || repetitions <= 0) {
    const error = new Error("Repetitions must be a positive integer.");
    error.statusCode = 400;
    error.code = "invalidWorkoutExerciseValues";
    throw error;
  }

  if (Number.isNaN(usedWeight) || usedWeight < 0) {
    const error = new Error("Used weight must be greater than or equal to 0.");
    error.statusCode = 400;
    error.code = "invalidWorkoutExerciseValues";
    throw error;
  }

  const workout = await workoutRepository.getWorkoutById(workoutId);

  if (!workout) {
    const error = new Error("Workout with the given identifier was not found.");
    error.statusCode = 404;
    error.code = "workoutNotFound";
    throw error;
  }

  const exercise = await exerciseRepository.getExerciseById(exerciseId);

  if (!exercise) {
    const error = new Error("Exercise with the given identifier was not found.");
    error.statusCode = 404;
    error.code = "exerciseNotFound";
    throw error;
  }

  const workoutExerciseToCreate = {
    workoutId,
    exerciseId,
    sets,
    repetitions,
    usedWeight
  };

  const workoutExercise = await workoutExerciseRepository.createWorkoutExercise(
    workoutExerciseToCreate
  );

  return {
    workoutExercise,
    uuAppErrorMap
  };
}

module.exports = {
  assignExerciseToWorkout
};