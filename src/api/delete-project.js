async function deleteProject(projectId) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;
    const token = window.localStorage.getItem("token")
    const response = await fetch(url, { method: "DELETE", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`          
        },
    });

    if (!response.ok) {
    const fallbackError = `Error fetching project with id ${projectId}`;

    const data = await response.json().catch(() => {
        throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
    }

    return true;
}

export default deleteProject;