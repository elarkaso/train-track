import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createExercise } from "../api/exerciseApi";

import { MUSCLE_GROUPS } from "../utils/muscleGroups";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";

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
    <div className="page-layout">
      <header className="page-header">
        <p className="page-subtitle">
          Here you can create a new exercise. Fill in the details below and click "Save Exercise" to add it to your catalog.
        </p>
      </header>

      <div className="form-actions">
        <form className="filter-form" onSubmit={handleSubmit}>
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
          {isSubmitting ? "Saving..." : "Save Exercise"}
          </button>

          <button className="submit" type="button" onClick={() => navigate("/exercises")}>Cancel</button>
        </div>
      </form>
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default CreateExercisePage;