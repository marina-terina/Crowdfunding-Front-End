import { useState, useEffect } from "react";
import getUser from "../api/get-user";

export default function useUser(userId) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     if (userId) {
//       setUser(null);
//       setIsLoading(false);
//       return;
//     }

//     let isMounted = true; // Flag to prevent state updates if the component is unmounted

//     setIsLoading(true);
//     getUser(userId)
//       .then((fetchedUser) => {
//         if (isMounted) {
//           setUser(fetchedUser);
//           setIsLoading(false);
//         }
//       })
//       .catch((err) => {
//         if (isMounted) {
//           console.error("Error fetching user:", err);
//           setError(err);
//           setIsLoading(false);
//         }
//       });

//     // Cleanup function to prevent state updates after unmount
//     return () => {
//       isMounted = false;
//     };
//   }, [userId]);
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
