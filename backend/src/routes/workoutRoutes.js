const express = require("express");
const {

    createWorkout,
    getWorkout,
    updateWorkout,
    deleteWorkout,
    listWorkouts

} = require("../controllers/workoutController");

const router = express.Router();

router.post("/", createWorkout);
router.get("/:id", getWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);
router.get("/", listWorkouts);

module.exports = router;