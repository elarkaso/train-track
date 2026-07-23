import { NavLink, Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <div className="app-shell">
      <header className="main-header">
        <h1><span className="brand-mark" aria-hidden="true">TT</span>TrainTrack</h1>
        <p>Track your workouts, analyze your progress, and achieve your fitness goals!</p>

        <nav className="main-nav">
          <NavLink
            to="/workouts"
            end
            className={({ isActive }) => (isActive ? "button-link button-link-active" : "button-link")}
          >
            Workouts
          </NavLink>
          <NavLink
            to="/workouts/new"
            end
            className={({ isActive }) => (isActive ? "button-link button-link-active" : "button-link")}
          >
            Create Workout
          </NavLink>
          <NavLink
            to="/exercises"
            end
            className={({ isActive }) => (isActive ? "button-link button-link-active" : "button-link")}
          >
            Exercise Catalog
          </NavLink>
          <NavLink
            to="/exercises/new"
            end
            className={({ isActive }) => (isActive ? "button-link button-link-active" : "button-link")}
          >
            Create Exercise
          </NavLink>
          <NavLink
            to="/analysis"
            end
            className={({ isActive }) => (isActive ? "button-link button-link-active" : "button-link")}
          >
            Analysis
          </NavLink>
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default PageLayout;
