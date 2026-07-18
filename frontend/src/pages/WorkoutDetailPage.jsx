import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getWorkoutById } from "../api/workoutApi";
import { deleteWorkoutExercise } from "../api/workoutExerciseApi";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";
import EmptyState from "../components/common/EmptyState";

function WorkoutDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleDeleteAssignment(assignmentId) {
    const confirmed = window.confirm("Are you sure you want to delete this exercise assignment?"); 

    if (!confirmed) {
      return;
    }

    try {
      await deleteWorkoutExercise(assignmentId);

      setWorkout((prevWorkout) => ({
        ...prevWorkout,
        workoutExercises: prevWorkout.workoutExercises.filter(
          (item) => item.id !== assignmentId
        ),
      }));
    } catch (err) {
      console.error("Failed to delete exercise assignment:", err);
      window.alert("Failed to delete exercise assignment. Please try again.");
    }
  }

  useEffect(() => {
    async function loadWorkout() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getWorkoutById(id);
        setWorkout(data.workout);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  if (isLoading) {
    return <LoadingMessage message="Loading workout detail..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!workout) {
    return <ErrorMessage message="Workout not found." />;
  }

  return (
    <section className="page-layout">
      <header className="page-header">
        <p className="eyebrow">Workout</p>
        <h2>Workout Detail</h2>
        <p className="page-subtitle">Inspect the session setup, assigned exercises, and edit the workout in context.</p>
      </header>

      <section className="detail-card">
        <div className="detail-grid">
          <div className="detail-item">
            <span className="item-kicker">Workout name</span>
            <strong>{workout.name}</strong>
          </div>
          <div className="detail-item">
            <span className="item-kicker">Workout date</span>
            <strong>{workout.date?.slice(0, 10)}</strong>
          </div>
        </div>
      </section>

      <div className="page-actions">
        <button className="button-secondary" onClick={() => navigate("/")}>Back to Overview</button>
        <button onClick={() => navigate(`/workouts/${workout.id}/assign-exercise`)}>Assign Exercise</button>
      </div>

      <div className="section-heading">
        <h3 className="content-header">Assigned Exercises</h3>
        <p className="section-copy">Each entry records the planned volume and working weight for the session.</p>
      </div>

      {!workout.workoutExercises || workout.workoutExercises.length === 0 ? (
        <EmptyState text="No exercises assigned to this workout yet." />
      ) : (
        <ul className="assignment-list">
          {workout.workoutExercises.map((item) => (
            <li className="assignment-item" key={item.id}>
              <div className="assignment-summary">
                <p className="item-kicker">{item.exercise?.primaryMuscleGroup}</p>
                <strong>{item.exercise?.name}</strong>
                <p className="assignment-metrics">
                  {item.sets} sets x {item.repetitions} reps at {item.usedWeight} kg
                </p>
              </div>
              <div className="assignment-actions">
                <button onClick={() => navigate(`/workout-exercises/${item.id}/edit`)}>Edit</button>
                <button className="danger-button" onClick={() => handleDeleteAssignment(item.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default WorkoutDetailPage;