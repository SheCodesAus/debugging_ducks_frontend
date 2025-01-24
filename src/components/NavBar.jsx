import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { Link } from "react-router-dom";
import Image from "../img/logo.svg";

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
          {!auth.token && <Link to="/signup">Sign Up</Link>}{" "}
        {/*signup will only show if the user is not logged in*/}

        {/* {auth.token && <Link to="/lists">Lists</Link>}{" "} */}
        <Link to="/listlanding">Lists</Link>
        
        {/*List link will only show if the user is logged in*/}
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
