import { apiFetch } from "./apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

async function getWorkouts(params = {}) {
    const searchParams = new URLSearchParams();

    if (params.from) searchParams.append("from", params.from);
    if (params.to) searchParams.append("to", params.to);

    const query = searchParams.toString();
    return apiFetch(query ? `/workouts?${query}` : "/workouts");
}

async function createWorkout(dtoIn) {
    const response = await fetch(`${API_BASE_URL}/workouts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dtoIn),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        // handle error about duplicate workout for date
        if (errorData?.error?.code === "workoutAlreadyExistsForDate") {
            throw new Error("A workout for the selected date already exists. Please choose a different date.");
        }
        throw new Error(errorData?.message || `Failed to create workout: ${response.statusText}`);
    }

    return response.json();
}

async function getWorkoutById(id) {
    const response = await fetch(`${API_BASE_URL}/workouts/${id}`);

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        // handle error workout not found
        if (errorData?.error?.code === "workoutNotFound") {
            throw new Error("Workout not found.");
        }
        throw new Error(errorData?.message || `Failed to fetch workout: ${response.statusText}`);
    }

    return response.json();
}

async function updateWorkout(id, dtoIn) {
    const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dtoIn),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
         // handle error about duplicate workout for date
        if (errorData?.error?.code === "workoutAlreadyExistsForDate") {
            throw new Error("A workout for the selected date already exists. Please choose a different date.");
        }
        throw new Error(errorData?.message || `Failed to update workout: ${response.statusText}`);
    }

    return response.json();
}

async function deleteWorkout(id) {
    const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        // handle error workout not found
        if (errorData?.error?.code === "workoutNotFound") {
            throw new Error("Workout not found.");
        }
        // handle error workout has assigned exercises
        if (errorData?.error?.code === "workoutContainsAssignedExercises") {
            window.alert("Cannot delete workout because it has assigned exercises. Please remove all assigned exercises before deleting the workout.");
            return; // exit early since we don't want to throw an error in this case
        }
        throw new Error(errorData?.message || `Failed to delete workout: ${response.statusText}`);
    }

    return response.json();
}

export { 
    getWorkouts, 
    createWorkout, 
    getWorkoutById, 
    updateWorkout,
    deleteWorkout
};