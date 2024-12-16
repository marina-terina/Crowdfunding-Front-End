export async function postPledge(amount, comment, isAnonymous, reward, projectId) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/pledges/`;
    const token = window.localStorage.getItem("token");
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
            amount: amount,
            comment: comment,
            anonymous: isAnonymous,
            reward: reward,
            project: projectId,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to create pledge`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}
