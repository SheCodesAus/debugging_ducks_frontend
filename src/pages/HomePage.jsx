import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useAuth } from "../hooks/use-auth.js";
import useLists from "../hooks/use-lists";
import LogoImage from "../img/Logo.svg";
import FeaturesImage from "../img/features-stand-in.webp";
import FeatureCategories from "../img/FeatureCategories.png";
import FeatureCreateList from "../img/FeatureCreateList.png";
import FeatureList from "../img/FeatureList.png";
import z from "zod";
import Snowflakes from "../components/Snowflakes.jsx";

const contactformSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

function HomePage() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { lists } = useLists();
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

  const getButtonText = () => {
    if (!auth.token) return "Login / Signup";
    if (!lists || lists.length === 0) return "Create List";
    return "View Lists";
  };

  const handleCreateList = (categoryId, categoryName) => {
    navigate("/create-list", {
      state: { categoryId, categoryName },
    });
  };

  const handleCallToAction = () => {
    if (auth.token) {
      navigate("/lists");
    } else {
      navigate("/signup");
    }
  };

  return (
    <>
      <Snowflakes />

      {/* --- WELCOME BANNER --- */}
      <div className="banner">
        {/* Banner Overlay Text */}
        <div className="banner-content">
          <h1>The Good List</h1>
          <p>Welcome to your Christmas shopping companion</p>
          <button onClick={handleCallToAction}>Start Now</button>
        </div>
      </div>

      {/* --- ABOUT SECTION --- */}
      <div id="about" className="about-section">
        <p>
          Discover the ultimate shopping companion for the festive season,
          designed to make your Christmas shopping experience seamless and
          enjoyable. Whether you're planning gifts, creating lists, or exploring
          ideas, we're here to help you every step of the way!
        </p>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div id="Features" className="Features-section">
        <div className="features-header">
          <h1>
            <span className="icon">꧁</span> Features{" "}
            <span className="icon flip-icon">꧁</span>
          </h1>
        </div>

        <div className="List-img">
          <div className="item-img">
            <img src={FeatureCreateList} alt="Feature 1" />
            <p>
              Stay organised this Christmas - create shopping lists and
              wishlists in seconds!
            </p>
          </div>
          <div className="item-img">
            <img src={FeatureCategories} alt="Feature 2" />
            <p>
              Effortless organisation - group your lists by family, friends, or
              occasions!
            </p>
          </div>
          <div className="item-img">
            <img src={FeatureList} alt="Feature 3" />
            <p>
              Prioritise, favourite, and track your gifts - stress-free shopping
              made easy!
            </p>
          </div>
        </div>
      </div>

      {/* --- CONTACT FORM --- */}
      <div className="feedback-form">
        <img src={LogoImage} alt="The Good List logo" className="logo-image" />
        <h1>Contact Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={credentials.name}
              placeholder="Name"
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
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={credentials.message}
              placeholder="Message or Feedback"
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default HomePage;
