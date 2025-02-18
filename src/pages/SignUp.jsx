import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postUser from "../api/post-user";
import useAuth from "../hooks/use-auth";

function SignUp() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
        // Clear error message when user starts typing
        setErrorMessage("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(""); // Clear any previous error messages

        // Basic validation
        if (!formData.username || !formData.email || !formData.password) {
            setErrorMessage("All fields are required");
            return;
        }

        try {
            const response = await postUser(
                formData.username,
                formData.email,
                formData.password
            );
            
            if (response.id) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Signup error:", error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                {errorMessage && (
                    <div className="error-message">
                        {errorMessage.split('\n').map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp; 