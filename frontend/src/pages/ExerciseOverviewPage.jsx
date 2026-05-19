import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExercises } from "../api/exerciseApi";

function ExerciseOverviewPage() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadExercises() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getExercises();
        setExercises(data.itemList || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadExercises();
  }, []);

  if (isLoading) {
    return <p>Loading exercises...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Exercise Overview</h1>

      <div>
        <Link to="/">Back to Workout Overview</Link>{" "}
        <Link to="/exercises/new">Create Exercise</Link>
      </div>

      {exercises.length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise.id}>
              <strong>{exercise.name}</strong> ({exercise.primaryMuscleGroup}){" "}
              <Link to={`/exercises/${exercise.id}/edit`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExerciseOverviewPage;