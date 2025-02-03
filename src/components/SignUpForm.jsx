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
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

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
        name="username"
        placeholder="Enter your username"
        value={credentials.username}
        onChange={handleChange}
        autoComplete="username"
      />
      {errors.username && <p className="error">{errors.username}</p>}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={credentials.email}
        onChange={handleChange}
        autoComplete="email"
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={credentials.password}
        onChange={handleChange}
        autoComplete="new-password"
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Enter your password again"
        value={credentials.confirmPassword}
        onChange={handleChange}
        autoComplete="new-password"
      />
      {errors.confirmPassword && (
        <p className="error">{errors.confirmPassword}</p>
      )}
      <button type="submit">Sign Up</button>
      {errors.api && <p className="error">{errors.api}</p>}
    </form>
  );
}

export default SignUpForm;
