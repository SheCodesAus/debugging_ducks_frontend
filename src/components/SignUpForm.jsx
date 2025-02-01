import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import z from "zod";
import postSignup from "../api/post-signup";
import "../pages/SignUpPage.css";

const signupSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password" }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

function SignUpForm() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Handle submit triggered");

    const result = await signupSchema.safeParseAsync(credentials);
    console.log("Validation result:", result);

    if (!result.success) {
      const errorMessages = {};
      result.error.errors.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
      return;
    }

    try {
      const data = await postSignup(credentials);
      console.log("Signup successful:", data);

      if (data.token) {
        // API provides a token: Log the user in immediately
        await signup(data);
        alert("Signup successful! You are now logged in.");
        navigate("/");
      } else {
        // API does not provide a token: Redirect to login page
        alert("Signup successful! Please log in to continue.");
        navigate("/login");
      }
    } catch (error) {
      setErrors({ api: error.message });
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          autoComplete="username"
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          autoComplete="email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>
      <button type="submit">Sign Up</button>
      {errors.api && <span className="error">{errors.api}</span>}
    </form>
  );
}

export default SignUpForm;
