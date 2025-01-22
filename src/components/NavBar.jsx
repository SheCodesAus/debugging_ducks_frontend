import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { Link } from "react-router-dom";
import Image from "../img/Logo.svg";

function NavBar() {
  const { auth, setAuth } = useAuth();

  return (
    <>
      <nav className="navbar">
        {/* Logo Image */}
        <img src={Image} alt="Logo" className="logo-image" />

        {/* Links container */}
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/lists">Lists</Link>
          {auth.token ? (
            <Link to="/login" onClick={() => setAuth({})}>
              LOGOUT
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>

      {/* This Outlet will render the HomePage, or any other nested routes */}
      <Outlet />
    </>
  );
}

export default NavBar;
