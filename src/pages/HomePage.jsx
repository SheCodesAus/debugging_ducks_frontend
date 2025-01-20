import { useState } from "react";
import { Link, Outlet } from "react-router-dom"; // Using Link for navigation
import "./HomePage.css"; // This imports your updated HomePage.css
import { useAuth } from "../hooks/use-auth.js";
import BannerImage from "../img/banner-img.jpg";
import LogoImage from "../img/logo.svg"; // Correct path to the logo image
import z from "zod"; // For form validation

// Define the schema for contact form validation
const contactformSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

function HomePage() {
  const { auth, setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle form input changes
  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const result = contactformSchema.safeParse(credentials);
    if (!result.success) {
      const error = result.error.errors?.[0];
      if (error) {
        alert(error.message);
      }
      return;
    } else {
      alert("Thank you for your feedback!");
      setCredentials({ name: "", email: "", message: "" }); // Reset form
    }
  };

  return (
    <div className="homepage-container">
      {" "}
      {/* Apply 2cm margin-top here */}
      {/* Snowflakes container */}
      <div className="snowflakes" aria-hidden="true">
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
      </div>
      {/* Banner Section */}
      <div className="banner">
        <img src={BannerImage} alt="banner" className="banner-image" />
        {/* Logo and Overlay Content */}
        <div className="banner-content">
          <img src={LogoImage} alt="Logo" className="logo-image" />
          <h1>Welcome to your Christmas Shopping Companion</h1>
        </div>
      </div>
      {/* Features Section */}
      <div id="Features" className="Features-sesction">
        <h1>Features</h1>
        <div className="List-img">
          <div className="item-img">
            <img src="/path/to/image1.jpg" alt="Image 1" />
            <p>ABCD</p>
          </div>
          <div className="item-img">
            <img src="/path/to/image2.jpg" alt="Image 2" />
            <p>ABCD</p>
          </div>
          <div className="item-img">
            <img src="/path/to/image3.jpg" alt="Image 3" />
            <p>ABCD</p>
          </div>
        </div>
      </div>
      {/* Create List Section */}
      <div className="create list">
        <div id="create-list">
          <p1>Ready to get started?</p1>
          {/* Conditional render: if not logged in, show signup link, else show create list link */}
          {auth.token ? (
            <Link to="/listpage">Create List</Link>
          ) : (
            <Link to="/signup">Create an account</Link>
          )}
        </div>
      </div>
      {/* Contact Section */}
      <div className="feedback-form">
        <img src={LogoImage} alt="Logo" className="logo-image" />
        <h1>Contact Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={credentials.name}
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={credentials.message}
              placeholder="Enter your message or feedback"
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </form>
      </div>
      {/* Outlet for nested routes if needed */}
      <Outlet />
    </div>
  );
}

export default HomePage;
