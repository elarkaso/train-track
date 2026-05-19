const express = require("express");
const {   

    getWorkoutExercise,
    assignExerciseToWorkout,
    updateWorkoutExercise,
    deleteWorkoutExercise
    
} = require("../controllers/workoutExerciseController");

const router = express.Router();

router.get("/workout-exercises/:id", getWorkoutExercise);
router.post("/workouts/:workoutId/exercises", assignExerciseToWorkout);
router.put("/workout-exercises/:id", updateWorkoutExercise);
router.delete("/workout-exercises/:id", deleteWorkoutExercise);

module.exports = router;