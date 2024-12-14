import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
const { projectData } = props;
const projectLink = `project/${projectData.id}`;

return (
    <div className="project-card">
    <Link to={projectLink}>
        <img src={projectData.image} />
        <h3>{projectData.title}</h3>
    </Link>
    <p className="project-description">{projectData.description}</p>
    
    
    <Link to={projectLink}>
    <button className="support-button">Support This Dream</button>
    </Link>
    </div>
);
}

export default ProjectCard;