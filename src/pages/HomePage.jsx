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
            <section class="features">
    <div class="feature-card">
      <div class="feature-icon">🚀</div>
      <h3>Wild Ideas Welcome</h3>
      <p>The crazier, the better! We're here for the unconventional dreamers.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🌈</div>
      <h3>Adventure Awaits</h3>
      <p>Be part of extraordinary journeys that push boundaries.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">💫</div>
      <h3>Community Power</h3>
      <p>Connect with fellow adventurers who believe in making magic happen.</p>
    </div>
  </section>    
        <section className ="projects-container">
            <h2><span>Dreams</span> in Motion</h2>
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