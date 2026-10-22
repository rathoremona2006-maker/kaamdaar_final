
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "features", label: "Services" },
    { id: "appIntroduction", label: "App Introduction • How It Works" },
    { id: "testimonials", label: "Testimonials" },
    { id: "faqs", label: "FAQs" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id) => {
    setActive(id);
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSignup = () => {
    setMenuOpen(false);
    navigate("/signup");
  };

  // Close the drawer with Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Close the drawer when returning to desktop width.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1025px)");

    const handleResize = (event) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <button
          type="button"
          className="nav-logo"
          aria-label="Go to home"
          onClick={() => scrollToSection("home")}
        >
          <img src={logo} alt="Kaamdaar logo" />
        </button>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={active === link.id ? "active" : ""}
            >
              <button
                type="button"
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button className="nav-cta" onClick={handleSignup}>
          Sign up
        </button>

        <button
          type="button"
          className="nav-menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={menuOpen ? "menu-line line-one open" : "menu-line line-one"} />
          <span className={menuOpen ? "menu-line line-two open" : "menu-line line-two"} />
          <span className={menuOpen ? "menu-line line-three open" : "menu-line line-three"} />
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`nav-overlay ${menuOpen ? "visible" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile sliding drawer */}
      <aside
        id="mobile-navigation"
        className={`mobile-nav-drawer ${menuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="mobile-nav-header">
          <img src={logo} alt="Kaamdaar logo" />

          <button
            type="button"
            className="mobile-nav-close"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
        </div>

        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={active === link.id ? "active" : ""}
            >
              <button
                type="button"
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button className="mobile-nav-cta" onClick={handleSignup}>
          Sign up
        </button>
      </aside>
    </>
  );
};

export default Navbar;
