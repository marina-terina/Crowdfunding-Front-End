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
        // projectCreator: project?.userID || "",
    });
    const [showUpdateForm, setShowUpdateForm ] = useState(false);
    if (isLoading) {
        return (<p>loading...</p>)
    }


    if (error) {
        return (<p>{error.message}</p>)
    }
    const handleUpdate = async (event) => {
        setShowUpdateForm (true)
    };
    

        const handleDelete = (event) => {
            updateProject(
                    id
                ).then((response) => {
                    navigate("/");
            });
    }
    const isOwner = auth.userId === project.owner;
    return (
        
        <div className="project-card-container">
            <div className="projectPage-card">
                {/* Project Image */}
                <img className="projectPage-image"
                    src={project.image} 
                    alt={`Image for ${project.title}`} 
                    
                />
            <div className="project-description"> 
                {/* Project Title */}
                <h2 className="project-title">{project.title}</h2>
                
                {/* Project Description */}
                <p>{project.description}</p> 

                {/* Project Reward */}
                <h3>Reward:</h3>
                <p>{project.reward}</p> 

                {/* Project Goal */}
                <h3>Goal:{project.goal}</h3>
        <br />

                <div className="project-creator">
                    <h3>Created By:</h3>
            {/* {<h3>Created by: {projectCreator.userID}</h3> */}
        </div>
<div className="support-button">
                <Link to ={`/project/${project.id}/pledge`} className="pledge-link">
                <button >
                Kick This Dream
                </button>
                </Link>
                </div>


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
                </div>  
{showUpdateForm ?
<UpdateProject project={project} />
: null}

<div className="support-button">
                {auth.token && isOwner ? (
                    <button className="update-pledge-btn" onClick={handleUpdate}>
                    Update this Dream
                    </button>  
                    ) : null}

                {auth.token && isOwner ? (
                    <button className="delete-pledge-btn" onClick={handleDelete}>
                    Delete this Dream
                    </button>  
                    ) : null}

                
            
</div>  
            </div>
        </div>
    );
}

export default ProjectPage;