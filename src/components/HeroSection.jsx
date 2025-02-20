import { Link } from "react-router-dom";
import "./HeroSection.css";
import kangarooImage from "../assets/images/Kickaroo.png";

function HeroSection() {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <p>Join a community of adventurous travelers and supporters who turn dreams into reality.</p>
                <div id="rotate-words">  
                    <div>Kickstart Your dream<br /> </div> 
                    <div>Where the world is yours to explore<br /></div>
                    <div>No journey is too far<br /></div>
                    <div>Achieve your dreams, inspire others<br /> </div>
                </div>

                <Link to="/createProject">
                    <button className="cta-link">Get Started</button>
                </Link>
            </div>
            <div className="hero-image">
                <img src={kangarooImage} alt="Kickaroo Mascot" />
            </div>
        </div>
    );
}

export default HeroSection;