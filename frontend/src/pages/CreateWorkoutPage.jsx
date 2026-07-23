import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createWorkout } from "../api/workoutApi";
import { getTodayDate } from "../utils/date";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";

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
      <div className="page-layout">
      <header className="page-header">
        <h2>New Workout</h2>
        <p className="page-subtitle">
          Here you can create a new workout. Fill in the details below and click "Save Workout" to add it to your list.
        </p>
      </header>
      <div className="form-actions">
        <form className="filter-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Workout name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter workout name"
          />
        </div>

        <div>
          <label htmlFor="date">Workout date:</label>
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

          <button className="submit" type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default CreateWorkoutPage;
