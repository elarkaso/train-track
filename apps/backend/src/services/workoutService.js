const workoutRepository = require("../repositories/workoutRepository");

async function createWorkout(dtoIn) {
  const uuAppErrorMap = {};

  if (!dtoIn.name || typeof dtoIn.name !== "string" || dtoIn.name.trim().length === 0) {
    const error = new Error("Workout name is required.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  if (!dtoIn.date || typeof dtoIn.date !== "string") {
    const error = new Error("Workout date is required.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  const parsedDate = new Date(dtoIn.date);

  if (Number.isNaN(parsedDate.getTime())) {
    const error = new Error("Workout date is not valid.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  const workoutToCreate = {
    name: dtoIn.name.trim(),
    date: parsedDate
  };

  const workout = await workoutRepository.createWorkout(workoutToCreate);

  return {
    workout,
    uuAppErrorMap
  };
}

async function getWorkout(dtoIn) {
  const uuAppErrorMap = {};

  const id = Number(dtoIn.id);

  if (Number.isNaN(id)) {
    const error = new Error("Parameter 'id' is not a valid number.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  const workout = await workoutRepository.getWorkoutById(id);

  if (!workout) {
    const error = new Error("Workout with the given identifier was not found.");
    error.statusCode = 404;
    error.code = "workoutNotFound";
    throw error;
  }

  return {
    workout,
    uuAppErrorMap
  };
}

async function updateWorkout(dtoIn) {
  const uuAppErrorMap = {};

  const id = Number(dtoIn.id);

  if (Number.isNaN(id)) {
    const error = new Error("Parameter 'id' is not a valid number.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  if (!dtoIn.name || typeof dtoIn.name !== "string" || dtoIn.name.trim().length === 0) {
    const error = new Error("Workout name is required.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  if (!dtoIn.date || typeof dtoIn.date !== "string") {
    const error = new Error("Workout date is required.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  const parsedDate = new Date(dtoIn.date);

  if (Number.isNaN(parsedDate.getTime())) {
    const error = new Error("Workout date is not valid.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  const existingWorkout = await workoutRepository.getWorkoutById(id);

  if (!existingWorkout) {
    const error = new Error("Workout with the given identifier was not found.");
    error.statusCode = 404;
    error.code = "workoutNotFound";
    throw error;
  }

  const conflictingWorkout = await workoutRepository.getWorkoutByDateExcludingId(parsedDate, id);

  if (conflictingWorkout) {
    const error = new Error("Workout for the selected date already exists.");
    error.statusCode = 400;
    error.code = "workoutAlreadyExistsForDate";
    throw error;
  }

  const workoutToUpdate = {
    name: dtoIn.name.trim(),
    date: parsedDate
  };

  const workout = await workoutRepository.updateWorkout(id, workoutToUpdate);

  return {
    workout,
    uuAppErrorMap
  };
}

async function deleteWorkout(dtoIn) {
  const uuAppErrorMap = {};

  const id = Number(dtoIn.id);

  if (!id || Number.isNaN(id)) {
    const error = new Error("Workout id is not valid.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  const existingWorkout = await workoutRepository.getWorkoutById(id);

  if (!existingWorkout) {
    const error = new Error("Workout with the given identifier was not found.");
    error.statusCode = 404;
    error.code = "workoutNotFound";
    throw error;
  }

  const containsAssignedExercises = await workoutRepository.hasWorkoutExercises(id);

  if (containsAssignedExercises) {
    const error = new Error("Workout cannot be deleted because it contains assigned exercises.");
    error.statusCode = 400;
    error.code = "workoutContainsAssignedExercises";
    throw error;
  }

  await workoutRepository.deleteWorkout(id);

  return {
    id,
    deleted: true,
    uuAppErrorMap
  };
}

async function listWorkouts(dtoIn) {
  const uuAppErrorMap = {};

  let from;
  let to;

  if (dtoIn.from) {
    from = new Date(dtoIn.from);

    if (Number.isNaN(from.getTime())) {
      const error = new Error("Parameter 'from' is not a valid date.");
      error.statusCode = 400;
      error.code = "invalidDtoIn";
      throw error;
    }
  }

  if (dtoIn.to) {
    to = new Date(dtoIn.to);

    if (Number.isNaN(to.getTime())) {
      const error = new Error("Parameter 'to' is not a valid date.");
      error.statusCode = 400;
      error.code = "invalidDtoIn";
      throw error;
    }
  }

  if (from && to && from > to) {
    const error = new Error("Selected date range is not valid.");
    error.statusCode = 400;
    error.code = "invalidDateRange";
    throw error;
  }

  const itemList = await workoutRepository.listWorkouts({ from, to });

  return {
    itemList,
    uuAppErrorMap
  };
}

module.exports = {
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  listWorkouts
};

