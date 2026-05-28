import { useEffect, useState } from "react";

import { getExercises, deleteExercise } from "../api/exerciseApi";

import { MUSCLE_GROUPS } from "../utils/muscleGroups";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";

function ExerciseOverviewPage() {
  const [exercises, setExercises] = useState([]);
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredExercises = muscleGroupFilter
    ? exercises.filter((exercise) => exercise.primaryMuscleGroup === muscleGroupFilter)
    : exercises;

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
    setError(err.message);
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
    return <LoadingMessage message="Loading exercises..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="page-layout">
      <header className="page-header">
        <h2>Exercise Catalog</h2>
      </header>

      <div className="form-actions">
        <form className="filter-form">
        <div>
          <label htmlFor="muscleGroup">Filter by muscle group:</label>
          <select
            id="muscleGroup"
            name="muscleGroup"
            value={muscleGroupFilter}
            onChange={(e) => setMuscleGroupFilter(e.target.value)}
          >
            <option value="">All</option>
            {MUSCLE_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </form>
      </div>

      {filteredExercises.length === 0 ? (
        <p>
          {muscleGroupFilter
            ? `No exercises found for ${muscleGroupFilter}.`
            : "No exercises found."}
        </p>
      ) : (
        <ul className="exercise-list">
          {filteredExercises.map((exercise) => (
            <li className="exercise-item" key={exercise.id}>

              <div className="exercise-name">
                <strong>{exercise.name}</strong> ({exercise.primaryMuscleGroup})
              </div>

              <div className="exercise-actions">
                <button className="submit" type="button" onClick={() => window.location.href = `/exercises/${exercise.id}/edit`}>Edit</button>
                <button className="submit" type="button" onClick={() => handleDeleteExercise(exercise.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExerciseOverviewPage;