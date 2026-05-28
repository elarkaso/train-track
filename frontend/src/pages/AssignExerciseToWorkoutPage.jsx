import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getExercises } from "../api/exerciseApi";
import { assignExerciseToWorkout } from "../api/workoutExerciseApi";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";

function AssignExerciseToWorkoutPage() {
  const { id: workoutId } = useParams();
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [sets, setSets] = useState(1);
  const [repetitions, setRepetitions] = useState(1);
  const [usedWeight, setUsedWeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedExerciseId) {
      setError("You must select an exercise.");
      return;
    }

    if (Number(sets) <= 0) {
      setError("Sets must be greater than 0.");
      return;
    }

    if (Number(repetitions) <= 0) {
      setError("Repetitions must be greater than 0.");
      return;
    }

    if (Number(usedWeight) < 0) {
      setError("Used weight must be greater than or equal to 0.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await assignExerciseToWorkout(workoutId, {
        exerciseId: Number(selectedExerciseId),
        sets: Number(sets),
        repetitions: Number(repetitions),
        usedWeight: Number(usedWeight),
      });

      navigate(`/workouts/${workoutId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <LoadingMessage message="Loading exercises..." />;
  }

  return (
    <div className="page-layout">
      <header className="page-header">
        <h2>Assign Exercise to Workout</h2>
      </header>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="exercise">Exercise:</label>
          <select
            id="exercise"
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(e.target.value)}
          >
            <option value="">Select exercise</option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name} ({exercise.primaryMuscleGroup})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sets">Sets:</label>
          <input
            id="sets"
            type="number"
            min="1"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="repetitions">Repetitions:</label>
          <input
            id="repetitions"
            type="number"
            min="1"
            value={repetitions}
            onChange={(e) => setRepetitions(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="usedWeight">Used weight (kg):</label>
          <input
            id="usedWeight"
            type="number"
            min="0"
            step="0.5"
            value={usedWeight}
            onChange={(e) => setUsedWeight(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button className="submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Assign Exercise"}
          </button>
          <button className="submit" type="button" onClick={() => navigate(`/workouts/${workoutId}`)}>Cancel</button>
        </div>
      </form>

      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default AssignExerciseToWorkoutPage;