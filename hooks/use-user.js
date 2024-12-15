import { useState, useEffect } from "react";
import getUser from "../api/get-user";

export default function useUser(userId) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        // Only fetch if we have a userId
        if (userId) {
            setIsLoading(true); // Reset loading state
            getUser(userId)
                .then((user) => {
                    console.log('User data received:', user); // Debug log
                    setUser(user);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching user:', error); // Debug log
                    setError(error);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false); // No userId, so we're not loading
        }
    }, [userId]);

    return { user, isLoading, error };
} 