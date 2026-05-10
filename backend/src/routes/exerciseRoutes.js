const express = require("express");
const { 
    
    createExercise,
    getExercise,
    updateExercise,
    deleteExercise,
    listExercises

 } = require("../controllers/exerciseController");

const router = express.Router();

router.post("/", createExercise);
router.get("/:id", getExercise);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);
router.get("/", listExercises);

module.exports = router;