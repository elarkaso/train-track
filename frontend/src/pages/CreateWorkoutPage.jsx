import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createWorkout } from "../api/workoutApi";
import { getTodayDate } from "../utils/date";

import { ErrorMessage } from "../components/messages/ErrorMessage";

function CreateWorkoutPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Workout name is required.");
      return;
    }

    if (!date) {
      setError("Workout date is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await createWorkout({
        name: name.trim(),
        date,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
      <section className="page-layout page-layout-narrow">
      <header className="page-header">
        <h2>New Workout</h2>
        <p className="page-subtitle">
          Add a workout session with a clear title and date so it is ready for assignments.
        </p>
      </header>
      <div className="form-actions">
        <form className="editor-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Workout name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter workout name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="date">Workout date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-buttons">
            <button className="submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Workout"}
            </button>

            <button className="button-secondary" type="button" onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
      </div>

      {error && <ErrorMessage message={error} />}
    </section>
  );
}

export default CreateWorkoutPage;
