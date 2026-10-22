import React from 'react';
import './features.css';

import features_one from '../assets/features_one.png';
import features_two from '../assets/features_two.png';
import features_three from '../assets/features_three.png';
import features_four from '../assets/features_four.png';
import features_five from '../assets/features_five.png';
import features_six from '../assets/features_six.png';

const Features = () => {
  const services = [
    {
      id: 'plumbing',
      title: 'Plumbing',
      image: features_one,
      href: '#contact',
    },
    {
      id: 'cleaning',
      title: 'Cleaning',
      image: features_two,
      href: '#contact',
    },
    {
      id: 'electrical',
      title: 'Electrical',
      image: features_three,
      href: '#contact',
    },
    {
      id: 'painting',
      title: 'Painting',
      image: features_four,
      href: '#contact',
    },
    {
      id: 'ac-repair',
      title: 'AC Repair',
      image: features_five,
      href: '#contact',
    },
    {
      id: 'carpentry',
      title: 'Carpentry',
      image: features_six,
      href: '#contact',
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="features-top">
        <span className="features-badge">Our Services</span>

        <h2 className="features-title">
          Everyday Services
          <br />
          <span className="blue">At Your Fingertips</span>
        </h2>

        <p className="features-desc">
          From home maintenance to everyday needs, Kaamdaar brings
          trusted professionals to your doorstep. Book conveniently
          and get your work done hassle-free.
        </p>
      </div>

      <div className="features-grid">
        {services.map((service) => (
          <a
            className="feature-card"
            href={service.href}
            key={service.id}
            aria-label={`Explore ${service.title} services`}
          >
            <div className="feature-card-image">
              <img
                src={service.image}
                alt={`${service.title} service`}
                loading="lazy"
              />
            </div>

            <div className="feature-card-footer">
              <h3>{service.title}</h3>

              <span className="feature-card-arrow" aria-hidden="true">
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Features;