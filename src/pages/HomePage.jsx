import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import HeroSection from '../components/HeroSection';
import "./HomePage.css";


function HomePage() {
    const { projects, isLoading, error } = useProjects();

    //console.log(isLoading)

if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>{error.message}</p>)
    }
    

    return (
    <div>
            <HeroSection />
        <section className ="projects-container">
            <h2>Dreams in Motion</h2>
                <div id ="project-list">
                    {projects.map((projectData, key) => {
                    return <ProjectCard key={key} projectData={projectData} />;
                    })}
                </div>
        </section>
    </div>
);   
}

export default HomePage;