const prisma = require("../lib/prisma");

async function createWorkout(workoutData) {
  return prisma.workout.create({
    data: workoutData
  });
}

async function getWorkoutByDate(date) {
  return prisma.workout.findUnique({
    where: { date }
  });
}

async function listWorkouts(filter = {}) {
  const where = {};

  if (filter.from || filter.to) {
    where.date = {};
  }

  if (filter.from) {
    where.date.gte = filter.from;
  }

  if (filter.to) {
    where.date.lte = filter.to;
  }

  return prisma.workout.findMany({
    where,
    orderBy: { date: "asc" }
  });
}

module.exports = {
  createWorkout,
  getWorkoutByDate,
  listWorkouts
};