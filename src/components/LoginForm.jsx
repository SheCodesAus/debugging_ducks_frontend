import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import z from "zod";
import "../pages/LoginPage.css";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
    console.log("Updated credentials:", { ...credentials, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Handle submit triggered");
    setErrors("");

    console.log("Submitting login form with credentials:", credentials);

    const result = loginSchema.safeParse(credentials); // Validate credentials
    if (!result.success) {
      const error = result.error.errors?.[0];
      if (error) {
        console.error("Validation error:", error.message);
        setErrors(error.message); // Set validation error
      }
      return;
    }

    setIsLoading(true);

    try {
      await login(credentials);
      const user = localStorage.getItem("user");
      if (!user) {
        throw new Error("Login succeeded but user data is missing.");
      }
      navigate("/lists");
    } catch (error) {
      console.error("Login failed:", error);
      setErrors(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        placeholder="Enter your username"
        value={credentials.username}
        onChange={handleChange}
        autoComplete="username"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        value={credentials.password}
        onChange={handleChange}
        autoComplete="current-password"
      />
      {errors && <p className="error">{errors}</p>}{" "}
      {/* Display error messages */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
