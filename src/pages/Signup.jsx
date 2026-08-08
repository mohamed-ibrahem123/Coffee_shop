import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  // Form input state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Status and alert states
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Validate basic email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Handle Registration Form Submission
  const handleSignup = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // 1. Validate that all fields are filled
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // 2. Validate email format
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // 3. Password length check
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    // 4. Validate that Password and Confirm Password match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    // 5. Retrieve existing users array from Local Storage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // 6. Check for duplicate email
    const emailExists = existingUsers.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (emailExists) {
      setErrorMessage("An account with this email already exists.");
      return;
    }

    // 7. Construct new user object matching required format:
    // { id, fullName, email, password }
    const newUser = {
      id: Date.now(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: password,
    };

    // 8. Save updated users array to Local Storage
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // 9. Display success feedback & clear form
    setSuccessMessage("Account created successfully!");
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // 10. Redirect to Login page
    setTimeout(() => {
      navigate("/login");
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

        {/* Right Side: Signup Form */}
        <section className="auth-form-side">
          <div className="auth-form-card">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">
              Join Caffinity for exclusive coffee experiences.
            </p>

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
            <form onSubmit={handleSignup} noValidate>
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-field-wrapper">
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Enter your name "
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

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
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-field-wrapper">
                  <input
                    type="password"
                    className="custom-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-group mb-4">
                <label className="form-label">Confirm Password</label>
                <div className="input-field-wrapper">
                  <input
                    type="password"
                    className="custom-input"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                Sign Up
              </button>
            </form>

            {/* Link to Login */}
            <div className="auth-switch-box text-center">
              <span>Already have an account? </span>
              <Link to="/login" className="auth-switch-link">
                Sign in.
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;
