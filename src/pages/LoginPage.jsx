import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import "./LoginPage.css";

function LoginPage() {
  console.log("LoginPage rendered");

  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogout = () => {
    logout();
    window.localStorage.removeItem("token");
    navigate("/");
  };

  // **Keep conditional rendering for "logged-in" and "login form" views**
  if (auth?.token) {
    return (
      <div className="login-page">
        <div className="login-container">
          <h2 className="welcome-text">Welcome back!</h2>
          <p className="info-text">You are already logged in.</p>
          <button onClick={() => navigate("/")} className="login-button">
            Go Home
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {isLoginForm ? (
          <div>
            <h1 className="login-heading">
              <span className="icon">꧁</span> Login{" "}
              <span className="icon flip-icon">꧁</span>
            </h1>
            <LoginForm />
          </div>
        ) : (
          <div className="signup-form">
            <h1>Sign Up</h1>
            <SignUpForm />
          </div>
        )}

        {/* Move "Don't have an account" and "Sign up here" onto the same line */}
        <div className="sign-up-container">
          <p className="sign-up-text">
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <button
            className="toggle-form-button"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm ? "Sign up here" : "Login here"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
