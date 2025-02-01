import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import "./SignUpPage.css";

function SignUpPage() {
  console.log("SignUpPage rendered");

  const navigate = useNavigate();
  const { auth } = useAuth();

  // If user is logged in, the following message will show.
  if (auth?.token) {
    return (
      <div className="login-page">
        <div className="login-container">
          <h2>You are already logged in!</h2>
          <p>
            Log out if you wish to access a different account. Otherwise,
            explore the site!
          </p>
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div id="signup-page" className="login-page">
      <div id="signup-container" className="login-container">
        <div className="signup-form">
          <h1 className="signup-heading">
            <span className="icon">꧁</span> Sign Up{" "}
            <span className="icon flip-icon">꧁</span>
          </h1>
          <SignUpForm />
          <div className="login-sign-up-container">
            <p className="login-sign-up-text">Already have an account?</p>
            <button
              className="toggle-form-button"
              onClick={() => navigate("/login")}
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
