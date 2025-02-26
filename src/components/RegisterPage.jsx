import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"; 

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let formErrors = {};
    if (!username) formErrors.username = "Username is required.";
    if (!email) formErrors.email = "Email is required.";
    if (!password) formErrors.password = "Password is required.";
    if (password !== confirmPassword) formErrors.confirmPassword = "Passwords do not match.";

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const user = { username, email, password };
      localStorage.setItem("user", JSON.stringify(user));
      setIsSubmitted(true);
      navigate("/login");
    }
  };

  return (
    <div 
      className="register-container"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2>Register</h2>

          {/* Username Field */}
          <div className="form-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>

          {/* Email Field */}
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          {/* Password Field */}
          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          {/* Confirm Password Field */}
          <div className="form-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Register
          </button>

          {isSubmitted && <div className="success">Registration successful!</div>}

          {/* Link to Login Page */}
          <button type="button" onClick={() => navigate("/login")} className="link-btn">
            Already have an account? Login here.
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
