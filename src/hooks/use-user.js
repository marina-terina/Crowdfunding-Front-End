import { useState, useEffect } from "react";
import getUser from "../api/get-user";

export default function useUser(userId) {
const [user, setUser] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    if (userId) {
        setIsLoading(true);
        getUser(userId)
            .then((userData) => {
                setUser(userData);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }
}, [userId]);

    return { user, isLoading, error };
}
