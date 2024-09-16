import React from 'react';
import lightLogo from './pics/lightlogo.png';

import './MuseumComponent.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={lightLogo} alt="Museum Sathi Logo" />
        </div>
        <div className="footer-brand">
          <h1>Museum Sathi</h1>
          <p>Effortlessly book museum tickets online<br /> and unlock a world of art,<br /> history, and culture instantly.</p>
        </div>
        <div className="footer-nav">
          <h3>Sitemap</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Visit</a></li>
            <li><a href="#">Exhibits</a></li>
            <li><a href="#">Programs & Events</a></li>
            <li><a href="#">Store</a></li>
          </ul>
        </div>
        <div className="footer-connect">
          <h3>Connect</h3>
          <ul className="social-icons">
            <li><a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#" className="social-icon"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#" className="social-icon"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
          <p>Email: <a href="mailto:info@museumsathi.com" style={{ color: '#fff' }}>info@museumsathi.com</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Museum Sathi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;