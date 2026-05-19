import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "../components/common/PageLayout";

// Import pages (Workout-related)
import WorkoutOverviewPage from "../pages/WorkoutOverviewPage";
import CreateWorkoutPage from "../pages/CreateWorkoutPage";
import WorkoutDetailPage from "../pages/WorkoutDetailPage";
import EditWorkoutPage from "../pages/EditWorkoutPage";

// Import pages (Exercise-related)
import CreateExercisePage from "../pages/CreateExercisePage";
import ExerciseOverviewPage from "../pages/ExerciseOverviewPage";

// Import pages (WorkoutExercise-related)
import AssignExerciseToWorkoutPage from "../pages/AssignExerciseToWorkoutPage";
import EditExercisePage from "../pages/EditExercisePage";
import EditWorkoutExercisePage from "../pages/EditWorkoutExercisePage";

// Import page (Analysis)
import TrainingBalancePage from "../pages/TrainingBalancePage";

// Page not found handler
import NotFoundPage from "../pages/NotFoundPage";

function PageRouter() {
  return (
    <Routes>
      <Route element={<PageLayout />}>

       // workout-related routes
        <Route path="/" element={<Navigate to="/workouts" replace />} />
        <Route path="/workouts" element={<WorkoutOverviewPage />} />
        <Route path="/workouts/new" element={<CreateWorkoutPage />} />
        <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
        <Route path="/workouts/:id/edit" element={<EditWorkoutPage />} />
        
        // exercise-related routes
        <Route path="/exercises/new" element={<CreateExercisePage />} />
        <Route path="/exercises/:id/edit" element={<EditExercisePage />} />
        <Route path="/exercises" element={<ExerciseOverviewPage />} />

        // workout exercise-related routes
        <Route path="/workouts/:id/assign-exercise" element={<AssignExerciseToWorkoutPage />} />
        <Route path="/workout-exercises/:id/edit" element={<EditWorkoutExercisePage />} />

        // analysis route
        <Route path="/analysis" element={<TrainingBalancePage />} />

        // page not found route
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default PageRouter;