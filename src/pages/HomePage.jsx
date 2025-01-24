import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { useAuth } from "../hooks/use-auth.js";
import BannerImage from "../img/banner-img.jpg";
import LogoImage from "../img/logo.svg";
import z from "zod";

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

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

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
    <>
      <div>
        <div className="banner">
          <img src={BannerImage} alt="banner" className="banner-image" />
          {/* Overlay Content */}
          <div className="banner-content">
            <h1>Welcome to your Christmas Shopping Companion</h1>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="about-section">
          <h1>About Us</h1>
          <p>
            Discover the ultimate shopping companion for the festive season. 
            Our platform is designed to make your Christmas shopping 
            experience seamless and enjoyable. Whether you’re planning gifts, 
            creating lists, or exploring ideas, we’re here to help you 
            every step of the way!
          </p>
        </div>

        {/* Features Section */}
        <div id="Features" className="Features-section">
          <div className="features-header">
            <h1>Features</h1>
          </div>
          <div className="List-img">
            <div className="item-img">
              <img src="/path/to/image1.jpg" alt="Image 1" />
              <p>Accompanying Text Here</p>
            </div>
            <div className="item-img">
              <img src="/path/to/image2.jpg" alt="Image 2" />
              <p>Accompanying Text Here</p>
            </div>
            <div className="item-img">
              <img src="/path/to/image3.jpg" alt="Image 3" />
              <p>Accompanying Text Here</p>
            </div>
          </div>
        </div>

        {/* Create list Section */}
        <div className="create list">
          <div id="create-list">
            <p>Ready to get started?</p>
            {auth.token ? (
              <Link to="/listpage">Create List</Link>
            ) : (
              <Link to="/signup">Create an account</Link>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="feedback-form">
          <img src={LogoImage} alt="logo" className="logo-image" />
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
      </div>
    </>
  );
}

export default HomePage;
