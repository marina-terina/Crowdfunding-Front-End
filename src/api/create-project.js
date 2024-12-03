async function createProject(title, description, goal, reward, image, is_open) {
    const apiUrl = `${import.meta.env.VITE_API_URL}/projects/`;
    const token = window.localStorage.getItem("token")
    const response = await fetch(apiUrl, {
      method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
    },
    body: JSON.stringify({
        title: title,
        description: description,
        goal: goal,
        reward: reward,
        image: image,
        is_open: is_open
    }),
    });

    if (!response.ok) {
    const fallbackError = `Error trying to create a project`;

    const data = await response.json().catch(() => {
        throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
    }

    console.log('test----', response)
    return await response.json();
}

export default createProject;