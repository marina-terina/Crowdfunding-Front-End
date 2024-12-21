import { Link } from "react-router-dom";
import "./HeroSection.css";
import kangarooImage from "../assets/images/Kickaroo.png";

function HeroSection() {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <p>Join a community of fearless creators and backers who dare to make the impossible possible.</p>
                <div id="rotate-words">  
                    <div>Kickstart Your dream<br /> </div> 
                    <div>Here, big dreams take flight<br /></div>
                    <div>No idea is too wild, no dream too bizarre!<br/></div>
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