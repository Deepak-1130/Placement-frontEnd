import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:8080";

  // 🔐 LOGIN FUNCTION with Backend Integration
  const handleLogin = async () => {
    // Clear previous error
    setError("");
    
    // Validate inputs
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setIsLoading(true);

    try {
      // Make API call to your backend login endpoint
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: email,
          password: password,
        }),
      });

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed");
      }

      // Parse the response
      const data = await response.json();
      
      // Save token to localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userEmail", email);
        
        // Optional: Save token expiry (if your backend provides it)
        // You can decode the JWT to get expiry
        try {
          const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
          localStorage.setItem("tokenExpiry", tokenPayload.exp);
        } catch (e) {
          console.log("Could not decode token expiry");
        }
      }

      // 👉 Role logic - You can either get role from backend or decode from JWT
      let role = "student";
      
      // Option 1: If your backend returns role in response
      if (data.role) {
        role = data.role;
      } 
      // Option 2: Decode role from JWT token
      else if (data.token) {
        try {
          const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
          if (tokenPayload.role) {
            role = tokenPayload.role;
          } else if (email === "admin@gmail.com") {
            role = "admin";
          }
        } catch (e) {
          console.log("Could not decode role from token");
          // Fallback to email check
          if (email === "admin@gmail.com") {
            role = "admin";
          }
        }
      }
      // Option 3: Fallback to email check
      else if (email === "admin@gmail.com") {
        role = "admin";
      }

      // Save role in sessionStorage (or localStorage based on your preference)
      sessionStorage.setItem("role", role);
      localStorage.setItem("userRole", role);

      // Navigate based on role
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // 📝 SIGNUP CLICK
  const handleSignup = () => {
    navigate("/register");
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Enter your credentials to access your placement dashboard.</p>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* EMAIL */}
        <div className="input-group">
          <label>Email Address</label>
          <div className="input-box">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <div className="password-label">
            <label>Password</label>
            <span className="forgot" onClick={() => alert("Contact admin to reset password")}>
              Forgot Password?
            </span>
          </div>

          <div className="input-box">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button 
          className="login-btn" 
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {/* DIVIDER */}
        <div className="divider">
          <span>OR CONTINUE WITH</span>
        </div>

        {/* SOCIAL */}
        <div className="social-buttons">
          <button 
            className="social-btn" 
            onClick={() => alert("Google login coming soon!")}
            disabled={isLoading}
          >
            Google
          </button>
          <button 
            className="social-btn" 
            onClick={() => alert("LinkedIn login coming soon!")}
            disabled={isLoading}
          >
            LinkedIn
          </button>
        </div>

        {/* SIGNUP */}
        <p className="signup-text">
          Don't have an account?{" "}
          <span onClick={handleSignup}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;