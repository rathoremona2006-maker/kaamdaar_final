
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./otp_mobile.css";
import logo from "../assets/logo.png";

import { verifyPhoneOtp, sendPhoneOtp, clearPhoneOtp } from "../api/phoneOtp";

import { API_ROUTES } from "../api/api";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

const getSavedDraft = () => {
  try {
    const saved = sessionStorage.getItem("kaamdaar_registration_draft");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const OtpMobile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  const [draft] = useState(() => location.state?.draft || getSavedDraft());

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Redirect if registration data is missing.
  useEffect(() => {
    if (!draft?.mobile || !draft?.country_code) {
      navigate("/signup", { replace: true });
    }
  }, [draft, navigate]);

  // OTP resend countdown.
  useEffect(() => {
    if (seconds <= 0) return undefined;

    const timer = window.setTimeout(() => {
      setSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [seconds]);

  // Handle individual OTP digits.
  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtp((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });

    setError("");
    setMessage("");

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace and arrow-key navigation.
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle pasting a complete OTP.
  const handlePaste = (event) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    setOtp(
      Array.from({ length: OTP_LENGTH }, (_, index) => pasted[index] || ""),
    );

    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();

    setError("");
    setMessage("");
  };

  // Verify OTP.

  const handleVerify = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const otpValue = otp.join("");

    if (otpValue.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      // 1. Firebase verifies the SMS code and returns a real ID token.
      const verification = await verifyPhoneOtp(otpValue);
      const idToken = verification.idToken;

      // 2. Backend verifies the Firebase token and checks the customer.
      const response = await fetch(API_ROUTES.verifyOtp, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const result = await response.json().catch(() => ({}));
      console.log("result of continue api :", result);

      if (!response.ok || result.success === false) {
        throw new Error(
          result.error?.message ||
            result.message ||
            "Unable to continue authentication.",
        );
      }

      const nextStep = result.data?.next_step;

      if (nextStep === "REGISTER") {
        sessionStorage.setItem(
          "kaamdaar_registration_draft",
          JSON.stringify(draft),
        );

        navigate("/signup/profile", {
          state: {
            draft,
            verificationMethod: "mobile",
            firebaseIdToken: verification.idToken,
            previewMode: false,
          },
        });
      } else if (nextStep === "LOGIN") {
        navigate("/login", {
          state: {
            verifiedPhone: verification.phoneNumber,
            firebaseIdToken: verification.idToken,
          },
        });
      } else {
        throw new Error(
          "Unexpected response from auth/continue. Check the backend response.",
        );
      }

      clearPhoneOtp();
    } catch (err) {
      console.error("OTP verification failed:", err);

      setError(
        err.code === "auth/invalid-verification-code"
          ? "Incorrect OTP. Please try again."
          : err.code === "auth/code-expired"
            ? "OTP expired. Please request a new OTP."
            : err.message || "Unable to verify OTP.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP.

  const handleResend = async () => {
    if (seconds > 0 || resending || loading) return;

    setError("");
    setMessage("");
    setResending(true);

    try {
      const fullMobile = `${draft.country_code}${draft.mobile}`;

      // Request another OTP using your Firebase helper.
      await sendPhoneOtp(fullMobile);

      setOtp(Array(OTP_LENGTH).fill(""));
      setSeconds(RESEND_SECONDS);
      setMessage("A new OTP has been sent.");
      inputRefs.current[0]?.focus();
    } catch (err) {
      console.error("Resend OTP failed:", err);

      setError(err.message || "Unable to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  if (!draft?.mobile || !draft?.country_code) {
    return null;
  }

  const maskedMobile = `${draft.country_code} ${draft.mobile.replace(
    /(\d{2})\d+(\d{2})$/,
    "$1••••••$2",
  )}`;

  const formattedTime = `00:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="mobile-otp-page">
      <div id="recaptcha-container"></div>
      {/* Navbar */}
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

      {/* OTP Card */}
      <main className="mobile-otp-main">
        <section className="mobile-otp-card">
          <div className="mobile-otp-card-brand" aria-hidden="true">
            <img src={logo}></img>
          </div>

          <h1>Enter OTP</h1>

          <p className="mobile-otp-description">We’ve sent a 6-digit OTP to</p>

          <p className="mobile-otp-destination">{maskedMobile}</p>

          <form onSubmit={handleVerify}>
            {/* Six-digit OTP inputs */}
            <div className="mobile-otp-inputs" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  className="mobile-otp-input"
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  aria-label={`OTP digit ${index + 1}`}
                  value={digit}
                  maxLength={1}
                  onChange={(event) =>
                    handleOtpChange(index, event.target.value)
                  }
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  disabled={loading}
                />
              ))}
            </div>

            {/* Resend OTP */}
            <div className="mobile-otp-resend">
              {seconds > 0 ? (
                <span>
                  Resend OTP in <strong>{formattedTime}</strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending || loading}
                >
                  {resending ? "Requesting..." : "Resend OTP"}
                </button>
              )}
            </div>

            {/* Error message */}
            {error && (
              <p className="mobile-otp-error" role="alert">
                {error}
              </p>
            )}

            {/* Success message */}
            {message && (
              <p className="mobile-otp-message" role="status">
                {message}
              </p>
            )}

            {/* Verify button */}
            <button
              type="submit"
              className="mobile-otp-primary-button"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Continue"}

              {!loading && <span aria-hidden="true">→</span>}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default OtpMobile;


