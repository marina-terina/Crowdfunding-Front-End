import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import postLogin from "../api/post-login.js";
import "./LoginForm.css";

function LoginForm() {
    const navigate = useNavigate(); 
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
});
        
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
                navigate("/");
            });
        }
    };
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

export default LoginForm;