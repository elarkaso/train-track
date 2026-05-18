import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getWorkoutById, updateWorkout } from "../api/workoutApi";

export default function EditWorkoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWorkout() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getWorkoutById(id);
        const workout = data.workout;

        setName(workout.name || "");
        setDate(workout.date?.slice(0, 10) || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

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

      await updateWorkout(id, {
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

  if (isLoading) {
    return <p>Loading workout...</p>;
  }

  return (
    <div>
      <h1>Edit Workout</h1>

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
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>

        <Link to="/">Cancel</Link>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}