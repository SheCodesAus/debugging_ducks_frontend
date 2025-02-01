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

  // If user is logged in, the following messasge will show.
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
    <div id="login-page" className="login-page">
      <div id="login-container" className="login-container">
        <div>
          <h1 className="login-heading">
            <span className="icon">꧁</span> Login{" "}
            <span className="icon flip-icon">꧁</span>
          </h1>
          <LoginForm />
        </div>
        <div className="login-sign-up-container">
          <p className="login-sign-up-text">Don't have an account?</p>
          <button
            className="toggle-form-button"
            onClick={() => navigate("/signup")}
          >
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
