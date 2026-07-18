import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createExercise } from "../api/exerciseApi";

import { MUSCLE_GROUPS } from "../utils/muscleGroups";

import { ErrorMessage } from "../components/messages/ErrorMessage";

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
    <section className="page-layout page-layout-narrow">
      <header className="page-header">
        <p className="eyebrow">Create</p>
        <h2>Create Exercise</h2>
        <p className="page-subtitle">
          Add a movement to the catalog and tag it to the primary muscle group you want to analyze later.
        </p>
      </header>

      <div className="form-actions">
        <form className="editor-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Exercise name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter exercise name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="primaryMuscleGroup">Primary muscle group</label>
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

            <button className="button-secondary" type="button" onClick={() => navigate("/exercises")}>Cancel</button>
          </div>
        </form>
      </div>

      {error && <ErrorMessage message={error} />}
    </section>
  );
}

export default CreateExercisePage;