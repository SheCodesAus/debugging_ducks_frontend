import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./HomePage.css";
import { useAuth } from "../hooks/use-auth.js";
import BannerImage from "../img/banner-img.jpg";
import LogoImage from "../img/Logo.svg"; // Ensure correct path
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
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/" className="nav-link">
          Home
        </Link>
        {auth.token && (
          <Link to="/listpage" className="nav-link">
            List
          </Link>
        )}
        <Link to="/logout" className="nav-link">
          LOGOUT
        </Link>
      </nav>

      <div>
        <div className="banner">
          <img src={BannerImage} alt="banner" className="banner-image" />
          <div className="banner-content">
            <h1>Welcome to your Christmas Shopping Companion</h1>
          </div>
        </div>

        {/* Features, List, and Contact sections */}
        {/* Add other sections as needed... */}

        <Outlet />
      </div>
    </>
  );
}

export default HomePage;
