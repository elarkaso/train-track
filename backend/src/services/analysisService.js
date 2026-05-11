const analysisRepository = require("../repositories/analysisRepository");
const { ALLOWED_MUSCLE_GROUPS } = require("../utils/muscleGroups");

function getCurrentMonthDateRange() {
  const now = new Date();

  const from = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const to = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0));

  return { from, to };
}

async function getTrainingBalanceAnalysis(dtoIn) {
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

  if (!from || !to) {
    const currentMonthRange = getCurrentMonthDateRange();
    from = from || currentMonthRange.from;
    to = to || currentMonthRange.to;
  }

  if (from > to) {
    const error = new Error("Selected date range is not valid.");
    error.statusCode = 400;
    error.code = "invalidDateRange";
    throw error;
  }

  const workoutExercises = await analysisRepository.getWorkoutExercisesInDateRange(from, to);

  const summaryMap = {};

  for (const muscleGroup of ALLOWED_MUSCLE_GROUPS) {
    summaryMap[muscleGroup] = 0;
  }

  for (const item of workoutExercises) {
    const muscleGroup = item.exercise.primaryMuscleGroup;
    summaryMap[muscleGroup] += item.sets;
  }

  const muscleGroupSummary = Object.entries(summaryMap).map(([primaryMuscleGroup, totalSets]) => ({
    primaryMuscleGroup,
    totalSets
  }));

  const sortedSummary = [...muscleGroupSummary].sort((a, b) => b.totalSets - a.totalSets);

  // TODO: Replace leastTrainedMuscleGroup with leastTrainedMuscleGroups.
  // When multiple muscle groups have the same minimum totalSets, 
  // return all of them instead of selecting a single random item.
  const mostTrainedMuscleGroup = sortedSummary[0] || null;
  const leastTrainedMuscleGroup = sortedSummary[sortedSummary.length - 1] || null;

  if (workoutExercises.length === 0) {
    uuAppErrorMap.noDataForSelectedPeriod = {
      type: "warning",
      message: "No workout data were found for the selected period."
    };
  }

  return {
    period: {
      from: from.toISOString().split("T")[0],
      to: to.toISOString().split("T")[0]
    },
    muscleGroupSummary,
    mostTrainedMuscleGroup,
    leastTrainedMuscleGroup,
    uuAppErrorMap
  };
}

module.exports = {
  getTrainingBalanceAnalysis
};