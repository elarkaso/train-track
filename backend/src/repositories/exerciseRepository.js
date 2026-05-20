const prisma = require("../lib/prisma");

async function createExercise(exerciseData) {
  return prisma.exercise.create({
    data: exerciseData
  });
}

async function getExerciseById(id) {
  return prisma.exercise.findUnique({
    where: { id }
  });
}

async function isExerciseAssignedToWorkout(exerciseId) {
  const count = await prisma.workoutExercise.count({
    where: { exerciseId }
  });
  return count > 0;
}

async function updateExercise(id, exerciseData) {
  return prisma.exercise.update({
    where: { id },
    data: exerciseData
  });
}

async function deleteExercise(id) {
  return prisma.exercise.delete({
    where: { id }
  });
}

async function listExercises() {
  return prisma.exercise.findMany({
    orderBy: { name: "asc" }
  });
}


module.exports = {
  createExercise,
  getExerciseById,
  updateExercise,
  deleteExercise,
  listExercises,
  isExerciseAssignedToWorkout
};