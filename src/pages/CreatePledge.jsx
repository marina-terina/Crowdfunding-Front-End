import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postPledge } from "../api/post-pledge";
import "./CreatePledge.css";
import { useEffect } from "react";
import useAuth from "../hooks/use-auth";

function CreatePledge() {
    const { auth } = useAuth();
    const navigate = useNavigate();  
    const { projectId } = useParams();

    if (!auth.token) {
        return (
            <div className="login-message">
                <h2>Oops! Almost there!d</h2>
                <p>You're just one step away from supporting something amazing! But first, we need you to log in. Don’t worry—if you prefer, you can still pledge anonymously! Log in now and let’s make your pledge count! </p>
                <button onClick={() => navigate('/login')}>Go to Login</button>
                <p className="signup-prompt">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
            </div>
        );
    }
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [formData, setFormData] = useState({
        amount: "",
        comment: "",
        isAnonymous: false,
        reward: false,
        projectId: "",
    });

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (!token) {
            setIsLoggedIn(false); // Update state to show login message
        }
    }, []);

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await postPledge(formData.amount,formData.comment, formData.isAnonymous, formData.reward, projectId)
            // .then(res => {console.log({res})})
            // .catch(e => {console.log({e})})

        navigate (`/project/${projectId}`);
        
    };

return (
    <form className="create-pledge-form" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="amount">Amount:</label>
            <input
                type="number"
                id="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="comment">Comment:</label>
            <textarea
                id="comment"
                placeholder="Add a comment (optional)"
                value={formData.comment}
                onChange={handleChange}
            ></textarea>
        </div>
        <div>
            <label>
                <input
                    type="checkbox"
                    id="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleChange}
                />
                Make this pledge anonymous
            </label>
        </div>
        <div>
            <label>
                <input
                    type="checkbox"
                    id="reward"
                    checked={formData.reward}
                    onChange={handleChange}
                />
                Accept reward
            </label>
        </div>

        <button type="submit">Submit Pledge</button>
    </form>
);
}

export default CreatePledge;