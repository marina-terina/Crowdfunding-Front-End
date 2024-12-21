import { useState, useEffect } from 'react';
import useAuth from './use-auth';
import getProject from '../api/get-project';

function useUserPledges() {
    const { auth } = useAuth();
    const [pledges, setPledges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserPledges = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/pledges/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${auth.token}`,
                    },
                }
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch user pledges');
            }
            const data = await response.json();
            
            // Filter pledges for the logged-in user
            const userPledges = data.filter(pledge => 
                Number(pledge.supporter) === Number(auth.userId)
            );

            // Fetch project details for each pledge
            const pledgesWithProjects = await Promise.all(
                userPledges.map(async (pledge) => {
                    try {
                        const project = await getProject(pledge.project);
                        return {
                            ...pledge,
                            project_title: project.title,
                            project_id: project.id,
                            project_reward: project.reward
                        };
                    } catch (err) {
                        console.error(`Error fetching project for pledge ${pledge.id}:`, err);
                        return pledge;
                    }
                })
            );
            
            setPledges(pledgesWithProjects);
            
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (auth.token && auth.userId) {
            fetchUserPledges();
        }
    }, [auth.token, auth.userId]);

    return { pledges, isLoading, error };
}

export default useUserPledges; 