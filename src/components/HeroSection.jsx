import React from 'react';
import { Link } from "react-router-dom";
import "./HeroSection.css";
import kangarooImage from "../assets/images/Kickaroo.png";
import backgroundVideo from "../assets/video/kickaroo (2).mp4";

function HeroSection() {
    return (
        <div className="hero-section">
            <div className="video-background">
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    onError={(e) => {
                        console.error("Video Error:", e);
                    }}
                >
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="hero-content">
                <p>Join a community of adventurous travelers and supporters who turn dreams into reality.</p>
                <div id="rotate-words">  
                    <div>Kickstart Your dream<br /> </div> 
                    <div>Where the world is yours to explore<br /></div>
                    <div>No journey is too far<br /></div>
                    <div>Achieve your dreams, inspire others<br /> </div>
                </div>

                <Link to="/createProject">
                    <button className='hero-button'>Get Started </button>
                </Link>
            </div>
            <div className="hero-image">
                <img src={kangarooImage} alt="Kickaroo Mascot" />
            </div>
        </div>
    );
}

export default HeroSection;