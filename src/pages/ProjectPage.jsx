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
import Footer from "../components/Footer";

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    });
}

function ProjectPage() {
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate(); 
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id); 
    console.log('Project data:', project);
    const userId = project?.user_id;
    console.log('User ID from project:', userId);
    const { user, isLoading: isUserLoading, error: userError } = useUser(userId);
    console.log('User data:', user);
    console.log('Is user loading:', isUserLoading);
    console.log('Project user_id:', project?.user_id);

    console.log('Auth user ID:', auth.userId);
    console.log('Project owner:', project?.owner);
    
    const isOwner = auth.userId === project?.owner;
    console.log('Is owner?', isOwner);

    const [formData, setFormData] = useState({
        title: project?.title || "",
        description: project?.description || "",
        goal: project?.goal || "",
        user: project?.user_id || "",
        reward: project?.reward || "",
        image: project?.image || "",
        isOpen: project?.is_open || true,
    });
    const [showUpdateForm, setShowUpdateForm ] = useState(false);
    const [creatorName, setCreatorName] = useState(null);
    const [pledgeUsernames, setPledgeUsernames] = useState({});

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
    const currentAmount = project?.pledges?.reduce(
        (total, pledge) => total + pledge.amount,
        0
    );

    const pledgePercentage = (currentAmount / project?.goal) * 100;
    
    return (
        <>
            <div className="project-card-container">
                <div class="project-card-header">
                    <div class="project-card-main-content">
                        <img className="projectPage-image"
                            src={project.image} 
                            alt={`Image for ${project.title}`} 
                            
                        />
                        <h2 className="project-title">{project.title}</h2>
                        <p class="project-description">{project.description}</p> 
                        <div className="project-meta">
                        <div className="meta-item">
                    <div className="meta-label">Project Creator:</div>
                    <div className="meta-value">{creatorName ? (
                        <p>{creatorName}</p>
                    ) : (
                        <p>Loading creator...</p>
                    )}
                    </div>
                </div>

                <div className="meta-item">
                    <div className="meta-label">Created at</div>
                    <div className="meta-value">{formatDate(project.date_created)}</div>
                </div>
                <div className="meta-item">
                    <div className="meta-label">Goal Amount:</div>
                    <div className="meta-value">{project.goal}</div>
                </div>
                <div className="meta-item">
                    <div className="meta-label">Status</div>
                    <div className="meta-value">{project.is_open ? "Open" : "Closed"}</div>
                </div>
                </div>
                  <div className="reward-section">   {/* Project Reward */}
                        <h3>Reward:</h3>
                        <p>{project.reward}</p> 
                    </div>

                <div className="support-section">
                    <h3>Support This Project</h3>
                <div className="progress-bar">
                <div className="progress-fill"></div>
                </div>

                <div className="amount-row">
                        <span className="current-amount">
                                ${currentAmount?.toLocaleString()}
                        </span>
                        <span className="goal-amount">
                                of ${project.goal?.toLocaleString()}
                        </span>
                </div>

                        <div className="support-button">
                        <Link to ={`/project/${project.id}/pledge`} className="pledge-link">
                        <p>Kick This Dream</p>
                        </Link>
                        </div>
                </div>
            </div>

            <div class="pledges-section">
                <h2>Recent Pledges</h2>
                    <div className="pledges-card">
                    <div>
                    <ul>
                        {project.pledges.map((pledgeData, key) => (
                            <li key={key} className="pledge-card">
                            <div className="pledge-header">
                        <div className="meta-value">
                                    {pledgeData.anonymous
                        ? "Anonymous"
                        : pledgeUsernames[pledgeData.supporter] || "Loading..."}
                        </div>
                    <div className="pledge-amount">${pledgeData.amount}</div>
                            </div>
                    {pledgeData.comment && <p className="pledge-comment">{pledgeData.comment}</p>}
                            </li>
            ))}
                    </ul>
                    </div>
            </div>
                    

        {showUpdateForm ? (
            <UpdateProject project={project} />
        ) : (
            <div className="owner-support-button">
                {auth.token && isOwner && (  // Make sure both conditions are met
                    <>
                        <button className="update-pledge-btn" onClick={handleUpdate}>
                            Update this Dream
                        </button>
                        <button className="delete-pledge-btn" onClick={handleDelete}>
                            Delete this Dream
                        </button>
                    </>
                )}
            </div>
        )}
            </div>
            </div>
            </div>
            <Footer />
        </>
    );
}

export default ProjectPage;