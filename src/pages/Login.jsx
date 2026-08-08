import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Alert and feedback state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Form Submission
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = existingUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (!userFound) {
      setErrorMessage("Account not found");
      return;
    }

    if (userFound.password !== password) {
      setErrorMessage("Incorrect password.");
      return;
    }

    const currentUser = {
      id: userFound.id,
      fullName: userFound.fullName,
      email: userFound.email,
    };
    login(currentUser);

    setSuccessMessage("Logged in successfully.");

    // Redirect to main page
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="caffinity-auth-page">
      <main className="auth-wrapper">
        {/* Left Side: Coffee Imagery */}
        <section className="auth-image-side">
          <div className="image-overlay"></div>
          <img src="/Barista.avif" alt="Barista-image" className="hero-image" />
        </section>

        {/* Right Side: Login Form */}
        <section className="auth-form-side">
          <div className="auth-form-card">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue to Caffinity.</p>

            {/* Error Alert */}
            {errorMessage && (
              <div className="custom-alert error-alert" role="alert">
                {errorMessage}
              </div>
            )}

            {/* Success Alert */}
            {successMessage && (
              <div className="custom-alert success-alert" role="alert">
                {successMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} noValidate>
              {/* Email Address */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-field-wrapper">
                  <input
                    type="email"
                    className="custom-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group mb-1">
                <label className="form-label">Password</label>
                <div className="input-field-wrapper">
                  <input
                    type="password"
                    className={`custom-input ${errorMessage.includes("password") ? "input-error" : ""}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Forgot Password with large spacing before submit button */}
              <div className="forgot-password-wrapper">
                <a href="#forgot" className="forgot-password-link">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                Log In
              </button>
            </form>

            {/* Link to Signup */}
            <div className="auth-switch-box">
              <span>Don't have an account? </span>
              <Link to="/signup" className="auth-switch-link">
                Register.
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
