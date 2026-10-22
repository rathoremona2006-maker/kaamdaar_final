
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./verification_cred.css";
import logo from "../assets/logo.png";

import { sendPhoneOtp } from "../api/phoneOtp";
import { API_ROUTES } from "../api/api";

const VerificationCred = () => {
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const cleanedMobile = mobile.replace(/\D/g, "");

    if (cleanedMobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const fullMobile = `${countryCode}${cleanedMobile}`;
    setLoading(true);

    try {
      // This endpoint should validate/rate-limit the request.
      // It should not independently send a second OTP.
      const response = await fetch(API_ROUTES.requestOtp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: fullMobile }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data.error?.message || data.message || "Unable to request OTP.",
        );
      }

      // Firebase sends the SMS (or uses a configured test number).
      await sendPhoneOtp({phoneNumber : fullMobile});

      const registrationDraft = {
        country_code: countryCode,
        mobile: cleanedMobile,
        verificationMethod: "mobile",
      };

      sessionStorage.setItem(
        "kaamdaar_registration_draft",
        JSON.stringify(registrationDraft),
      );

      navigate("/signup/verify-mobile", {
        state: {
          draft: registrationDraft,
          previewMode: false,
        },
      });
    } catch (err) {
      console.error("OTP request failed:", err);

      setError(
        err.code === "auth/invalid-phone-number"
          ? "Please enter a valid phone number."
          : err.code === "auth/too-many-requests"
            ? "Too many attempts. Please try again later."
            : err.message || "Unable to send OTP.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div id="recaptcha-container"></div>
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
                  setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))
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
              className="signup-primary-button"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Continue"}
              {!loading && <span aria-hidden="true">→</span>}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default VerificationCred;