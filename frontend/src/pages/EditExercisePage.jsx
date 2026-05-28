import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getExerciseById, updateExercise } from "../api/exerciseApi";
import { MUSCLE_GROUPS } from "../utils/muscleGroups";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";

function EditExercisePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [primaryMuscleGroup, setPrimaryMuscleGroup] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadExercise() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getExerciseById(id);
        const exercise = data.exercise;

        setName(exercise.name || "");
        setPrimaryMuscleGroup(exercise.primaryMuscleGroup || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadExercise();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Exercise name is required.");
      return;
    }

    if (!primaryMuscleGroup) {
      setError("Primary muscle group is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await updateExercise(id, {
        name: name.trim(),
        primaryMuscleGroup,
      });

      navigate("/exercises");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <LoadingMessage message="Loading exercise..." />;
  }

  if (error && !name && !primaryMuscleGroup) {
    return (
      <div className="page-layout">
        <header className="page-header">
          <h2>Edit Exercise</h2>
        </header>
        <ErrorMessage message={error} />
        <Link to="/exercises">Back to Exercise Overview</Link>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <header className="page-header">
        <h2>Edit Exercise</h2>
      </header>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Exercise name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter exercise name"
          />
        </div>

        <div>
          <label htmlFor="primaryMuscleGroup">Primary muscle group:</label>
          <select
            id="primaryMuscleGroup"
            value={primaryMuscleGroup}
            onChange={(e) => setPrimaryMuscleGroup(e.target.value)}
          >
            <option value="">Select muscle group</option>
            {MUSCLE_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="form-buttons">
          <button className="submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>

          <button className="submit" type="button" onClick={() => navigate("/exercises")}>Cancel</button>
        </div>
      </form>

      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default EditExercisePage;