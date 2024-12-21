import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import postLogin from "../api/post-login.js";
import useAuth from "../hooks/use-auth.js";
import "./LoginForm.css";

function LoginForm() {
    const navigate = useNavigate(); 
    const {auth, setAuth} = useAuth();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [isInvalidUser, setIsInvalidUser] = useState(false);
        
    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
};
    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password
            ).then((response) => {
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("userId", response.user_id);
                setAuth({
                    token: response.token,
                    userId: response.user_id
                });
                navigate("/");
            }).catch(() => {
                setIsInvalidUser(() => true)
                console.log({isInvalidUser})
            });
        }
    };

    if (isInvalidUser) {
        return (
            <form>
                <div className="error-message">User does not exist. Please sign up to get started</div>
                    <div className="signup-prompt">
                        <Link to="/signup">Sign Up Here</Link>
                    </div>
            </form>
            );
    } else {
        return (
            <form>
                <h2>Welcome Back! Log in to Kickstart!</h2>
                <div>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
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
                        Login
                    </button>
                    <div>
                        <Link to="/signup">Don't have an account? Sign Up Here</Link>
                    </div>
            </form>
            );
    }
}

export default LoginForm;