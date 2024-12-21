import { useState, useEffect } from "react";
import useAuth from "./use-auth";

export default function useUser() {
    const { auth } = useAuth();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        console.log('Fetching user data...');
        console.log('Auth:', auth);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/${auth.userId}/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${auth.token}`,
                    },
                }
            );
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            console.log('Fetched user data:', data);
            setUserData(data);
        } catch (err) {
            console.error('Error in fetchUser:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (updatedData) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/${auth.userId}/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${auth.token}`,
                    },
                    body: JSON.stringify(updatedData),
                }
            );
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            const data = await response.json();
            setUserData(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    useEffect(() => {
        if (auth.token && auth.userId) {
            fetchUser();
        }
    }, [auth.token, auth.userId]);

    return { userData, isLoading, error, updateUser };
}
