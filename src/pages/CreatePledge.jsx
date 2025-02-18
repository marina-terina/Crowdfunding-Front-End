import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postPledge } from "../api/post-pledge";
import useAuth from "../hooks/use-auth";
import confetti from 'canvas-confetti';
import useProject from "../hooks/use-project";
import Footer from "../components/Footer";

function CreatePledge() {
    const { auth } = useAuth();
    const navigate = useNavigate();  
    const { projectId } = useParams();
    const { project, isLoading, error } = useProject(projectId);
    const [creatorName, setCreatorName] = useState(null);
    const [formData, setFormData] = useState({
        amount: "",
        comment: "",
        isAnonymous: false,
        reward: false,
        projectId: "",
    });
    const [showThankYou, setShowThankYou] = useState(false);

    useEffect(() => {
        const fetchCreatorName = async () => {
            if (project?.owner) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/public/${project.owner}/`);
                    const data = await response.json();
                    setCreatorName(data.username);
                } catch (error) {
                    console.error("Error fetching creator name:", error);
                }
            }
        };

        fetchCreatorName();
    }, [project?.owner]);

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

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await postPledge(
                formData.amount,
                formData.comment,
                formData.isAnonymous,
                formData.reward,
                projectId
            );
            triggerConfetti();
            setShowThankYou(true);
        } catch (error) {
            console.error("Error creating pledge:", error);
        }
    };

    // Render different content based on conditions
    let content;

    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (error) {
        content = <div>Error loading project: {error.message}</div>;
    } else if (!project) {
        content = <div>Project not found</div>;
    } else if (!auth.token) {
        content = (
            <div className="login-message">
                <h2>Oops! Almost there!</h2>
                <p>You're just one step away from supporting something amazing! But first, we need you to log in. Don't worry—if you prefer, you can still pledge anonymously! Log in now and let's make your pledge count! </p>
                <button onClick={() => navigate('/login')}>Go to Login</button>
                <p className="signup-prompt">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
            </div>
        );
    } else if (showThankYou) {
        content = (
            <div className="thank-you-message">
                <h2>Thank You for Your Support! 🎉</h2>
                <p>Your pledge means the world to us!</p>
                <div className="navigation-links">
                    <Link to={`/project/${projectId}`} className="back-to-project">
                        Back to Project
                    </Link>
                    <Link to="/" className="back-to-home">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    } else {
        content = (
            <form className="create-pledge-form" onSubmit={handleSubmit}>
                <div className="pledge-header">
                    <h2 className="pledge-title">Make a Pledge</h2>
                </div>
                <div className="project-section">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-created">Created by: {creatorName}</p> 
                </div>
                <div className="pledge-reward-section">
                    <h3>Reward:</h3>
                    <p>{project.reward}</p> 
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Pledge Amount ($):</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment (Optional):</label>
                    <textarea
                        id="comment"
                        placeholder="Leave a message of support..."
                        value={formData.comment}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            id="isAnonymous"
                            checked={formData.isAnonymous}
                            onChange={handleChange}
                        />
                        Make my pledge anonymous
                    </label>
                </div>
                <div className="checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            id="reward"
                            checked={formData.reward}
                            onChange={handleChange}
                        />
                        I would like to receive the reward for this tier
                    </label>
                </div>

                <button type="submit">Submit Pledge</button>
            </form>
        );
    }

    return (
        <>
            {content}
            <Footer />
        </>
    );
}

export default CreatePledge;