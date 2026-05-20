import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrainingBalanceAnalysis } from "../api/analysisApi";

function getCurrentMonthRange() {
  const now = new Date();

  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  };
}

function TrainingBalanceAnalysisPage() {
  const defaultRange = getCurrentMonthRange();

  const [from, setFrom] = useState(defaultRange.from);
  const [to, setTo] = useState(defaultRange.to);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadAnalysis(filters = { from, to }) {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getTrainingBalanceAnalysis(filters);
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAnalysis({ from, to });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (from && to && from > to) {
      setError("Selected date range is not valid.");
      return;
    }

    loadAnalysis({ from, to });
  }

  const warningMessage = analysis?.uuAppErrorMap?.noDataForSelectedPeriod?.message;

  return (
    <div>
      <h1>Training Balance Analysis</h1>

      <div>
        <button onClick={() => window.location.href = "/"}>Back to Workout Overview</button>
      </div>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Analyze</button>
      </form>

      {isLoading && <p>Loading analysis...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!isLoading && !error && analysis && (
        <div>
          <p>
            <strong>Selected period:</strong> {analysis.period.from} - {analysis.period.to}
          </p>

          {warningMessage && (
            <p style={{ color: "darkorange" }}>Warning: {warningMessage}</p>
          )}

          <h2>Muscle Group Summary</h2>

          {analysis.muscleGroupSummary?.length > 0 ? (
            <ul>
              {analysis.muscleGroupSummary.map((item) => (
                <li key={item.primaryMuscleGroup}>
                  <strong>{item.primaryMuscleGroup}</strong>: {item.totalSets} sets
                </li>
              ))}
            </ul>
          ) : (
            <p>No summary data available.</p>
          )}

          <h2>Highlights</h2>

          <p>
            <strong>Most trained muscle group:</strong>{" "}
            {analysis.mostTrainedMuscleGroup
              ? `${analysis.mostTrainedMuscleGroup.primaryMuscleGroup} (${analysis.mostTrainedMuscleGroup.totalSets} sets)`
              : "N/A"}
          </p>

          <p>
            <strong>Least trained muscle group:</strong>{" "}
            {analysis.leastTrainedMuscleGroup
              ? `${analysis.leastTrainedMuscleGroup.primaryMuscleGroup} (${analysis.leastTrainedMuscleGroup.totalSets} sets)`
              : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}

export default TrainingBalanceAnalysisPage;