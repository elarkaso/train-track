const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

async function getTrainingBalanceAnalysis(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.from) {
    searchParams.append("from", params.from);
  }

  if (params.to) {
    searchParams.append("to", params.to);
  }

  const queryString = searchParams.toString();
  const url = queryString
    ? `${API_BASE_URL}/analysis/training-balance?${queryString}`
    : `${API_BASE_URL}/analysis/training-balance`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || "Failed to fetch training balance analysis.");
  }

  return response.json();
}

export { 
    getTrainingBalanceAnalysis 
};