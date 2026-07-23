import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { getWorkoutById } from "../api/workoutApi";
import { deleteWorkoutExercise } from "../api/workoutExerciseApi";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";

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
    <div className="page-layout">
      <header className="page-header">
        <h2>{workout.name}</h2>
      </header>

      {!workout.workoutExercises || workout.workoutExercises.length === 0 ? (
        <p>No exercises assigned to this workout yet.</p>
      ) : (
        <ul className="workout-exercise-list">
          {workout.workoutExercises.map((item) => (
            <li className="workout-exercise-item" key={item.id}>
              <div className="workout-exercise-info">
                <strong>{item.exercise?.name}</strong>
              {item.sets} × {item.repetitions} x {item.usedWeight} kg{" "}
              </div>
              <div className="workout-actions">
                <button onClick ={() => navigate(`/workout-exercises/${item.id}/edit`)}>Edit</button>{" "}
                <button className="danger-button" onClick={() => handleDeleteAssignment(item.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="page-actions">
        <button onClick={() => navigate(`/workouts/${workout.id}/assign-exercise`)}>Assign Exercise</button>
      </div>
    </div>
  );
}

export default WorkoutDetailPage;
