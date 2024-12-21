import { useState, useEffect } from "react";

import createProject from "../api/create-project";

export default function useCreateProject(title, description, goal, reward, url) {
const [project, setProject] = useState();
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState();

useEffect(() => {
    createProject(title, description, goal, reward, url)
    .then((project) => {
        setProject(project);
        setIsLoading(false);
        console.log('test hook----', project)

    })
    .catch((error) => {
        setError(error);
        setIsLoading(false);
    });

}, [title, description, goal, reward, url]);

return { project, isLoading, error };
}