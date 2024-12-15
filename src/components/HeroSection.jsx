import { Link, Outlet } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
    return (
        <div className="hero-section">
                <div id="rotate-words">  
<div>Kickstart Your dream<br /> </div> 
<div>Here, big dreams take flight<br /></div>
<div>We can turn the impossible into achievable.<br/></div>
<div>Achieve your dreams, inspire others<br /> </div>
</div>
       
                <Link to="/createProject">
                <button>Get Started</button>
                </Link>
            
       
        </div>
    );
}

export default HeroSection;