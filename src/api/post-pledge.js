export async function postPledge(amount, comment, anonymous, reward, projectId) {
    // Construct the URL to submit the pledge for a specific project
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/pledges/`;
    const token = window.localStorage.getItem("token")

    if (!token) {
      throw new Error("Invalid or missing token. Please log in.");
    }
  
    try {
      // Sending POST request with pledge data
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`          
        },
        body: JSON.stringify({
          amount,
          comment,
          anonymous,
          reward,
          project: projectId,
        }),
      });
  
      // If the response is not successful, throw an error
      if (!response.ok) {
        const fallbackError = "Error submitting pledge. Please try again.";
  
        // Handle the error from the response, and try to get the detailed error message
        const data = await response.json().catch(() => {
          throw new Error(fallbackError);
        });
  
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
      }
  
      // If everything is fine, return the response (ideally updated project data)
      return await response.json();
  
    } catch (error) {
      console.error("Error during pledge submission:", error);
      throw new Error(error.message || "Unknown error occurred");
    }
  }
