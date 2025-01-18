import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

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
                    <p className="info-text">
                    You are already logged in.
                    </p>
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
                <h1>Login</h1>
                <LoginForm />
              </div>
            ) : (
              <div className="signup-form">
                <h1>Sign Up</h1>
                <SignUpForm />
              </div>
            )}
            <p>
              {isLoginForm ? "Don't have an account?" : 'Already have an account?'}
              <button
                className="toggle-form-button"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? 'Sign up here' : 'Login here'}
              </button>
            </p>
        </div>
      </div>
    );
}
    
export default LoginPage;