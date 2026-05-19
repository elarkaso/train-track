const prisma = require("../lib/prisma");

async function createWorkoutExercise(workoutExerciseData) {
  return prisma.workoutExercise.create({
    data: workoutExerciseData
  });
}

async function getWorkoutExerciseById(id) {
  return prisma.workoutExercise.findUnique({
    where: { id },
    include: {
      exercise: true,
      workout: true
    }
  });
}

async function updateWorkoutExercise(id, workoutExerciseData) {
  return prisma.workoutExercise.update({
    where: { id },
    data: workoutExerciseData
  });
}

async function deleteWorkoutExercise(id) {
  return prisma.workoutExercise.delete({
    where: { id }
  });
}

module.exports = {
  createWorkoutExercise,
  getWorkoutExerciseById,
  updateWorkoutExercise,
  deleteWorkoutExercise
};