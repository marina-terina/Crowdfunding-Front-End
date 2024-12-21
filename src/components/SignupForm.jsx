import { useState } from "react";
import postSignup from "../api/post-signup.js";
import postLogin from "../api/post-login.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import "./SignupForm.css";

function SignupForm() {
    const navigate = useNavigate(); 
    const {auth, setAuth} = useAuth();
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
            const { id, value } = event.target;
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [id]: value,
            }));
        };
    
        const handleSubmit = async (event) => {
            event.preventDefault();
            if (credentials.username && credentials.email && credentials.password) {
                try {

                    await postSignup(
                        credentials.username,
                        credentials.email,
                        credentials.password
                    );
    
                    const loginResponse = await postLogin(
                        credentials.username,
                        credentials.password
                    );
                    window.localStorage.setItem("token", response.token);
                    window.localStorage.setItem("userId", response.user_id);
                setAuth({
                    token: response.token,
                    userId: response.user_id
                });
                    navigate("/"); 
                } catch (error) {
                    if (error.response && error.response.status === 409) {
                        setError(error.response.data.message); 
                    } else {
                        setError("Email is already registered. Please log in or use another email. ");
                    }
                }
            } else {
                setError("All fields are required."); 
            }
        };
    
        return (
            <form className="signup-form">
                <h2>Please Sign Up to Kickstart Your Dream</h2>
                {error && <div className="error-message">{error}</div>} 
                <div>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Sign up
                </button>
            </form>
        );
    }
    
    export default SignupForm;