import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

function LoginPage() {
  console.log("LoginPage rendered");

  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.localStorage.removeItem("token");
    navigate("/");
  };


  // If user is logged in, the following message will show.

  if (auth?.token) {
    return (
      <div className="login-page logged-in">
        <div className="login-container">
          <h1 className="welcome-back-header">
            <span className="header-flourish">꧁</span> Welcome back!
            <span className="header-flourish flip-flourish">꧁</span>
          </h1>
          <p>You are already logged in.</p>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div>
          <h1>
            <span className="header-flourish">꧁</span> Login{" "}
            <span className="header-flourish flip-flourish">꧁</span>
          </h1>
          <LoginForm />
        </div>
        <div className="signup-text-container">
          <p>Don't have an account?</p>
          <Link to="/signup">Sign up here</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
