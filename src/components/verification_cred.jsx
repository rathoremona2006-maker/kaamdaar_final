import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './verification_cred.css';
import logo from '../assets/logo.png';

// API integration — backend ready hone par enable karna
// import { API_ROUTES } from '../api/api';

const PREVIEW_MODE = true;

const VerificationCred = () => {
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const cleanedMobile = mobile.replace(/\D/g, '');

    if (cleanedMobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const registrationDraft = {
      country_code: countryCode,
      mobile: cleanedMobile,
      verificationMethod: 'mobile',
    };

    // Save the first screen's data for the next screens.
    sessionStorage.setItem(
      'kaamdaar_registration_draft',
      JSON.stringify(registrationDraft)
    );

    // PREVIEW MODE — active for now; no API call.
    if (PREVIEW_MODE) {
      navigate('/signup/verify-mobile', {
        state: {
          draft: registrationDraft,
          maskedDestination: `${countryCode} ${cleanedMobile}`,
          previewMode: true,
        },
      });

      return;
    }

    /*
    // DYNAMIC API INTEGRATION — enable when backend is ready.
    setLoading(true);

    try {
      const response = await fetch(API_ROUTES.auth.requestOtp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationDraft),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Unable to send OTP.');
      }

      navigate('/signup/verify-mobile', {
        state: {
          draft: registrationDraft,
          maskedDestination: `${countryCode} ${cleanedMobile}`,
          previewMode: false,
          requestId: data.requestId || data.data?.requestId,
        },
      });
    } catch (err) {
      setError(err.message || 'Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <div className="signup-page">
      {/* Navbar */}
      <header className="signup-navbar">
        <div className="nav-logo" aria-label="Kaamdaar home">
                <img src={logo}></img>
        </div>

        <nav className="signup-nav-links">
          <Link to="/" className="signup-home-link">
            Home
          </Link>

          <Link to="/login" className="signup-login-button">
            Login
          </Link>
        </nav>
      </header>

      {/* Create Account */}
      <main className="signup-main">
        <section className="signup-card">
          <div className="signup-card-brand" aria-hidden="true">
            <img src={logo}></img>
          </div>

          <h1>Create an Account</h1>

          <form onSubmit={handleSubmit} noValidate>
            <label className="signup-field-label" htmlFor="mobile">
              Enter Your Mobile Number
            </label>

            <div className="signup-mobile-input">
              <span className="signup-india-flag" aria-hidden="true">
                🇮🇳
              </span>

              <select
                aria-label="Country code"
                value={countryCode}
                onChange={(event) => setCountryCode(event.target.value)}
                disabled={loading}
              >
                <option value="+91">+91</option>
              </select>

              <span className="signup-input-divider" />

              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(event) =>
                  setMobile(
                    event.target.value.replace(/\D/g, '').slice(0, 10)
                  )
                }
                maxLength={10}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <p className="signup-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              onClick={()=>navigate("/signup/verify-mobile")}
              className="signup-primary-button"
              disabled={loading}
            >
              {loading ? 'Please wait...' : 'Continue'}
              {!loading && <span aria-hidden="true">→</span>}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default VerificationCred;