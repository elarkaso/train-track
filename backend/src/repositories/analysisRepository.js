const prisma = require("../lib/prisma");

async function getWorkoutExercisesInDateRange(from, to) {
  return prisma.workoutExercise.findMany({
    where: {
      workout: {
        date: {
          gte: from,
          lte: to
        }
      }
    },
    include: {
      exercise: true,
      workout: true
    }
  });
}

module.exports = {
  getWorkoutExercisesInDateRange
};