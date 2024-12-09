import { Link, useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import "./ProjectPage.css"
import deleteProject from "../api/delete-project";
import updateProject from "../api/update-project.js"
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import { useState } from "react";
import UpdateProject from "./UpdateProject.jsx";


function ProjectPage() {
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate(); 
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id); 
    console.log('testing---project: ', project)

    const [formData, setFormData] = useState({
        title: project?.title || "",
        description: project?.description || "",
        goal: project?.goal || "",
        reward: project?.reward || "",
        image: project?.image || "",
        isOpen: project?.is_open || true,
    });

    if (isLoading) {
        return (<p>loading...</p>)
    }


    if (error) {
        return (<p>{error.message}</p>)
    }
    const handleUpdate = async (event) => {
        event.preventDefault(); // Prevent form submission default behavior
    
        try {
            await updateProject(id, formData);
            console.log("Project updated successfully");
            navigate(`/project/${id}`); //Redirect to the updated project page
        } catch (error) {
            console.error("Error updating project:", error);
            alert("Failed to update the project. Please try again.");
        }
    };
    

        const handleDelete = (event) => {
            updateProject(
                    id
                ).then((response) => {
                    navigate("/");
            });
    }
    
    return (
        <div className="project-card-container">
            <div className="project-card">
                {/* Project Image */}
                <img 
                    src={project.image} 
                    alt={`Image for ${project.title}`} 
                    className="project-image"
                />
                
                {/* Project Title */}
                <h2 className="project-title">{project.title}</h2>
                
                {/* Project Description */}
                <h3>Description:</h3>
                <p>{project.description}</p> 

                {/* Project Reward */}
                <h3>Reward:</h3>
                <p>{project.reward}</p> 

                {/* Project Goal */}
                <h3>Goal:</h3>
                <p>{project.goal}</p> 

                <Link to ={`/project/${project.id}/pledge`} className="pledge-link">
                <button className="create-pledge-btn">
                Kick This Dream
                </button>
                </Link>
                <div className="project-info">
                    <h3>Created at: {project.date_created}</h3>
                    <h3>{`Status: ${project.is_open ? "Open" : "Closed"}`}</h3>
                </div>
                
                <div className="pledges-section">
                <h3>Pledges:</h3>
                <ul>
                    {project.pledges.map((pledgeData, key) => (
                        <li key={key}>
                            {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                    ))}
                </ul>
                </div>

<UpdateProject project={project} />



                {auth.token ? (
                    <button className="update-pledge-btn" onClick={handleUpdate}>
                    Update this Dream
                    </button>  
                    ) : null}

                {auth.token ? (
                    <button className="delete-pledge-btn" onClick={handleDelete}>
                    Delete this Dream
                    </button>  
                    ) : null}

                
            
               
            </div>
        </div>
    );
}

export default ProjectPage;