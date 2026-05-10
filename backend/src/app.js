const express = require("express");
const cors = require("cors");

// Routes
const healthRoutes = require("./routes/healthRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const workoutExerciseRoutes = require("./routes/workoutExerciseRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api", workoutExerciseRoutes);
// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route not found"
    }
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);

  if (error.code === "P2002") {
    const target = error.meta?.target || [];

    if (target.includes("date")) {
      return res.status(400).json({
        error: {
          code: "workoutAlreadyExistsForDate",
          message: "Workout for the selected date already exists."
        }
      });
    }

    if (target.includes("name")) {
      return res.status(400).json({
        error: {
          code: "exerciseNameAlreadyExists",
          message: "Exercise with the selected name already exists."
        }
      });
    }

    return res.status(400).json({
      error: {
        code: "uniqueConstraintViolation",
        message: "Unique constraint violation."
      }
    });
  }

  if (error.code === "P2003") {
    return res.status(400).json({
      error: {
        code: "entityInUse",
        message: "The entity cannot be deleted because it is referenced by existing records."
      }
    });
  }

  res.status(error.statusCode || 500).json({
    error: {
      code: error.code || "internalServerError",
      message: error.message || "Internal server error"
    }
  });
});

module.exports = app;