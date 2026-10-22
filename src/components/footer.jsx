import React from 'react';
import './footer.css';
import white_logo from '../assets/white_logo.png';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="ft-water left-water" />
      <div className="ft-water right-water" />

      <div className="footer-top">
        <a href="#home" className="ft-logo">
          <img src={white_logo} alt="Kaamdaar - Har Kaam Turant" />
        </a>

        <nav className="footer" aria-label="Footer navigation">
          <a className="footer-links" href="#about">
            About us
          </a>

          <a className="footer-links" href="#terms">
            Terms &amp; Conditions
          </a>

          <a className="footer-links" href="#privacy">
            Privacy Policy
          </a>

          <a className="footer-links" href="#privacy">
            Careers
          </a>
          
          <a className="footer-links" href="#privacy">
            Anti Discrimination Policies
          </a>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Kaamdaar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;