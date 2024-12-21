import { useState, useEffect } from 'react';
import useAuth from './use-auth';
import getProject from '../api/get-project';

function useUserProjects() {
    const { auth } = useAuth();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserProjects = async () => {
        try {
            console.log('Fetching projects with auth:', auth);
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/projects/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${auth.token}`,
                    },
                }
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch user projects');
            }
            const data = await response.json();
            
            const userProjects = data.filter(project => {
                console.log('Comparing project owner:', project.owner, 'with user ID:', auth.userId);
                return Number(project.owner) === Number(auth.userId);
            });

            const detailedProjects = await Promise.all(
                userProjects.map(async (project) => {
                    try {
                        const detailedProject = await getProject(project.id);
                        return detailedProject;
                    } catch (err) {
                        console.error(`Error fetching details for project ${project.id}:`, err);
                        return project;
                    }
                })
            );
            
            console.log('Detailed projects:', detailedProjects);
            setProjects(detailedProjects);
            
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (auth.token && auth.userId) {
            fetchUserProjects();
        }
    }, [auth.token, auth.userId]);

    return { projects, isLoading, error };
}

export default useUserProjects; 