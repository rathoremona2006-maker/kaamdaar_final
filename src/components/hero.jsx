
import React from 'react';
import './hero.css';
import hero_image from '../assets/hero_image.png';

const Hero = () => {
  const heroData = {
    badge: "KAAMDAAR - Har Kaam Turant",
    title1: "Simplifying Local Services.",
    title2: "Get Trusted Help.",
    titleHighlight: "Har Kaam Turant",
    desc: "Connect with vetted professionals for home repairs, maintenance, moving, personal services, and more. Skip the hassle and get things done, immediately.",
    image: hero_image,
    cta1: "Book Now",
    cta2: "Explore Services",
    trust1: "100% Verified Professionals",
    trust2: "Instant Booking & Payment"
  };

  return (
    <section className="hero">
      <div className="hero-water water1"></div>
      <div className="hero-water water2"></div>
      <div className="hero-water water3"></div>

      <div className="hero-content">
        <div className="hero-left">
          <span className="badge">{heroData.badge}</span>

          <h1>
            {heroData.title1} <br />
            {heroData.title2} <br />
            <span className="orange">{heroData.titleHighlight}</span>
          </h1>

          <p>{heroData.desc}</p>

          <div className="hero-btns">
            <button className="primary">{heroData.cta1}</button>
            <button className="secondary">{heroData.cta2}</button>
          </div>

          <div className="trust">
            <span>✓ {heroData.trust1}</span>
            <span>✓ {heroData.trust2}</span>
          </div>
        </div>

        <div className="hero-right">
          <img src={heroData.image} alt="App" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
