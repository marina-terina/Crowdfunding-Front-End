async function getUser(userId) {
    const url = `${import.meta.env.VITE_API_URL}/users/${userId}`;
    console.log("Fetching user data for ID:", userId);
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
    const fallbackError = `Error fetching user with id ${userId}`;

    const data = await response.json().catch(() => {
        throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
    }

    const user = await response.json();
  return { username: user.username }; 

}

export default getUser;