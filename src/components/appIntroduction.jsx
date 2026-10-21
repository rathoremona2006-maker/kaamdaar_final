import React from 'react';
import './appIntroduction.css';
import app_intro from '../assets/app_intro.png'

const AppIntroduction = () => {
  // === HARDCODED (ACTIVE NOW) ===
  const data = {
    badge: "APP INTRODUCTION",
    title: "The KAAMDAAR App",
    highlight: "For Everyone",
    desc: "A unified platform connecting people and professionals in need of fast and reliable help.",
    phoneImg: app_intro,
    cardTitle: "What is Kaamdaar?",
    cardDesc: "Kaamdaar is your one-stop solution for all local services. From fixing a leak to finding a painter, we connect you instantly.",
    stats: [
      { icon: "/images/icon-home.png", label: "Home Services" },
      { icon: "/images/icon-vehicle.png", label: "Vehicle Care" }
    ]
  };

  return (
    <section className="appIntroduction">
      <div className="app-phone">
        <img src={data.phoneImg} alt="Kaamdaar App" />
      </div>
      <div className="app-content">
        <span className="badge">{data.badge}</span>
        <h2>{data.title} <br/> <span className="gradient">{data.highlight}</span></h2>
        <p>{data.desc}</p>
        <div className="app-card">
          <h4>{data.cardTitle}</h4>
          <p>{data.cardDesc}</p>
        </div>
      </div>
    </section>
  );
};
export default AppIntroduction;