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

async function getWorkoutByDateExcludingId(date, excludeId) {
  return prisma.workout.findFirst({
    where: {
      date,
      id: { not: excludeId }
    }
  });
}

async function getWorkoutById(id) {
  return prisma.workout.findUnique({
    where: { id }
  });
}

async function hasWorkoutExercises(workoutId) {
  const count = await prisma.workoutExercise.count({
    where: { workoutId }
  });

  return count > 0;
}

async function updateWorkout(id, workoutData) {
  return prisma.workout.update({
    where: { id },
    data: workoutData
  });
}

async function deleteWorkout(id) {
  return prisma.workout.delete({
    where: { id }
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
  getWorkoutByDateExcludingId,
  getWorkoutById,
  hasWorkoutExercises,
  updateWorkout,
  deleteWorkout,
  listWorkouts
};