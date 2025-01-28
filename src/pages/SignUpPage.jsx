import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { useAuth } from "../hooks/use-auth";
import "./SignUpPage.css";

function SignUpPage() {
  console.log("SignUpPage rendered");
  const navigate = useNavigate();
  const { auth } = useAuth();

  if (auth?.token) {
    return (
      <div className="signup-page">
        <div className="signup-container">
          <h2>You are already logged in!</h2>
          <p>
            Log out if you wish to create a new account. Otherwise, explore the
            site!
          </p>
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="login-heading">
          <span className="icon">꧁</span> Sign Up{" "}
          <span className="icon flip-icon">꧁</span>
        </h1>

        <h2>Sign Up</h2>
        <p>Sign up to create a new account</p>
        <SignUpForm />
        <div className="sign-up-link">
          <p>
            Test have an account?{" "}
            <button onClick={() => navigate("/login")}>Login here</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
