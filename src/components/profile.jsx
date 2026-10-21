import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../api/api';
import './profile.css';
import logo from '../assets/logo.png';

const getSavedDraft = () => {
  try {
    const saved = sessionStorage.getItem('kaamdaar_registration_draft');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
];

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [draft] = useState(
    () => location.state?.draft || getSavedDraft()
  );

  const [verificationToken] = useState(
    () =>
      location.state?.verificationToken ||
      sessionStorage.getItem('kaamdaar_verification_token') ||
      ''
  );

  const [formData, setFormData] = useState({
    full_name: '',
    last_name: '',
    age: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!draft?.mobile || !draft?.country_code || !verificationToken) {
      navigate('/signup', { replace: true });
    }
  }, [draft, verificationToken, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === 'pincode' ? value.replace(/\D/g, '').slice(0, 6) : value,
    }));

    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const {
      full_name,
      last_name,
      age,
      address,
      city,
      state,
      pincode,
    } = formData;

    if (
      !full_name.trim() ||
      !last_name.trim() ||
      !age ||
      !address.trim() ||
      !city.trim() ||
      !state ||
      !pincode
    ) {
      setError('Please fill in all the required fields.');
      return;
    }

    const numericAge = Number(age);

    if (!Number.isInteger(numericAge) || numericAge < 18 || numericAge > 100) {
      setError('Please enter a valid age between 18 and 100.');
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }

    if (!verificationToken) {
      setError('Your verification session has expired. Please sign up again.');
      return;
    }

    const registrationData = {
      ...draft,
      full_name: full_name.trim(),
      last_name: last_name.trim(),
      age: numericAge,
      address: address.trim(),
      city: city.trim(),
      state,
      pincode,
      verificationMethod: 'mobile',
      verificationToken,
    };

    setLoading(true);

    try {
      const response = await fetch(API_ROUTES.auth.registerCustomer, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${verificationToken}`,
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || 'Unable to complete registration. Please try again.'
        );
      }

      sessionStorage.removeItem('kaamdaar_registration_draft');
      sessionStorage.removeItem('kaamdaar_verification_token');

      setSuccess(true);
    } catch (err) {
      setError(
        err.message ||
          'Unable to connect to the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!draft?.mobile || !draft?.country_code || !verificationToken) {
    return null;
  }

  return (
    <div className="profile-page">
      <header className="mobile-otp-navbar">
              <div className="nav-logo" aria-label="Kaamdaar home">
                      <img src={logo}></img>
              </div>
      
              <nav className="mobile-otp-nav-links">
                <Link to="/" className="mobile-otp-home-link">
                  Home
                </Link>
      
                <Link to="/login" className="mobile-otp-login-button">
                  Login
                </Link>
              </nav>
            </header>

      <main className="profile-main">
        {success ? (
          <section className="profile-success-card">
            <div className="profile-success-icon" aria-hidden="true">
              ✓
            </div>

            <h1>Account Created Successfully!</h1>

            <p>
              Welcome to Kaamdaar! Your details have been submitted
              successfully.
            </p>

            <Link to="/" className="profile-primary-button profile-home-button">
              Explore Kaamdaar <span aria-hidden="true">→</span>
            </Link>
          </section>
        ) : (
          <section className="profile-card">
            <div className="profile-card-brand" aria-hidden="true">

              <span className="profile-brand-text">
                <img src={logo}></img>
              </span>
            </div>

            <h1>Help Us Know You Better</h1><br></br>


            <form onSubmit={handleSubmit} noValidate>
              <div className="profile-form-fields">
                <div className="profile-field">
                  <span className="profile-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21v-2a8 8 0 0 1 16 0v2z" />
                    </svg>
                  </span>

                  <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    autoComplete="given-name"
                    value={formData.full_name}
                    onChange={handleChange}
                    maxLength={80}
                    required
                    disabled={loading}
                    aria-label="Full Name"
                  />
                </div>

                <div className="profile-field">
                  <span className="profile-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21v-2a8 8 0 0 1 16 0v2z" />
                    </svg>
                  </span>

                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    autoComplete="family-name"
                    value={formData.last_name}
                    onChange={handleChange}
                    maxLength={80}
                    required
                    disabled={loading}
                    aria-label="Last Name"
                  />
                </div>

                <div className="profile-field">
                  <span className="profile-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M16 3v4M8 3v4M3 10h18" />
                    </svg>
                  </span>

                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    aria-label="Age"
                  />
                </div>

                <div className="profile-field">
                  <span className="profile-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>

                  <input
                    type="text"
                    name="address"
                    placeholder="Full Address"
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={handleChange}
                    maxLength={250}
                    required
                    disabled={loading}
                    aria-label="Full Address"
                  />
                </div>

                <div className="profile-field">
                  <span className="profile-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <rect x="4" y="3" width="16" height="18" rx="2" />
                      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
                    </svg>
                  </span>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    autoComplete="address-level2"
                    value={formData.city}
                    onChange={handleChange}
                    maxLength={80}
                    required
                    disabled={loading}
                    aria-label="City"
                  />
                </div>

                <div className="profile-field">
                  <span className="profile-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
                      <path d="M9 3v15M15 6v15" />
                    </svg>
                  </span>

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    aria-label="State"
                  >
                    <option value="" disabled>
                      State
                    </option>

                    {INDIAN_STATES.map((stateName) => (
                      <option key={stateName} value={stateName}>
                        {stateName}
                      </option>
                    ))}
                  </select>

                  <span className="profile-select-arrow" aria-hidden="true">
                    ▾
                  </span>
                </div>

                <div className="profile-field">
                  <span className="profile-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M3 9h18l-2-5H5z" />
                      <path d="M5 9v11h14V9M9 14h6" />
                    </svg>
                  </span>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength={6}
                    required
                    disabled={loading}
                    aria-label="Pincode"
                  />
                </div>
              </div>

              {error && (
                <p className="profile-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="profile-primary-button"
                disabled={loading}
              >
                {loading ? 'Submitting Details...' : 'Confirm Details'}
                {!loading && <span aria-hidden="true">→</span>}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default Profile;