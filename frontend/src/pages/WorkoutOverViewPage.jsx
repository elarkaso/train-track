import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getWorkouts, deleteWorkout } from "../api/workoutApi";

import { getCurrentYearRange, formatDateToDisplay } from "../utils/date";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";
import EmptyState from "../components/common/EmptyState";

function WorkoutOverviewPage() {
  const defaultDateRange = getCurrentYearRange();
  const navigate = useNavigate();

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
    <section className="page-layout">
      <header className="page-header">
        <p className="eyebrow">Workouts</p>
        <h2>Workout Overview</h2>
        <p className="page-subtitle">
          Review your training calendar, narrow the date range, and jump straight into each session.
        </p>
      </header>
      <div className="form-actions">
        <form className="filter-form" onSubmit={handleFilterSubmit}>
          <div className="form-field">
            <label htmlFor="from">From</label>
            <input
              id="from"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="to">To</label>
            <input
              id="to"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="form-inline-actions">
            <button className="submit" type="submit">Filter Workouts</button>
          </div>
        </form>
      </div>

      {isLoading && <LoadingMessage message="Loading workouts..." />}
      {error && <ErrorMessage message={error} />}
      
      {!isLoading && !error && workouts.length === 0 && <EmptyState text="No workouts found for the selected period." />}
      {!isLoading && !error && workouts.length > 0 && (
        <ul className="workout-list">
          {workouts.map((workout) => (
            <li className="workout-item" key={workout.id} onClick={() => navigate(`/workouts/${workout.id}`)}>
              <div className="workout-summary">
                <p className="item-kicker">Session</p>
                <strong className="workout-name-link">{workout.name}</strong>
                <p className="item-footnote">Open this workout to view assignments and volume.</p>
              </div>
              
              <div className="workout-date">
                <span className="item-kicker">Date</span>
                {formatDateToDisplay(workout.date)}
              </div>
              <div className="workout-actions">
                <button type="button" onClick={(e) => { e.stopPropagation(); navigate(`/workouts/${workout.id}/edit`); }}>Edit</button>
                <button className="danger-button" type="button" onClick={(e) => { e.stopPropagation(); handleDeleteWorkout(workout.id); }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default WorkoutOverviewPage;