import { NavLink, Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <div className="app-shell">
      <header className="main-header">
<<<<<<< HEAD
        <h1><span className="brand-mark" aria-hidden="true">TT</span>TrainTrack</h1>
        <p>Track your workouts, analyze your progress, and achieve your fitness goals!</p>
=======
        <div className="main-header-copy">
          <p className="eyebrow">Training journal</p>
          <h1>TrainTrack</h1>
          <p>
            Track workouts, tune volume, and keep your training balanced without losing sight of the details.
          </p>
        </div>
>>>>>>> 91c6cc3ddda12b028d5c959f5aa825300ec72fc3

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
