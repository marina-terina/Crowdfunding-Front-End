import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">How Kickaroo Works</h2>
          <p className="section-subtitle">
            Your journey from dream destination to reality in four simple steps
          </p>
        </header>

        <div className="steps-container">
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-lightbulb"></i>
              <span className="step-number">1</span>
            </div>
            <h3 className="step-title">Plan Your Trip</h3>
            <p className="step-description">
              Share your travel dream, set your funding goal, and create exciting rewards to inspire fellow travelers to support your journey.
            </p>
            <ul className="step-details">
              <li>Choose your dream destination</li>
              <li>Set achievable funding targets</li>
              <li>Design unique reward packages for your backers</li>
            </ul>
          </div>

          <div className="step">
            <div className="step-icon">
              <i className="fas fa-rocket"></i>
              <span className="step-number">2</span>
            </div>
            <h3 className="step-title">Launch & Share</h3>
            <p className="step-description">
              Start your campaign and share it with your community. Use Kickaroo’s tools to connect with passionate travelers who’ll help you make your trip possible.
            </p>
            <ul className="step-details">
              <li>Share on social media</li>
              <li>Connect with fellow explorers</li>
              <li>Monitor your campaign’s progress</li>
            </ul>
          </div>

          <div className="step">
            <div className="step-icon">
              <i className="fas fa-users"></i>
              <span className="step-number">3</span>
            </div>
            <h3 className="step-title">Get Funded</h3>
            <p className="step-description">
              See how travelers and adventurers back your journey. Keep them engaged with updates and inspire them to join your adventure.
            </p>
            <ul className="step-details">
              <li>Receive support from fellow travelers</li>
              <li>Provide regular trip updates</li>
              <li>Answer questions and share travel tips</li>
            </ul>
          </div>

          <div className="step">
            <div className="step-icon">
              <i className="fas fa-gift"></i>
              <span className="step-number">4</span>
            </div>
            <h3 className="step-title">Embark & Share Your Adventure</h3>
            <p className="step-description">
              Once funded, set off on your adventure and share your experiences with your supporters. Deliver the rewards and keep your backers updated along the way.
            </p>
            <ul className="step-details">
              <li>Travel to your dream destination</li>
              <li>Fulfill your reward promises</li>
              <li>Share your travel success story</li>
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <h3 className="cta-title">Ready to Start Your Travel Adventure?</h3>
          <p className="cta-description">
            Join the growing community of explorers who’ve funded their dream trips with Kickaroo
          </p>
          <Link to="/createProject">
            <button className="cta-button">Start Your Journey</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

