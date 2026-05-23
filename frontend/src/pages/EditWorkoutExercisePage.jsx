import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getWorkoutExerciseById, updateWorkoutExercise } from "../api/workoutExerciseApi";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";

function EditWorkoutExercisePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workoutExercise, setWorkoutExercise] = useState(null);
  const [sets, setSets] = useState(1);
  const [repetitions, setRepetitions] = useState(1);
  const [usedWeight, setUsedWeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWorkoutExercise() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getWorkoutExerciseById(id);
        const loadedWorkoutExercise = data.workoutExercise;

        setWorkoutExercise(loadedWorkoutExercise);
        setSets(loadedWorkoutExercise.sets);
        setRepetitions(loadedWorkoutExercise.repetitions);
        setUsedWeight(loadedWorkoutExercise.usedWeight);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadWorkoutExercise();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

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

      await updateWorkoutExercise(id, {
        sets: Number(sets),
        repetitions: Number(repetitions),
        usedWeight: Number(usedWeight),
      });

      navigate(`/workouts/${workoutExercise.workout.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <LoadingMessage message="Loading workout exercise..." />;
  }

  if (error && !workoutExercise) {
    return (
      <div>
        <h1>Edit Workout Exercise</h1>
        <ErrorMessage message={error} />
        <Link to="/">Back to Overview</Link>
      </div>
    );
  }

  if (!workoutExercise) {
    return <ErrorMessage message="Workout exercise not found." />;
  }

  return (
    <div>
      <h1>Edit Workout Exercise</h1>

      <p>
        <strong>Exercise:</strong> {workoutExercise.exercise?.name} (
        {workoutExercise.exercise?.primaryMuscleGroup})
      </p>

      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
        <button type="button" onClick={() => navigate(`/workouts/${workoutExercise.workout.id}`)}>Cancel</button>
      </form>

      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default EditWorkoutExercisePage;