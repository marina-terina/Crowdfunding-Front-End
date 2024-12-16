export async function postProject(projectData) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            title: projectData.title,
            description: projectData.description,
            image: projectData.image,
            goal_amount: projectData.goalAmount,
            // ... other fields
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error creating project`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
} 