import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from 'react-router-dom';

import Navbar from './components/navbar.jsx';
import Hero from './components/hero.jsx';
import Features from './components/features.jsx';
import AppIntroduction from './components/appIntroduction.jsx';
import HowItWorks from './components/howItWorks.jsx';
import Testimonials from './components/testimonial.jsx';
import Faqs from './components/faqs.jsx';
import Contact from './components/contact.jsx';
import Download from './components/download.jsx';
import Footer from './components/footer.jsx';

import VerificationCred from './components/verification_cred.jsx';
import OtpMobile from './components/otp_mobile.jsx';
import OtpEmail from './components/otp_email.jsx';
import Profile from './components/profile.jsx';

import './App.css';

const Home = () => (
  <>
    <section id="home">
      <Hero />
    </section>

    <section id="features">
      <Features />
    </section>

    <section id="appIntroduction">
      <AppIntroduction />
    </section>

    <section id="howItWorks">
      <HowItWorks />
    </section>

    <section id="testimonials">
      <Testimonials />
    </section>

    <section id="faqs">
      <Faqs />
    </section>

    <section id="contact">
      <Contact />
    </section>

    <section id="download">
      <Download />
    </section>
  </>
);

// Har route change par page ke top par le jaata hai.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Website sections ke existing scroll animations.
const ScrollReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionSelectors = [
      '.features-section',
      '.appIntroduction',
      '.howit-section',
      '.faqs-section',
      '.contact-section',
      '.download-section',
    ];

    const sections = sectionSelectors.flatMap((selector) =>
      Array.from(document.querySelectorAll(selector))
    );

    sections.forEach((section) => {
      section.classList.remove('is-visible');
    });

    document.documentElement.classList.add('motion-ready');

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => {
        section.classList.add('is-visible');
      });

      return () => {
        document.documentElement.classList.remove('motion-ready');
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, [pathname]);

  return null;
};

// Sirf main website ka layout.
// Website Navbar aur Footer yahin render honge.
const WebsiteLayout = () => {
  return (
    <div className="app-container">
      <ScrollReveal />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

// Signup pages apna header/footer khud render karte hain.
// Is layout mein main website Navbar/Footer nahi hain.
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Main website routes */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route
            path="/app-introduction"
            element={<AppIntroduction />}
          />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/download" element={<Download />} />

          {/* Unknown website routes */}
          <Route path="*" element={<Home />} />
        </Route>

        {/* Signup flow — separate layout */}
        <Route path="/signup" element={<VerificationCred />} />
        <Route
          path="/signup/verify-mobile"
          element={<OtpMobile />}
        />
        <Route
          path="/signup/verify-email"
          element={<OtpEmail />}
        />
        <Route
          path="/signup/profile"
          element={<Profile />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
