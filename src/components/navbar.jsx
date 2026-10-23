
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../assets/logo.png";

import { getUserCoordinates } from "../utils/getUserLocation";
import { getAddressFromCoordinates } from "../utils/getAddressFromCoordinates";

const Navbar = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [locationQuery, setLocationQuery] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

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

  // Detect location and fill the existing search input.
  const handleDetectLocation = async () => {
    if (locationLoading) return;

    setLocationLoading(true);
    setLocationError("");

    try {
      const { latitude, longitude } = await getUserCoordinates();

      const address = await getAddressFromCoordinates(
        latitude,
        longitude
      );

      setLocationQuery(address);
    } catch (error) {
      console.error("Location detection failed:", error);

      setLocationError(
        error.message || "Unable to detect your location. Please try again."
      );
    } finally {
      setLocationLoading(false);
    }
  };

  const handleLocationChange = (event) => {
    setLocationQuery(event.target.value);
    setLocationError("");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!locationQuery.trim()) {
      setLocationError("Please enter or detect your location.");
      return;
    }

    setLocationError("");

    // Connect the existing service-search/filter logic here.
    // The detected or manually entered address is available in locationQuery.
    console.log("Selected location:", locationQuery.trim());
  };

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1201px)");

    const handleResize = (event) => {
      if (event.matches) setMenuOpen(false);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  // Reused for both desktop and mobile search bars.
  const renderLocationSearch = (mobile = false) => (
    <form
      className={`location-search ${
        mobile ? "location-search-mobile" : ""
      }`}
      onSubmit={handleSearchSubmit}
      role="search"
    >
      <span className="location-search-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </span>

      <input
        type="search"
        aria-label="Search location"
        placeholder="Search your location"
        value={locationQuery}
        onChange={handleLocationChange}
      />

      
      {locationQuery.trim() && !locationLoading ? null : (
        <button
          type="button"
          className="detect-location-btn"
          onClick={handleDetectLocation}
          disabled={locationLoading}
          aria-label="Detect my current location"
          title="Use my current location"
        >
          {locationLoading ? "Detecting..." : "◎ Use my location"}
        </button>
      )}


      {locationError && (
        <p className="location-error" role="alert">
          {locationError}
        </p>
      )}
    </form>
  );

  return (
    <>
      <nav className="navbar">
        {/* 1. Logo */}
        <button
          type="button"
          className="nav-logo"
          aria-label="Go to home"
          onClick={() => scrollToSection("home")}
        >
          <img src={logo} alt="Kaamdaar logo" />
        </button>

        {/* 2. Navigation links */}
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

        {/* 3. Desktop location search */}
        <div className="nav-location">
          {renderLocationSearch()}
        </div>

        {/* 4. Sign up */}
        <button
          type="button"
          className="nav-cta"
          onClick={handleSignup}
        >
          Sign up
        </button>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="nav-menu-toggle"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={
              menuOpen
                ? "menu-line line-one open"
                : "menu-line line-one"
            }
          />
          <span
            className={
              menuOpen
                ? "menu-line line-two open"
                : "menu-line line-two"
            }
          />
          <span
            className={
              menuOpen
                ? "menu-line line-three open"
                : "menu-line line-three"
            }
          />
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`nav-overlay ${menuOpen ? "visible" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile navigation drawer */}
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

        <div className="mobile-nav-location">
          {renderLocationSearch(true)}
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

        <button
          type="button"
          className="mobile-nav-cta"
          onClick={handleSignup}
        >
          Sign up
        </button>
      </aside>
    </>
  );
};

export default Navbar;
