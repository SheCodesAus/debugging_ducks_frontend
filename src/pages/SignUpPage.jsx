import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import LoginForm from "../components/LoginForm"; // assuming you have a LoginForm component
import "./LoginPage.css";

function LoginPage() {
  console.log("LoginPage rendered");
  const navigate = useNavigate();
  const { auth } = useAuth();

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
    <div id="login-page" className="login-page">
      <div id="login-container" className="login-container">
        <h1 className="login-heading">
          <span className="icon">꧁</span> Login{" "}
          <span className="icon flip-icon">꧁</span>
        </h1>
        <h2>Login to your account</h2>
        <LoginForm /> {/* Replace with your login form */}
        {/* Sign Up Here Button */}
        <div className="login-sign-up-container">
          <p>
            Don't have an account?{" "}
            <button
              className="login-button" // You can apply the same class as in other buttons
              onClick={() => navigate("/signup")}
            >
              Sign Up Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
