import { Link, Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <div>
      <header style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
        <h1>TrainTrack</h1>
        <h3>Track your workouts, analyze your progress, and achieve your fitness goals!</h3>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link to="/workouts">Workouts</Link>
          <Link to="/workouts/new">Create Workout</Link>
          <Link to="/exercises">Exercise Catalog</Link>
          <Link to="/analysis">Analysis</Link>
        </nav>
      </header>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default PageLayout;