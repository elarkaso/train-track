import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function PageLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="app-shell">
      <header className="main-header">
        <h1><span className="brand-mark" aria-hidden="true">TT</span>TrainTrack</h1>
        <p>Track your workouts, analyze your progress, and achieve your fitness goals!</p>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav id="main-navigation" className={isMenuOpen ? "main-nav menu-open" : "main-nav"}>
          <NavLink
            to="/workouts"
            end
            className={({ isActive }) => (isActive ? "button-link button-link-active" : "button-link")}
            onClick={closeMenu}
          >
            Workouts
          </NavLink>
          <NavLink
            to="/workouts/new"
            end
            className={({ isActive }) => (isActive ? "button-link button-link-active" : "button-link")}
            onClick={closeMenu}
          >
            Create Workout
          </NavLink>
          <NavLink
            to="/exercises"
            end
            className={({ isActive }) => (isActive ? "button-link button-link-active" : "button-link")}
            onClick={closeMenu}
          >
            Exercise Catalog
          </NavLink>
          <NavLink
            to="/exercises/new"
            end
            className={({ isActive }) => (isActive ? "button-link button-link-active" : "button-link")}
            onClick={closeMenu}
          >
            Create Exercise
          </NavLink>
          <NavLink
            to="/analysis"
            end
            className={({ isActive }) => (isActive ? "button-link button-link-active" : "button-link")}
            onClick={closeMenu}
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
