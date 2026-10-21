import React from 'react';
import './testimonial.css';

import profile_one from '../assets/profile_one.jpg';
import profile_two from '../assets/profile_two.png';
import profile_three from '../assets/profile_three.png';

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: 'Aisha',
      location: 'Lahore',
      image: profile_one,
      className: 't-card-1',
      review:
        'Vetted electrician fixed my *Turant*! Safe and efficient. Har Kaam Har Kaam Turant!',
    },
    {
      id: 2,
      name: 'Rahul',
      location: 'Dubai',
      image: profile_two,
      className: 't-card-2',
      review: 'Best moving service! Easy to book. Reliable pros.',
    },
    {
      id: 3,
      name: 'Sarah',
      location: 'Noida',
      image: profile_three,
      className: 't-card-3',
      review:
        'Cleaning lady was amazing. Tracked her arrival. Vetted quality.',
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="t-header">
        <span className="t-badge">KAAMDAAR • REAL STORIES</span>

        <h2>
          Trusted by Our <span>Community</span>
        </h2>

        <p>Real Stories from Vetted Kaamdaar Users</p>
      </div>

      <div className="t-body">
        <div className="t-cards-area">
          <div className="watercolor"></div>

          {testimonials.map((item, index) => (
            <article
              className={`t-card ${item.className}`}
              key={item.id}
              style={{ '--card-index': index }}
            >
              <div className="blue-corner"></div>

              <div className="t-user">
                <img src={item.image} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>
                  <small>{item.location}</small>
                </div>
              </div>

              <div
                className="t-stars"
                aria-label="5 out of 5 stars"
              >
                ★★★★★
              </div>

              <p>{item.review}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="t-slogan">Har Kaam Turant</div>
    </section>
  );
}