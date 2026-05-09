const express = require("express");
const cors = require("cors");

// Routes
const healthRoutes = require("./routes/healthRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

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

  // handle "P2002" error from Prisma
  if (error.code === "P2002") {
    return res.status(409).json({
      error: {
        code: "workoutAlreadyExistsForDate",
        message: "Workout for the selected date already exists."
      }
    });
  }

  // handle 400 errors from our services
   if (error.statusCode === 400) {
    return res.status(400).json({
      error: {
        code: error.code || "BadRequest",
        message: error.message || "Bad request"
      }
    });
  }

  // default to 500 for unhandled errors
  res.status(error.statusCode || 500).json({
    error: {
      code: error.code || "InternalServerError",
      message: error.message || "An unexpected error occurred"
    }
  });
});

module.exports = app;