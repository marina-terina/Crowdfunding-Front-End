import { Link, Outlet } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
    return (
        <div className="hero-section">
                <h1>Kickstart Your Dream!</h1>
                <Link to="/createProject">
                <button>Get Started</button>
                </Link>
            
        </div>
    );
}

export default HeroSection;