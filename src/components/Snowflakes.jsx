import React from "react";
import "./Snowflakes.css";

const Snowflakes = () => {
  return (
    <div className="snowflakes" aria-hidden="true">
      <div className="snowflake left">❅</div>
      {/* <div className="snowflake right">❆</div> */}
      <div className="snowflake left">❄</div>
      {/* <div className="snowflake right">❅</div> */}
      <div className="snowflake left">❆</div>
      {/* <div className="snowflake right">❄</div> */}
      <div className="snowflake left">❅</div>
      {/* <div className="snowflake right">❆</div> */}
    </div>
  );
};

export default Snowflakes;
