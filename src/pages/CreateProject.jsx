import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import useCreateProject from "../hooks/create-projects";
import createProject from "../api/create-project";
import "./CreateProject.css";
import useAuth from "../hooks/use-auth";
import Footer from "../components/Footer";

function CreateProject() {
    const { auth } = useAuth();
    const navigate = useNavigate();  
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        goal: "",
        reward: "",
        image: "",
    });

    if (!auth.token) {
        return (
            <div className="login-message">
                <h2>Oops! Almost there!</h2>
                <p>You're just one step away from bringing your dream to life! But first, we need you to log in. Go ahead, log in and let's make it happen!  </p>
                <button onClick={() => navigate('/login')}>Go to Login</button>
                <p className="signup-prompt">
                Don't have an account? <Link to="/signup">Sign Up Here</Link>
            </p>
            </div>
        );
    }
    const handleChange = (event) => {
        const { id, value } = event.target;
        setNewProject((prevNewProject) => ({
            ...prevNewProject,
            [id]: value,
        }));
        console.log("Project entered:", newProject);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const {project, isLoading, error} = useCreateProject(newProject.title, newProject.description, newProject.goal, newProject.reward, newProject.image)
        // console.log("Project Created:", project);
        createProject(newProject.title, newProject.description, newProject.goal, newProject.reward, newProject.image, true)
    .then((res) => {
        navigate("/");

    })
    .catch((error) => {
        console.log('test err----', error)

    });

    }
        
    return (
        <div className="create-project-container">
        <form className="create-project-form" onSubmit={handleSubmit}>


            <h2>Create Your Dream Project</h2>
            
            <div className="form-group">
                <label htmlFor="title">Project Title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter your project title"
                    value={newProject.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Project Description:</label>
                <textarea
                    id="description"
                    placeholder="Describe your amazing project"
                    value={newProject.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="goal">Funding Goal (Amount):</label>
                <input
                    type="number"
                    id="goal"
                    placeholder="$ Enter amount"
                    value={newProject.goal}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="reward">Reward Description:</label>
                <input
                    type="text"
                    id="reward"
                    placeholder="What will supporter receive"
                    value={newProject.reward}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="image">Image URL:</label>
                <input
                    type="url"
                    id="image"
                    placeholder="Enter image URL"
                    value={newProject.image}
                    onChange={handleChange}
                    required
                />
            </div>

            

            <button className = "createProject-button" type="submit">Kickstart Your Dream Project</button>
        </form>
        <Footer />
        </div>
    );
}


export default CreateProject;