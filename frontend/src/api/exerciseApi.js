const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

async function createExercise(dtoIn) {
  const response = await fetch(`${API_BASE_URL}/exercises`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dtoIn),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Failed to create exercise: ${response.statusText}`);
  }

  return response.json();
}

async function getExerciseById(id) {
  const response = await fetch(`${API_BASE_URL}/exercises/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Failed to fetch exercise: ${response.statusText}`);
  }

  return response.json();
}

async function getExercises() {
  const response = await fetch(`${API_BASE_URL}/exercises`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Failed to fetch exercises: ${response.statusText}`);
  }

  return response.json();
}

async function updateExercise(id, dtoIn) {
  const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dtoIn),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Failed to update exercise: ${response.statusText}`);
  }

  return response.json();
}

async function deleteExercise(id) {
  const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    // handle error exercise is assigned to a workout
    if (errorData?.error?.code === "exerciseInUse") {
      window.alert("The exercise cannot be deleted because it is assigned to a workout.");
      return;
    }
    throw new Error(errorData?.error?.message || `Failed to delete exercise: ${response.statusText}`);
  }

  return response.json();
}

export { 
    createExercise,
    getExerciseById,
    getExercises,
    updateExercise,
    deleteExercise
};