import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateProject from "../hooks/create-projects";
import updateProject from "../api/update-project";

function UpdateProject(props) {
    const {project} = props;
    const navigate = useNavigate();  
    const [updateProjectData, setUpdateProject] = useState({
        title: project.title,
        description: project.description,
        goal: project.goal,
        reward: project.reward,
        image: project.image,
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setUpdateProject((prevNewProject) => ({
            ...prevNewProject,
            [id]: value,
        }));
        console.log("Project entered:", updateProjectData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const {project, isLoading, error}updateProjectData.title, updateProjectData. = useCreateProject(newProject.title, newProject.description, newProject.goal, newProject.reward, newProject.image)
        // console.log("Project Created:", project);
        updateProject(project.id, updateProjectData)
    .then((res) => {
        navigate(0);

    })
    .catch((error) => {
        console.log('test err----', error)

    });

    }
        
    return (
        <form className="create-project-form" onSubmit={handleSubmit}>
            <h2>Update Your Project</h2>
            
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter project title"
                    value={updateProjectData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    placeholder="Enter project description"
                    value={updateProjectData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="goal">Goal (Amount):</label>
                <input
                    type="number"
                    id="goal"
                    placeholder="Enter funding goal"
                    value={updateProjectData.goal}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="reward">Reward:</label>
                <input
                    type="text"
                    id="reward"
                    placeholder="Enter reward for backers"
                    value={updateProjectData.reward}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="image">Image URL:</label>
                <input
                    type="url"
                    id="image"
                    placeholder="Enter image URL"
                    value={updateProjectData.image}
                    onChange={handleChange}
                    required
                />
            </div>

            

            <button type="submit">Update Project</button>
        </form>
    );
}


export default UpdateProject;