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
        <h2>Workout Detail</h2>
      </header>
      <p>
        <strong>Name:</strong> {workout.name}
      </p>

      <p>
        <strong>Date:</strong> {workout.date?.slice(0, 10)}
      </p>

      <div className="page-actions">
        <button onClick={() => navigate("/")}>Back to Overview</button>{" "}
        <button onClick={() => navigate(`/workouts/${workout.id}/assign-exercise`)}>Assign Exercise</button>
      </div>

      <h2>Assigned Exercises</h2>

      {!workout.workoutExercises || workout.workoutExercises.length === 0 ? (
        <p>No exercises assigned to this workout yet.</p>
      ) : (
        <ul>
          {workout.workoutExercises.map((item) => (
            <li key={item.id}>
              <strong>{item.exercise?.name}</strong> ({item.exercise?.primaryMuscleGroup}) -{" "}
              {item.sets} sets × {item.repetitions} reps @ {item.usedWeight} kg{" "}
              <button onClick ={() => navigate(`/workout-exercises/${item.id}/edit`)}>Edit</button>{" "}
              <button onClick={() => handleDeleteAssignment(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkoutDetailPage;