import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./HomePage.css"; // This imports your updated HomePage.css which includes snowflakes styling
import { useAuth } from "../hooks/use-auth.js";
import BannerImage from "../img/banner-img.jpg";
import LogoImage from "../img/Logo.svg";

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

        <div className="banner">
          <img src={BannerImage} alt="banner" className="banner-image" />
          {/* Overlay Content */}
          <div className="banner-content">
            <h1>Welcome to your Christmas Shopping Companion</h1>
          </div>
        </div>

        {/* Rest of the page content */}
      </div>
    </>
  );
}

export default HomePage;
