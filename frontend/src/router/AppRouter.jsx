import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/common/AppLayout";
import WorkoutOverviewPage from "../pages/WorkoutOverviewPage";
import CreateWorkoutPage from "../pages/CreateWorkoutPage";
import WorkoutDetailPage from "../pages/WorkoutDetailPage";
import TrainingBalancePage from "../pages/TrainingBalancePage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/workouts" replace />} />
        <Route path="/workouts" element={<WorkoutOverviewPage />} />
        <Route path="/workouts/new" element={<CreateWorkoutPage />} />
        <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
        <Route path="/analysis" element={<TrainingBalancePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;