import { useEffect, useState } from "react";
import { getWorkouts } from "../api/workoutApi";
import { Link } from "react-router-dom";

function getCurrentYearRange() {
  const now = new Date();

  const from = new Date(now.getFullYear(), 0, 1);
  const to = new Date(now.getFullYear(), 11, 31);

  return {
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  };
}

function getCurrentMonthRange() {
  const now = new Date();

  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  };
}

function WorkoutOverviewPage() {
  const defaultDateRange = getCurrentYearRange();

  const [workouts, setWorkouts] = useState([]);
  const [from, setFrom] = useState(defaultDateRange.from);
  const [to, setTo] = useState(defaultDateRange.to);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

      <Link to ="/workouts/new">Create Workout</Link>
      <Link to="/exercises">Exercise Catalog</Link>
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

      {isLoading && <p>Loading workouts...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      
      {!isLoading && !error && workouts.length === 0 && <p>No workouts found for the selected period.</p>}
      {!isLoading && !error && workouts.length > 0 && (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <strong>{workout.name}</strong> - {workout.date.slice(0, 10)}
              <Link to={`/workouts/${workout.id}`}>View</Link>{" "}
              <Link to={`/workouts/${workout.id}/edit`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkoutOverviewPage;