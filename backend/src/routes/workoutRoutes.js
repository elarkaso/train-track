const express = require("express");
const { 
    createWorkout,
    listWorkouts
} = require("../controllers/workoutController");

const router = express.Router();

router.post("/", createWorkout);
router.get("/", listWorkouts);

module.exports = router;