const exerciseRepository = require("../repositories/exerciseRepository");

const { isValidMuscleGroup } = require("../utils/muscleGroups");

async function createExercise(dtoIn) {
  const uuAppErrorMap = {};

  if (!dtoIn.name || typeof dtoIn.name !== "string" || dtoIn.name.trim().length === 0) {
    const error = new Error("Exercise name is required.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  if (!dtoIn.primaryMuscleGroup || typeof dtoIn.primaryMuscleGroup !== "string") {
    const error = new Error("Primary muscle group is required.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  const normalizedMuscleGroup = dtoIn.primaryMuscleGroup.trim().toUpperCase();

  if (!isValidMuscleGroup(normalizedMuscleGroup)) {
    const error = new Error("The selected primary muscle group is not allowed.");
    error.statusCode = 400;
    error.code = "invalidPrimaryMuscleGroup";
    throw error;
  }

  const exerciseToCreate = {
    name: dtoIn.name.trim(),
    primaryMuscleGroup: normalizedMuscleGroup
  };

  const exercise = await exerciseRepository.createExercise(exerciseToCreate);

  return {
    exercise,
    uuAppErrorMap
  };
}

async function getExercise(dtoIn) {
  const uuAppErrorMap = {};

  const id = Number(dtoIn.id);

  if (!id || Number.isNaN(id)) {
    const error = new Error("Exercise id is not valid.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  const exercise = await exerciseRepository.getExerciseById(id);

  if (!exercise) {
    const error = new Error("Exercise with the given identifier was not found.");
    error.statusCode = 404;
    error.code = "exerciseNotFound";
    throw error;
  }

  return {
    exercise,
    uuAppErrorMap
  };
}

async function updateExercise(dtoIn) {
  const uuAppErrorMap = {};

  const id = Number(dtoIn.id);

  if (!id || Number.isNaN(id)) {
    const error = new Error("Exercise id is not valid.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  if (!dtoIn.name || typeof dtoIn.name !== "string" || dtoIn.name.trim().length === 0) {
    const error = new Error("Exercise name is required.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  if (!dtoIn.primaryMuscleGroup || typeof dtoIn.primaryMuscleGroup !== "string") {
    const error = new Error("Primary muscle group is required.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  const existingExercise = await exerciseRepository.getExerciseById(id);

  if (!existingExercise) {
    const error = new Error("Exercise with the given identifier was not found.");
    error.statusCode = 404;
    error.code = "exerciseNotFound";
    throw error;
  }

  const normalizedMuscleGroup = dtoIn.primaryMuscleGroup.trim().toUpperCase();

  if (!isValidMuscleGroup(normalizedMuscleGroup)) {
    const error = new Error("The selected primary muscle group is not allowed.");
    error.statusCode = 400;
    error.code = "invalidPrimaryMuscleGroup";
    throw error;
  }

  const exerciseToUpdate = {
    name: dtoIn.name.trim(),
    primaryMuscleGroup: normalizedMuscleGroup
  };

  const exercise = await exerciseRepository.updateExercise(id, exerciseToUpdate);

  return {
    exercise,
    uuAppErrorMap
  };
}

async function deleteExercise(dtoIn) {
  const uuAppErrorMap = {};

  const id = Number(dtoIn.id);

  if (!id || Number.isNaN(id)) {
    const error = new Error("Exercise id is not valid.");
    error.statusCode = 400;
    error.code = "invalidDtoIn";
    throw error;
  }

  const existingExercise = await exerciseRepository.getExerciseById(id);

  if (!existingExercise) {
    const error = new Error("Exercise with the given identifier was not found.");
    error.statusCode = 404;
    error.code = "exerciseNotFound";
    throw error;
  }

  await exerciseRepository.deleteExercise(id);

  return {
    id,
    deleted: true,
    uuAppErrorMap
  };
}

async function listExercises() {
  const itemList = await exerciseRepository.listExercises();

  return {
    itemList,
    uuAppErrorMap: {}
  };
}

module.exports = {
  createExercise,
  getExercise,
  updateExercise,
  deleteExercise,
  listExercises
};