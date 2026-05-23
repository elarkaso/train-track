import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getWorkouts, deleteWorkout } from "../api/workoutApi";

import { getCurrentYearRange, getCurrentMonthRange } from "../utils/date";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";

function WorkoutOverviewPage() {
  const defaultDateRange = getCurrentYearRange();

  const [workouts, setWorkouts] = useState([]);
  const [from, setFrom] = useState(defaultDateRange.from);
  const [to, setTo] = useState(defaultDateRange.to);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleDeleteWorkout(workoutId) {
    const confirmed = window.confirm("Are you sure you want to delete this workout?");

    if (!confirmed) {
      return;
    }

    try {
      setError(null);
      const deleteResult = await deleteWorkout(workoutId);

      if (!deleteResult?.deleted || Number(deleteResult.id) !== Number(workoutId)) {
        return;
      }

      setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.id !== workoutId));
    } catch (err) {
      console.error("Failed to delete workout:", err);
    }
  }

  async function loadWorkouts(filters = { from, to }) {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getWorkouts(filters);
      setWorkouts(data.itemList || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadWorkouts({from, to});
  }, []);

  function handleFilterSubmit(e) {
    e.preventDefault();
    loadWorkouts({ from, to });
  }

  return (
    <div>
      <h1>Workout Overview</h1>

      <button type="button" onClick={() => window.location.href = "/workouts/new"}>Create Workout</button>
      <form onSubmit={handleFilterSubmit}>
        <div>
          <label htmlFor="from">From:</label>
          <input
            id="from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="to">To:</label>
          <input
            id="to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <button type="submit">Filter</button>
      </form>

      {isLoading && <LoadingMessage message="Loading workouts..." />}
      {error && <ErrorMessage message={error} />}
      
      {!isLoading && !error && workouts.length === 0 && <ErrorMessage message="No workouts found for the selected period." />}
      {!isLoading && !error && workouts.length > 0 && (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <strong>{workout.name}</strong> - {workout.date.slice(0, 10)}
              <button type="button" onClick={() => window.location.href = `/workouts/${workout.id}`}>View</button>{" "}
              <button type="button" onClick={() => window.location.href = `/workouts/${workout.id}/edit`}>Edit</button>
              <button type="button" onClick={() => handleDeleteWorkout(workout.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkoutOverviewPage;