function ProjectPage() {
    // ... existing imports and hooks ...
    const { project, isLoading, error } = useProject(id); 
    
    // Add these console logs to see what data we're receiving
    console.log('Full project data:', project);
    console.log('Project owner/user:', project?.user);
    console.log('Project user_id:', project?.user_id);

    // ... rest of your code ...

    return (
        <div className="project-card-container">
            {/* ... other JSX ... */}
            
            <div className="project-creator">
                <h3>Created By:</h3>
                {/* Try these different options to see which one works */}
                <p>User ID: {project?.user}</p>
                <p>Owner: {project?.owner}</p>
                <p>User_ID: {project?.userId}</p>
            </div>

            {/* ... rest of your JSX ... */}
        </div>
    );
}

export default ProjectPage; 