import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './otp_email.css';

const OtpEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  const [draft, setDraft] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(30);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let savedDraft = location.state?.draft;

    if (!savedDraft) {
      try {
        savedDraft = JSON.parse(
          sessionStorage.getItem('kaamdaar_registration_draft') || 'null'
        );
      } catch {
        savedDraft = null;
      }
    }

    if (!savedDraft?.email) {
      navigate('/signup', { replace: true });
      return;
    }

    setDraft(savedDraft);
  }, [location.state, navigate]);

  useEffect(() => {
    if (seconds <= 0) return undefined;

    const timer = window.setTimeout(() => {
      setSeconds((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [seconds]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    setOtp((previous) =>
      previous.map((digit, i) => (i === index ? value : digit))
    );

    setError('');
    setMessage('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    const pasted = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!pasted) return;

    event.preventDefault();

    setOtp(
      Array.from({ length: 6 }, (_, index) => pasted[index] || '')
    );

    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    setError('');
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const otpValue = otp.join('');

    if (!/^\d{6}$/.test(otpValue)) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    // ==========================================
    // PREVIEW MODE — ACTIVE
    // Any six digits work for UI testing.
    // No API call and no real OTP verification.
    // ==========================================

    navigate('/signup/profile', {
      state: {
        draft,
        verificationMethod: 'email',
        previewMode: true,
      },
    });

    // ==========================================
    // DYNAMIC API MODE — COMMENTED FOR NOW
    // Enable only when the backend is ready.
    // ==========================================

    /*
    setLoading(true);

    try {
      const response = await fetch(API_ROUTES.auth.verifyOtp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: draft.email,
          otp: otpValue,
          purpose: 'registration',
          verification_method: 'email',
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'OTP verification failed.');
      }

      const verificationToken =
        result.verification_token ||
        result.registration_token ||
        result.verification_proof;

      if (!verificationToken) {
        throw new Error('The server did not return a verification token.');
      }

      navigate('/signup/profile', {
        state: {
          draft,
          verificationMethod: 'email',
          verificationToken,
          previewMode: false,
        },
      });
    } catch (err) {
      setError(err.message || 'Unable to verify OTP.');
    } finally {
      setLoading(false);
    }
    */
  };

  const handleResend = async () => {
    if (seconds > 0 || resending) return;

    setError('');
    setMessage('');

    // PREVIEW MODE — fake resend, no network request.
    setResending(true);
    setOtp(['', '', '', '', '', '']);
    setSeconds(30);
    setMessage('Preview: OTP resend button is working.');
    setResending(false);
    inputRefs.current[0]?.focus();

    // DYNAMIC API MODE — COMMENTED FOR NOW
    /*
    setResending(true);

    try {
      const response = await fetch(API_ROUTES.auth.requestOtp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: draft.email,
          purpose: 'registration',
          verification_method: 'email',
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Unable to resend OTP.');
      }

      setOtp(['', '', '', '', '', '']);
      setSeconds(30);
      setMessage('A new OTP has been requested.');
    } catch (err) {
      setError(err.message || 'Unable to resend OTP.');
    } finally {
      setResending(false);
    }
    */
  };

  if (!draft) return null;

  const maskedEmail =
    location.state?.maskedDestination ||
    String(draft.email).replace(/^(.{2}).*(@.*)$/, '$1***$2');

  return (
    <div className="email-otp-page">
      <header className="signup-header">
        <Link to="/" className="signup-brand" aria-label="Kaamdaar home">
          <span className="signup-brand-mark">K</span>
          <span>
            Kaam<span className="signup-brand-accent">daar</span>
          </span>
        </Link>

        <Link to="/signup" className="signup-header-link">
          Sign Up
        </Link>
      </header>

      <main className="email-otp-main">
        <section className="email-otp-card">
          <div className="email-otp-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <rect
                x="5"
                y="10"
                width="38"
                height="28"
                rx="5"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                d="M7 14L24 27L41 14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="email-otp-eyebrow">STEP 2 OF 3</p>
          <h1>Verify your email</h1>

          <p className="email-otp-description">
            Enter the 6-digit verification code for
          </p>

          <p className="email-otp-address">{maskedEmail}</p>

          <form onSubmit={handleVerify}>
            <label className="email-otp-label" htmlFor="email-otp-0">
              Enter 6-digit OTP
            </label>

            <div className="email-otp-inputs" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  id={`email-otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  aria-label={`OTP digit ${index + 1}`}
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleChange(event.target.value, index)
                  }
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  required
                />
              ))}
            </div>

            {error && (
              <p className="email-otp-error" role="alert">
                {error}
              </p>
            )}

            {message && (
              <p className="email-otp-success" role="status">
                {message}
              </p>
            )}

            <button
              className="email-otp-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify Email & Continue'}
              {!loading && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <div className="email-otp-resend">
            <span>Didn't receive the code?</span>{' '}
            {seconds > 0 ? (
              <span className="email-otp-countdown">
                Resend in 00:{String(seconds).padStart(2, '0')}
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
              >
                {resending ? 'Sending...' : 'Resend OTP'}
              </button>
            )}
          </div>

          <div className="email-otp-divider">
            <span />
            <span>SECURE VERIFICATION</span>
            <span />
          </div>

          <p className="email-otp-security">
            Preview mode: no real OTP is sent or verified.
          </p>

          <Link to="/signup" className="email-otp-back">
            ← Back to basic details
          </Link>
        </section>
      </main>

      <footer className="signup-footer">
        © {new Date().getFullYear()} Kaamdaar. All rights reserved.
      </footer>
    </div>
  );
};

export default OtpEmail;