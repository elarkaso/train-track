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
  listWorkouts
};

