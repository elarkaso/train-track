const express = require("express");
const { listExercises } = require("../controllers/exerciseController");

const router = express.Router();

router.get("/", listExercises);

module.exports = router;