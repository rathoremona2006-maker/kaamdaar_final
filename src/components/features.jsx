import React from 'react';
import './features.css';

import features_main from '../assets/features_main.png';
import features_one from '../assets/features_one.png';
import features_two from '../assets/features_two.png';
import features_three from '../assets/features_three.png';
import features_four from '../assets/features_four.png';
import features_five from '../assets/features_five.png';
import features_six from '../assets/features_six.png';

const Features = () => {
  const featuresData = {
    badge: 'KAAMDAAR - Har Kaam Turant',
    title1: 'KAAMDAAR',
    title2: 'Features &',
    titleHighlight: 'Capabilities',
    desc: 'Explore how we connect you with reliable help, instantly. Har Kaam Turant.',
    mainImage: features_main,

    list: [
      {
        id: 'fast_booking',
        image: features_one,
        title: 'Fast & Flexible Booking',
        desc: 'Turant scheduling for immediate or future help.',
        color: 'blue',
      },
      {
        id: 'vetted',
        image: features_two,
        title: 'Vetted Professionals',
        desc: 'Background-checked and skill-validated experts.',
        color: 'orange',
      },
      {
        id: 'tracking',
        image: features_three,
        title: 'Live Provider Tracking',
        desc: 'Watch their arrival in real-time.',
        color: 'blue',
      },
      {
        id: 'pricing',
        image: features_four,
        title: 'Transparent Pricing',
        desc: 'See upfront costs, no hidden surprises.',
        color: 'orange',
      },
      {
        id: 'multi',
        image: features_five,
        title: 'Multi-Category Services',
        desc: 'From home care to vehicle repair.',
        color: 'blue',
      },
      {
        id: 'secure',
        image: features_six,
        title: 'Secure Payments',
        desc: 'Safe, multiple payment options.',
        color: 'orange',
      },
    ],
  };

  return (
    <section className="features-section" id="features">
      <div className="features-top">
        <span className="features-badge">
          {featuresData.badge}
        </span>

        <h2 className="features-title">
          {featuresData.title1}{' '}
          <span className="blue">{featuresData.title2}</span>{' '}
          <span className="orange">
            {featuresData.titleHighlight}
          </span>
        </h2>

        <p className="features-desc">
          {featuresData.desc}
        </p>
      </div>

      <div className="features-content">
        <div className="features-grid">
          {featuresData.list.map((item) => (
            <div
              className={`feature-card feature-card-${item.color}`}
              key={item.id}
              style={{
                backgroundImage: `linear-gradient(
                  180deg,
                  rgba(10, 25, 49, 0.08) 0%,
                  rgba(10, 25, 49, 0.45) 45%,
                  rgba(10, 25, 49, 0.94) 100%
                ), url("${item.image}")`,
              }}
            >
              <div className="feature-card-content">
                {/*<span className="feature-card-label">
                  {item.color === 'blue' ? 'KAAMD AAR' : 'OUR PROMISE'}
                </span>*/}

                <h3>{item.title}</h3>

                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="features-right">
          <div className="blue-blob"></div>

          <img
            src={featuresData.mainImage}
            alt="Kaamdaar App Features"
            className="feature-main-img"
          />

          <div className="info-card">
            <div className="info-icon"></div>

            <div>
              <h4>What is Kaamdaar?</h4>

              <p>
                An all-in-one home services platform connecting you
                with vetted professionals for all your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;