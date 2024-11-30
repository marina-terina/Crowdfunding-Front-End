import { useState } from "react";
import postSignup from "../api/post-signup.js";
import postLogin from "../api/post-login.js";
import { useNavigate } from "react-router-dom";

function SignupForm() {
    const navigate = useNavigate(); 
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
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
                    postSignup(
                        credentials.username,
                        credentials.email,
                        credentials.password
                    ).then((response) => {
                        console.log(response);
                    postLogin(
                        credentials.username,
                        credentials.password,
                    ).then((response) => {
                        window.localStorage.setItem("token", response.token);
                        navigate("/");
                    })
                    });
                }
            };

    return (
    <form>
        <h2>Please Sign Up to Kickstart Your Dream</h2>
        <div>
                <input type="text" id="username" placeholder="Enter username" onChange={handleChange}
            />
        </div>
        <div>
            <input type="text" id="email" placeholder="Enter email" onChange={handleChange} />
        </div>
        <div>
            <input type="password" id="password" placeholder="Password" onChange={handleChange} />
        </div>
        <button type="submit" onClick={handleSubmit}>Sign up</button>
    </form>
    );
}

export default SignupForm;