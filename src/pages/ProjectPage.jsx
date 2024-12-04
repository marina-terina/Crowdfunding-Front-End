import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import "./ProjectPage.css"

function ProjectPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id); 
    console.log('testing---project: ', project)

    if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>{error.message}</p>)
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

                <button className="create-pledge-btn">
                Kick This Dream
                </button>

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
        </div>
    );
}

export default ProjectPage;