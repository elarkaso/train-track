import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWorkoutById } from "../api/workoutApi";

function WorkoutDetailPage() {
  const { id } = useParams();

  const [workout, setWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <Link to="/">Back to Overview</Link>{" "}
        <Link to={`/workouts/${workout.id}/assign-exercise`}>Assign Exercise</Link>
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
              <Link to={`/workout-exercises/${item.id}/edit`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkoutDetailPage;