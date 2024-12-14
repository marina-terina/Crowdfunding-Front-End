import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateProject from "../hooks/create-projects";
import createProject from "../api/create-project";
import "./CreateProject.css";

function CreateProject() {
    const navigate = useNavigate();  
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        goal: "",
        reward: "",
        image: "",
    });

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
        <form className="create-project-form" onSubmit={handleSubmit}>


            <h2>Create Your Project</h2>
            
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter project title"
                    value={newProject.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    placeholder="Enter project description"
                    value={newProject.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="goal">Goal (Amount):</label>
                <input
                    type="number"
                    id="goal"
                    placeholder="Enter funding goal"
                    value={newProject.goal}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="reward">Reward:</label>
                <input
                    type="text"
                    id="reward"
                    placeholder="Enter reward for backers"
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

            

            <button type="submit">Create Project</button>
        </form>
    );
}


export default CreateProject;