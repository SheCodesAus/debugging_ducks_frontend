// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="not-found">
      {/* Snowflakes Section */}
      <div className="snowflakes" aria-hidden="true">
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
      </div>

      {/* Card Container */}
      <div className="not-found-card">
        <h1>
          <span className="icon">꧁</span>404 - Page Not Found{" "}
          <span className="icon flip-icon">꧁</span>
        </h1>
        <p>
          {" "}
          Oh no! It looks like this page didn’t make it onto The Good List.
          Don’t worry, you can find your way back to the homepage using the link
          below.
        </p>
        <Link to="/">Return to Homepage</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
