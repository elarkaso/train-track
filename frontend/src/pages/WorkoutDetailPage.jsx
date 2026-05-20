import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWorkoutById } from "../api/workoutApi";
import { deleteWorkoutExercise } from "../api/workoutExerciseApi";

function WorkoutDetailPage() {
  const { id } = useParams();

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
    return <p>Loading workout detail...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!workout) {
    return <p>Workout not found.</p>;
  }

  return (
    <div>
      <h1>Workout Detail</h1>

      <p>
        <strong>Name:</strong> {workout.name}
      </p>

      <p>
        <strong>Date:</strong> {workout.date?.slice(0, 10)}
      </p>

      <div>
        <button onClick={() => window.location.href = "/"}>Back to Overview</button>{" "}
        <button onClick={() => window.location.href = `/workouts/${workout.id}/assign-exercise`}>Assign Exercise</button>
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
              <button onClick ={() => window.location.href = `/workout-exercises/${item.id}/edit`}>Edit</button>{" "}
              <button onClick={() => handleDeleteAssignment(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkoutDetailPage;