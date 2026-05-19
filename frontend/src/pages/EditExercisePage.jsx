import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getExerciseById, updateExercise } from "../api/exerciseApi";
import { MUSCLE_GROUPS } from "../utils/muscleGroups";

export default function EditExercisePage() {
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
    return <p>Loading exercise...</p>;
  }

  if (error && !name && !primaryMuscleGroup) {
    return (
      <div>
        <h1>Edit Exercise</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
        <Link to="/exercises">Back to Exercise Overview</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Exercise</h1>

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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>

        <Link to="/exercises">Cancel</Link>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}