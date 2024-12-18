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
            Your journey from idea to reality in four simple steps
          </p>
        </header>

        <div className="steps-container">
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-lightbulb"></i>
              <span className="step-number">1</span>
            </div>
            <h3 className="step-title">Create Your Project</h3>
            <p className="step-description">
              Share your creative idea, set your funding goal, and craft compelling 
              rewards that will attract potential backers to your campaign.
            </p>
            <ul className="step-details">
              <li>Define your project scope</li>
              <li>Set achievable funding goals</li>
              <li>Create attractive reward tiers</li>
            </ul>
          </div>

          <div className="step">
            <div className="step-icon">
              <i className="fas fa-rocket"></i>
              <span className="step-number">2</span>
            </div>
            <h3 className="step-title">Launch & Promote</h3>
            <p className="step-description">
              Launch your campaign and spread the word through your network. 
              Use our promotional tools to reach a wider audience.
            </p>
            <ul className="step-details">
              <li>Share on social media</li>
              <li>Engage with your community</li>
              <li>Track campaign metrics</li>
            </ul>
          </div>

          <div className="step">
            <div className="step-icon">
              <i className="fas fa-users"></i>
              <span className="step-number">3</span>
            </div>
            <h3 className="step-title">Get Funded</h3>
            <p className="step-description">
              Watch as backers support your project. Engage with your community 
              and keep them updated on your progress.
            </p>
            <ul className="step-details">
              <li>Receive backer pledges</li>
              <li>Provide regular updates</li>
              <li>Answer backer questions</li>
            </ul>
          </div>

          <div className="step">
            <div className="step-icon">
              <i className="fas fa-gift"></i>
              <span className="step-number">4</span>
            </div>
            <h3 className="step-title">Deliver Rewards</h3>
            <p className="step-description">
              Once funded, bring your project to life and deliver the promised 
              rewards to your loyal backers.
            </p>
            <ul className="step-details">
              <li>Complete your project</li>
              <li>Fulfill reward tiers</li>
              <li>Share project success</li>
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <h3 className="cta-title">Ready to Start Your Project?</h3>
          <p className="cta-description">
            Join thousands of creators who have successfully funded their projects on Kickaroo
          </p>
          <Link to="/createProject">
          <button className="cta-button">Start Your Project</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
