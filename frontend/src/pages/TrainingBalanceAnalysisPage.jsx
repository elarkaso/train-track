import { useEffect, useState } from "react";

import { getTrainingBalanceAnalysis } from "../api/analysisApi";

import { getCurrentMonthRange, getCurrentYearRange } from "../utils/date";

import { ErrorMessage } from "../components/messages/ErrorMessage";
import { LoadingMessage } from "../components/messages/LoadingMessage";

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
  const summaryItems = analysis?.muscleGroupSummary || [];
  const totalSets = summaryItems.reduce((sum, item) => sum + item.totalSets, 0);

  function applyPresetRange(range) {
    setFrom(range.from);
    setTo(range.to);
    loadAnalysis(range);
  }

  return (
    <div className="page-layout">
      <header className="page-header">
        <h2>Training Balance Analysis</h2>
        <p className="page-subtitle">
          Keep your training  volume balanced across muscle groups to optimize progress and reduce inefficient muscle overload.
        </p>
      </header>

      <div className="form-actions">
        <form className="filter-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="from">From:</label>
            <input
              id="from"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="to">To:</label>
            <input
              id="to"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="form-inline-actions">
            <button className="submit" type="submit">Analyze</button>
          </div>
        </form>

        <div className="form-presets">
          <button type="button" className="button-muted" onClick={() => applyPresetRange(getCurrentMonthRange())}>
            This Month
          </button>
          <button type="button" className="button-muted" onClick={() => applyPresetRange(getCurrentYearRange())}>
            This Year
          </button>
        </div>
      </div>

      {isLoading && <LoadingMessage message="Loading analysis..." />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && analysis && (
        <section className="results-stack">

          {warningMessage && (
            <p className="warning-message callout-warning">Warning: {warningMessage}</p>
          )}

          <div className="stat-grid">
            <article className="stat-card">
              <h3 className="stat-label">Most Trained</h3>
              <p className="stat-value">
                {analysis.mostTrainedMuscleGroup
                  ? analysis.mostTrainedMuscleGroup.primaryMuscleGroup
                  : "N/A"}
              </p>
              <p className="stat-meta">
                {analysis.mostTrainedMuscleGroup
                  ? `${analysis.mostTrainedMuscleGroup.totalSets} sets`
                  : "No data"}
              </p>
            </article>

            <article className="stat-card">
              <h3 className="stat-label">Least Trained</h3>
              <p className="stat-value">
                {analysis.leastTrainedMuscleGroup
                  ? analysis.leastTrainedMuscleGroup.primaryMuscleGroup
                  : "N/A"}
              </p>
              <p className="stat-meta">
                {analysis.leastTrainedMuscleGroup
                  ? `${analysis.leastTrainedMuscleGroup.totalSets} sets`
                  : "No data"}
              </p>
            </article>

            <article className="stat-card">
              <h3 className="stat-label">Total Sets</h3>
              <p className="stat-value">{totalSets}</p>
              <p className="stat-meta">Across selected period</p>
            </article>
          </div>

          <h2 className="content-header">Muscle Group Summary</h2>

          {summaryItems.length > 0 ? (
            <ul className="data-grid">
              {summaryItems.map((item) => {
                const ratio = totalSets > 0 ? Math.round((item.totalSets / totalSets) * 100) : 0;

                return (
                  <li className="data-card" key={item.primaryMuscleGroup}>
                    <div className="data-card-header">
                      <strong>{item.primaryMuscleGroup}</strong>
                      <span>{item.totalSets} sets</span>
                    </div>
                    <div className="progress-bar">
                      <span style={{ width: `${ratio}%` }} />
                    </div>
                    <p className="data-card-footnote">{ratio}% of total volume</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No summary data available.</p>
          )}
        </section>
      )}
    </div>
  );
}

export default TrainingBalanceAnalysisPage;