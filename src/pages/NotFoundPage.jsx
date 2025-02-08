import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";
import Snowflakes from "../components/Snowflakes";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      {/* Snowflakes Component */}
      <Snowflakes />

      <div className="not-found-card">
        <h1>
          <span className="header-flourish">꧁</span>404 - Page Not on The Good
          List! <span className="header-flourish flip-flourish">꧁</span>
        </h1>
        <p>
          Looks like this page is on Santa's naughty list and disappeared into
          thin air! Don't worry, we'll get you back on track! You can return to
          your shopping list or head back home to continue your festive
          adventure.
        </p>
        <button onClick={() => navigate("/")}>Return to Homepage</button>
      </div>
    </div>
  );
}

export default NotFoundPage;
