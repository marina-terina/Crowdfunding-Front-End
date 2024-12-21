import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = (props) => {
 
const [auth, setAuth] = useState({
    
    token: window.localStorage.getItem("token"),
    userId: window.localStorage.getItem("userId")
});

return (
    <AuthContext.Provider value={{ auth, setAuth }}>
    {props.children}
    </AuthContext.Provider>
);
};