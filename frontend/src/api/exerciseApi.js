const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
export async function getExercises() {
  const response = await fetch(`${API_BASE_URL}/exercises`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Failed to fetch exercises: ${response.statusText}`);
  }

  return response.json();
}