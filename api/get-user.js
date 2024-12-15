async function getUser(userId) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/users/${userId}`;
        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
            const fallbackError = `Error fetching user with id ${userId}`;
            
            const data = await response.json().catch(() => {
                throw new Error(fallbackError);
            });

            const errorMessage = data?.detail ?? fallbackError;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('User data from API:', data);
        return data;
    } catch (error) {
        console.error('Error in getUser:', error);
        throw error;
    }
}

export default getUser; 