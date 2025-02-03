import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import SignUpForm from "../components/SignUpForm";
import "./SignUpPage.css";
import Snowflakes from "../components/Snowflakes";

function SignUpPage() {
  console.log("SignUpPage rendered");

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
      <div className="signup-page">
        <div className="signup-container">
          <h1>You are already logged in!</h1>
          <p>
            Log out if you wish to access a different account. Otherwise,
            explore the site!
          </p>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page">
      {/* Snowflakes Component */}
      <Snowflakes />
      
      <div className="signup-container">
        <h1>
          <span className="header-flourish">꧁</span> Sign Up{" "}
          <span className="header-flourish flip-flourish">꧁</span>
        </h1>
        <SignUpForm />
        <div className="login-text-container">
          <p>Already have an account?</p>
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
