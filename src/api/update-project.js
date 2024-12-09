async function updateProject(projectId, updatedData) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;
    const token = window.localStorage.getItem("token")

        try {
            const response = await fetch(url, {
                method: "PUT", // 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

    if (!response.ok) {
    const fallbackError = `Error updating project with id ${projectId}`;

    const data = await response.json().catch(() => {
        throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
    }

    return await response.json();
} catch (error) {
    console.error("Error updating project:", error);
    throw error; // Re-throw the error for handling in the calling function
}
}

export default updateProject;