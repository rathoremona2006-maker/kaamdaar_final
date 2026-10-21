import React from 'react';
import './howItWorks.css';
import howItWorks from '../assets/howItWorks.png';

const HowItWorks = () => {
  const data = {
    badge: "KAAMDAAR - Har Kaam Turant",
    title1: "The KAAMDAAR App",
    title2: "For Everyone",
    desc: "Stay focuses and productive with a clean, clutter-free service experience. Find vetted professionals for home repairs, maintenance, moving, personal services and more — all through one simple app.",
    mainImage: howItWorks,
    points: [
      "Filtering services using matched keywords",
      "Automatically sync in real time",
      "Complete booking tracking with rich details"
    ],
    tags: [
      { text: "Home & Lifestyle Services", active: true },
      { text: "Multi-Category Services", active: false },
      { text: "On-Demand & Emergency", active: false },
      { text: "Secure Payments", active: false }
    ],
    cta: "Discover Now"
  };

  return (
    <section className="howit-section" id="howitworks">
      <div className="howit-container">
        
      
        <div className="howit-left">
          <div className="howit-image-wrap">
            <img src={data.mainImage} alt="Kaamdaar App" className="howit-main-img" />
          </div>
        </div>

  
        <div className="howit-right">
          <span className="howit-badge">
            KAAMDAAR - <span className="orange-text">Har Kaam Turant</span>
          </span>

          <h2 className="howit-title">
            {data.title1} <br />
            <span className="gradient-text">{data.title2}</span>
          </h2>

          <p className="howit-desc">{data.desc}</p>

          <div className="howit-points">
            {data.points.map((point, i) => (
              <div className="point" key={i}>
                <div className="point-icon">
                  {i === 0 && "✔"}
                  {i === 1 && "↻"}
                  {i === 2 && "☰"}
                </div>
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="howit-tags">
            {data.tags.map((tag, i) => (
              <span key={i} className={`tag ${tag.active ? 'active' : ''}`}>
                {tag.text}
              </span>
            ))}
          </div>

          <button className="howit-cta">{data.cta}</button>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;