import React, { useState } from 'react';
import './contact.css';
import contact from '../assets/contact.png';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message Sent! Thanks ${form.name}`);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-badge">KAAMDAAR • GET IN TOUCH</div>
      <h1 className="contact-title">Contact <span>Us</span></h1>

      <div className="contact-card">
  
        <div className="contact-left">
          <img src={contact} alt="Get In Touch" className="team-img" />
          <h2>GET IN TOUCH</h2>
          
          <div className="info-list">
            <div className="info-item">
              <span className="info-icon">📞</span>
              <span># +91 123 456 7890</span>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <span>support@kaamdaar.com</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📷</span>
              <span>@kaamdaar</span>
            </div>
            <div className="info-item">
              <span className="info-icon">f</span>
              <span>/kaamdaar</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <span>123 Service Hub, Jaipur, Rajasthan, India</span>
            </div>
            <div className="info-slogan">Har Kaam Turant.</div>
          </div>
        </div>

    
        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            ></textarea>

            <button type="submit" className="send-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}