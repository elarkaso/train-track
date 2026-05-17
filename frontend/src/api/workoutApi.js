const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export async function getWorkouts(params = {}) {
    const searchParams = new URLSearchParams();

    if (params.from) {
        searchParams.append("from", params.from);
    }
    if (params.to) {
        searchParams.append("to", params.to);
    }

    const url = `${API_BASE_URL}/workouts?${searchParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to fetch workouts: ${response.statusText}`);
    }

    return response.json();
}

export async function createWorkout(dtoIn) {
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