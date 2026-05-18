import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "../components/common/PageLayout";
import WorkoutOverviewPage from "../pages/WorkoutOverviewPage";
import CreateWorkoutPage from "../pages/CreateWorkoutPage";
import WorkoutDetailPage from "../pages/WorkoutDetailPage";
import EditWorkoutPage from "../pages/EditWorkoutPage";
import TrainingBalancePage from "../pages/TrainingBalancePage";
import NotFoundPage from "../pages/NotFoundPage";

function PageRouter() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
       
        <Route path="/" element={<Navigate to="/workouts" replace />} />
        <Route path="/workouts" element={<WorkoutOverviewPage />} />
        <Route path="/workouts/new" element={<CreateWorkoutPage />} />
        <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
        <Route path="/workouts/:id/edit" element={<EditWorkoutPage />} />

        <Route path="/analysis" element={<TrainingBalancePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default PageRouter;