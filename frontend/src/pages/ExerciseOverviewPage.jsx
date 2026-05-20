import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExercises, deleteExercise } from "../api/exerciseApi";

function ExerciseOverviewPage() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleDeleteExercise(exerciseId) {
  const confirmed = window.confirm("Do you really want to delete this exercise?");

  if (!confirmed) {
    return;
  }

  try {
    setError(null);
    const deleteResult = await deleteExercise(exerciseId);

    if (!deleteResult?.deleted || Number(deleteResult.id) !== Number(exerciseId)) {
      return;
    }

    setExercises((prevExercises) => prevExercises.filter((exercise) => exercise.id !== exerciseId));
  } catch (err) {
    console.error("Failed to delete exercise:", err);
  }
}

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
      <h1>Exercise Catalog</h1>

      <div>
        <button type="button" onClick={() => window.location.href = '/'}>Back to Workout Overview</button>{" "}
        <button type="button" onClick={() => window.location.href = '/exercises/new'}>Create Exercise</button>
      </div>

      {exercises.length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise.id}>
              <strong>{exercise.name}</strong> ({exercise.primaryMuscleGroup}){" "}
              <button type="button" onClick={() => window.location.href = `/exercises/${exercise.id}/edit`}>Edit</button>
              <button type="button" onClick={() => handleDeleteExercise(exercise.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExerciseOverviewPage;