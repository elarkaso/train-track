import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createExercise } from "../api/exerciseApi";
import { MUSCLE_GROUPS } from "../utils/muscleGroups";

function CreateExercisePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [primaryMuscleGroup, setPrimaryMuscleGroup] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

      await createExercise({
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

  return (
    <div>
      <h1>Create Exercise</h1>

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
          {isSubmitting ? "Saving..." : "Save Exercise"}
        </button>

        <button type="button" onClick={() => navigate("/exercises")}>Cancel</button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}

export default CreateExercisePage;