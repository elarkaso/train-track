import { Link, Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <div className="page-layout">
      <header className="main-header">
        <h1>TrainTrack</h1>
        <p>Track your workouts, analyze your progress, and achieve your fitness goals!</p>

        <nav className="main-nav">
          <Link to="/workouts" className="button-link">
            Workouts
          </Link>
          <Link to="/workouts/new" className="button-link">
            Create Workout
          </Link>
          <Link to="/exercises" className="button-link">
            Exercise Catalog
          </Link>
          <Link to="/exercises/new" className="button-link">
            Create Exercise
          </Link>
          <Link to="/analysis" className="button-link">
            Analysis
          </Link>
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default PageLayout;