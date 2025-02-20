import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import HeroSection from '../components/HeroSection';



function HomePage() {
    const { projects, isLoading, error } = useProjects();

if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>{error.message}</p>)
    }
    
    return (
    <>
        <HeroSection />
        <section class="features">
        <div class="feature-card">
  <div class="feature-icon">🌍</div>
  <h2>Bold Journeys Ahead</h2>
  <p>The more adventurous, the better! We’re here for those who dare to wander off the beaten path.</p>
</div>
<div class="feature-card">
  <div class="feature-icon">✈️</div>
  <h2>Explore the Unknown</h2>
  <p>Join extraordinary adventures that take you to places beyond imagination.</p>
</div>
<div class="feature-card">
  <div class="feature-icon">🌟</div>
  <h2>Wander with a Tribe</h2>
  <p>Connect with fellow explorers who share your passion for the road less traveled.</p>
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
    </>
);   
}

export default HomePage;