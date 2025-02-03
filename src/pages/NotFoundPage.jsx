import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import Snowflakes from "../components/Snowflakes"; 

function NotFoundPage() {
  return (
    <div className="not-found">
      {/* Snowflakes Component */}
      <Snowflakes />

      <div className="not-found-card">
        <h1>
          <span className="icon">꧁</span>404 - Page Not on The Good List!{" "}
          <span className="icon flip-icon">꧁</span>
        </h1>
        <p>
          Looks like this page is on Santa's naughty list and disappeared into
          thin air! Don't worry, we'll get you back on track! You can return to
          your shopping list or head back home to continue your festive
          adventure.
        </p>
        <Link to="/">Return to Homepage</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
