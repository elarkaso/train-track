const prisma = require("../lib/prisma");

async function createWorkoutExercise(workoutExerciseData) {
  return prisma.workoutExercise.create({
    data: workoutExerciseData
  });
}

module.exports = {
  createWorkoutExercise
};