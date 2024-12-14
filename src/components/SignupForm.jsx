import { useState } from "react";
import postSignup from "../api/post-signup.js";
import postLogin from "../api/post-login.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";

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
                    // Attempt sign-up
                    await postSignup(
                        credentials.username,
                        credentials.email,
                        credentials.password
                    );
    
                    // If sign-up is successful, log in the user
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
                    navigate("/"); // Redirect to the home page
                } catch (error) {
                    // Handle errors (e.g., username or email already exists)
                    if (error.response && error.response.status === 409) {
                        setError(error.response.data.message); // Display backend error message
                    } else {
                        setError("Email is already registered. Please log in or use another email. ");
                    }
                }
            } else {
                setError("All fields are required."); // Validation error
            }
        };
    
        return (
            <form>
                <h2>Please Sign Up to Kickstart Your Dream</h2>
                {error && <div className="error-message">{error}</div>} {/* Display error messages */}
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
    // const handleSubmit = (event) => {
    //             event.preventDefault();
    //             if (credentials.username && credentials.password) {
    //                 postSignup(
    //                     credentials.username,
    //                     credentials.email,
    //                     credentials.password
    //                 ).then((response) => {
    //                     console.log(response);
    //                 postLogin(
    //                     credentials.username,
    //                     credentials.password,
    //                 ).then((response) => {
    //                     window.localStorage.setItem("token", response.token);
    //                     navigate("/");
    //                 })
                
    //                 });
    //             }
    //         };

//     return (
//     <form>
//         <h2>Please Sign Up to Kickstart Your Dream</h2>
//         <div>
//                 <input type="text" id="username" placeholder="Enter username" onChange={handleChange}
//             />
//         </div>
//         <div>
//             <input type="text" id="email" placeholder="Enter email" onChange={handleChange} />
//         </div>
//         <div>
//             <input type="password" id="password" placeholder="Password" onChange={handleChange} />
//         </div>
//         <button type="submit" onClick={handleSubmit}>Sign up</button>
//     </form>
//     );
// }

// export default SignupForm;