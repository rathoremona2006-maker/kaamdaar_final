import React, { useState } from 'react';
import './navbar.css'
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  // === HARDCODED (ACTIVE NOW) ===
  const navigate = useNavigate();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'appIntroduction', label: 'App Introduction • How It Works' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact' },
  ];
  const [active, setActive] = useState('');

  const scrollToSection = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" aria-label="Kaamdaar home">
        <img src={logo}></img>
      </div>
      <ul className="nav-links">
        {navLinks.map(link => (
          <li key={link.id} className={active === link.id ? 'active' : ''} onClick={() => scrollToSection(link.id)}>
            {link.label}
          </li>
        ))}
      </ul>
      
      <button className="nav-cta" onClick={() => navigate("/signup")}>Sign up</button>
    </nav>
  );
};
export default Navbar;

