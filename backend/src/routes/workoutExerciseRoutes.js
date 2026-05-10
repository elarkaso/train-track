const express = require("express");
const { assignExerciseToWorkout } = require("../controllers/workoutExerciseController");

const router = express.Router();

router.post("/workouts/:workoutId/exercises", assignExerciseToWorkout);

module.exports = router;