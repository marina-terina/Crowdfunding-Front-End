export async function getProjectPledges(projectId) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/pledges/`;
    console.log("Fetching pledges from:", url);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        console.error("Response not OK:", response.status);
        throw new Error("Failed to get pledges");
    }

    const data = await response.json();
    console.log("Pledges received:", data);
    return data;
} 