export async function postPledge(amount, comment, isAnonymous, reward, projectId) {
    if (!projectId) {
        throw new Error("Project ID is required");
    }

    if (!amount || amount <= 0) {
        throw new Error("Valid amount is required");
    }

    if (!comment || comment.trim() === "") {
        throw new Error("Comment is required");
    }

    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/pledges/`;
    const token = window.localStorage.getItem("token");
    
    if (!token) {
        throw new Error("Authentication required");
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
            amount: Number(amount),
            comment: comment.trim(),
            anonymous: Boolean(isAnonymous),
            reward: reward || null,
            project: Number(projectId),
        }),
    });

    if (!response.ok) {
        const data = await response.json();
        console.log("API Error Response:", data);
        const errorMessage = typeof data === 'object' ? JSON.stringify(data) : data;
        throw new Error(errorMessage);
    }

    return await response.json();
}
