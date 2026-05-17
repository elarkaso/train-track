import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createWorkout } from "../api/workoutApi";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

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
    <div>
      <h1>Create Workout</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Workout"}
        </button>

        <Link to="/">Cancel</Link>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}

export default CreateWorkoutPage;