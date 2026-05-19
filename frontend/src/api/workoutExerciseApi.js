const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

async function assignExerciseToWorkout(workoutId, dtoIn) {
  const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}/exercises`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dtoIn),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || "Failed to assign exercise to workout.");
  }

  return response.json();
}

async function getWorkoutExerciseById(id) {
  const response = await fetch(`${API_BASE_URL}/workout-exercises/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || "Failed to fetch workout exercise.");
  }

  return response.json();
}

async function updateWorkoutExercise(id, dtoIn) {
  const response = await fetch(`${API_BASE_URL}/workout-exercises/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dtoIn),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || "Failed to update workout exercise.");
  }

  return response.json();
}

async function deleteWorkoutExercise(id) {
  const response = await fetch(`${API_BASE_URL}/workout-exercises/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || "Failed to delete workout exercise.");
  }

  return response.json();
}

export {
  assignExerciseToWorkout,
  getWorkoutExerciseById,
  updateWorkoutExercise,
  deleteWorkoutExercise
};