import { Link, useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import "./ProjectPage.css"
import deleteProject from "../api/delete-project";
import updateProject from "../api/update-project.js"
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import { useState, useEffect } from "react";
import UpdateProject from "./UpdateProject.jsx";
import useUser from "../hooks/use-user.js";



function ProjectPage() {
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate(); 
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id); 
    console.log('Project data:', project);
    const userId = project?.user_id;
    console.log('User ID from project:', userId);
    const { user, isLoading: isUserLoading, error: userError } = useUser(userId);
    // console.log('testing---user: ', user);
    console.log('User data:', user);
    console.log('Is user loading:', isUserLoading);
    console.log('Project user_id:', project?.user_id);


    const [formData, setFormData] = useState({
        title: project?.title || "",
        description: project?.description || "",
        goal: project?.goal || "",
        user: project?.user_id || "",
        reward: project?.reward || "",
        image: project?.image || "",
        isOpen: project?.is_open || true,
        // projectCreator: project?.userID || "",
    });
    const [showUpdateForm, setShowUpdateForm ] = useState(false);
    const [creatorName, setCreatorName] = useState(null);
    const [pledgeUsernames, setPledgeUsernames] = useState({});

    useEffect(() => {
        // Fetch creator's username when project data is available
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
        const fetchPledgeUsernames = async () => {
            if (project?.pledges) {
                const usernames = {};
                for (const pledge of project.pledges) {
                    if (!pledge.anonymous) {
                        try {
                            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/public/${pledge.supporter}/`);
                            const data = await response.json();
                            usernames[pledge.supporter] = data.username;
                        } catch (error) {
                            console.error("Error fetching supporter name:", error);
                        }
                    }
                }
                setPledgeUsernames(usernames);
            }
        };

        fetchPledgeUsernames();
    }, [project?.pledges]);

    if (isLoading) {
        return (<p>loading...</p>)
    }


    if (error) {
        return (<p>{error.message}</p>)
    }
    if (userError) {
        return <p>Error loading user: {userError.message}</p>;
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
            {creatorName ? (
                <p>{creatorName}</p>
            ) : (
                <p>Loading creator...</p>
            )}
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
                        <li key={key} className="pledge-item">
                            <div className="pledge-amount">
                                ${pledgeData.amount} from {
                                    pledgeData.anonymous 
                                        ? "Anonymous" 
                                        : (pledgeUsernames[pledgeData.supporter] || "Loading...")
                                }
                            </div>
                            {pledgeData.comment && (
                                <div className="pledge-comment">
                                    "{pledgeData.comment}"
                                </div>
                            )}
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