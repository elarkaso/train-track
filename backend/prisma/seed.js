const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const exercises = [
    { name: "Bench Press", primaryMuscleGroup: "CHEST" },
    { name: "Incline Bench Press", primaryMuscleGroup: "CHEST" },
    { name: "Pull-up", primaryMuscleGroup: "BACK" },
    { name: "Barbell Row", primaryMuscleGroup: "BACK" },
    { name: "Squat", primaryMuscleGroup: "LEGS" },
    { name: "Leg Press", primaryMuscleGroup: "LEGS" },
    { name: "Shoulder Press", primaryMuscleGroup: "SHOULDERS" },
    { name: "Lateral Raise", primaryMuscleGroup: "SHOULDERS" },
    { name: "Barbell Curl", primaryMuscleGroup: "ARMS" },
    { name: "Triceps Pushdown", primaryMuscleGroup: "ARMS" },
    { name: "Plank", primaryMuscleGroup: "CORE" },
    { name: "Hanging Leg Raise", primaryMuscleGroup: "CORE" }
  ];

  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { name: exercise.name },
      update: {
        primaryMuscleGroup: exercise.primaryMuscleGroup
      },
      create: exercise
    });
  }

  console.log("Exercise catalog seeded successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });