import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">About Kickaroo</h3>
          <p className="footer-text">
            Empowering creators to bring their projects to life through community support.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/how-it-works">How It Works</a></li>
            <li><a href="/discover">Discover Projects</a></li>
            <li><a href="/start-project">Start a Project</a></li>
            <li><a href="/success-stories">Success Stories</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Support</h3>
          <ul className="footer-links">
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/guidelines">Community Guidelines</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/trust-safety">Trust & Safety</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Connect</h3>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
              <span className="social-name">Instagram</span>
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
              <span className="social-name">Facebook</span>
            </a>
            <a href="#" className="social-link" aria-label="TikTok">
              <i className="fab fa-tiktok"></i>
              <span className="social-name">TikTok</span>
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
              <span className="social-name">YouTube</span>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
              <span className="social-name">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {currentYear} Kickaroo. All rights reserved. Created by Marina Terina 
          </p>
          <div className="legal-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="/terms">Terms of Service</a>
            <span className="separator">•</span>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;