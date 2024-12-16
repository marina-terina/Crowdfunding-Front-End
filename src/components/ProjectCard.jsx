import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";
import getProject from "../api/get-project";

function ProjectCard({ projectData }) {
    const [currentAmount, setCurrentAmount] = useState(0);
    const projectLink = `project/${projectData.id}`;
    
    useEffect(() => {
        const fetchProjectAmount = async () => {
            try {
                console.log("Fetching project with ID:", projectData.id);
                const project = await getProject(projectData.id);
                console.log("Project data received:", project);
                
                // Calculate total from pledges array
                const totalAmount = project.pledges?.reduce((sum, pledge) => 
                    sum + Number(pledge.amount), 0) || 0;
                    
                console.log("Calculated total amount:", totalAmount);
                setCurrentAmount(totalAmount);
            } catch (error) {
                console.error("Error fetching project amount:", error);
                setCurrentAmount(0);
            }
        };

        if (projectData.id) {
            fetchProjectAmount();
        }
    }, [projectData.id]);

    // Calculate pledge percentage
    const pledgePercentage = (currentAmount / projectData.goal) * 100;

    return (
        <div className="project-card">
            <Link to={projectLink}>
                <div className="image-container">
                    <img src={projectData.image} alt={projectData.title} />
                </div>
                <h3 className="projectCard-title">{projectData.title}</h3>
            </Link>

            <div className="funding-details">
                <div className="amount-row">
                    <span className="current-amount">
                        ${currentAmount?.toLocaleString()}
                    </span>
                    <span className="goal-amount">
                        of ${projectData.goal?.toLocaleString()}
                    </span>
                </div>

                <div className="progress-container">
                    <div 
                        className="progress-bar" 
                        style={{ width: `${pledgePercentage}%` }}
                    ></div>
                </div>

                <div className="progress-info">
                    <span>{pledgePercentage?.toFixed(1)}% Funded</span>
                </div>
            </div>

            <Link to={projectLink}>
                <button className="support-button">Support This Dream</button>
            </Link>
        </div>
    );
}

export default ProjectCard;