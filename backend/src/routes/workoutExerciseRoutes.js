const express = require("express");
const { 
    
    assignExerciseToWorkout,
    updateWorkoutExercise,
    deleteWorkoutExercise

} = require("../controllers/workoutExerciseController");

const router = express.Router();

router.post("/workouts/:workoutId/exercises", assignExerciseToWorkout);
router.put("/workout-exercises/:id", updateWorkoutExercise);
router.delete("/workout-exercises/:id", deleteWorkoutExercise);

module.exports = router;