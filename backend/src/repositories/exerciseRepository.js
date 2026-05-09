const prisma = require("../lib/prisma");

async function listExercises() {
  return prisma.exercise.findMany({
    orderBy: { name: "asc" }
  });
}

module.exports = {
  listExercises
};