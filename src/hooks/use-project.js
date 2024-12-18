import { useState, useEffect } from "react";

export default function useProject(projectId) {
    const [project, setProject] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/projects/${projectId}`
                );
                const data = await response.json();
                setProject(data);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    return { project, isLoading, error };
}