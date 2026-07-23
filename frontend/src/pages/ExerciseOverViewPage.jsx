import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getExercises, deleteExercise } from "../api/exerciseApi";

import { MUSCLE_GROUPS } from "../utils/muscleGroups";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";
import EmptyState from "../components/common/EmptyState";

function ExerciseOverviewPage() {
  const navigate = useNavigate();

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
    <section className="page-layout">
      <header className="page-header">
        <p className="eyebrow">Exercises</p>
        <h2>Exercise Catalog</h2>
        <p className="page-subtitle">
          Keep your exercise library organized by muscle group and maintain the movements you actually use.
        </p>
      </header>

      <div className="form-actions">
        <form className="filter-form">
          <div className="form-field">
            <label htmlFor="muscleGroup">Filter by muscle group</label>
            <select
              id="muscleGroup"
              name="muscleGroup"
              value={muscleGroupFilter}
              onChange={(e) => setMuscleGroupFilter(e.target.value)}
            >
              <option value="">All groups</option>
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
        <EmptyState
          text={
            muscleGroupFilter
              ? `No exercises found for ${muscleGroupFilter}.`
              : "No exercises found."
          }
        />
      ) : (
        <ul className="exercise-list">
          {filteredExercises.map((exercise) => (
            <li className="exercise-item" key={exercise.id}>
              <div className="exercise-summary">
                <p className="item-kicker">Primary group</p>
                <strong className="exercise-name">{exercise.name}</strong>
                <p className="item-footnote">{exercise.primaryMuscleGroup}</p>
              </div>

              <div className="exercise-actions">
                <button type="button" onClick={() => navigate(`/exercises/${exercise.id}/edit`)}>Edit</button>
                <button className="danger-button" type="button" onClick={() => handleDeleteExercise(exercise.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ExerciseOverviewPage;