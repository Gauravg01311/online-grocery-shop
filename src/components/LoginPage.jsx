/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormStyles.css"; 

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("user")) || null;

      if (!storedUser) {
        setErrorMessage("User not found. Please register first.");
      } else if (
        storedUser.username !== username ||
        storedUser.password !== password
      ) {
        setErrorMessage("Invalid username or password.");
      } else {
        localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
        navigate("/grocery");
      }

      setLoading(false);
    }, 1000); // Simulate API delay
  };

  return (
    <div 
      className="login-container"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2>Login</h2>

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
          </div>

          {/* Password Field */}
          <div className="form-field">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Show Password Button BELOW Password Input */}
          {/* <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button> */}

          {/* Error Message */}
          {errorMessage && <div className="error">{errorMessage}</div>}

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Link to Register Page */}
          <button type="button" onClick={() => navigate("/register")} className="link-btn">
            Don't have an account? Register here.
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
