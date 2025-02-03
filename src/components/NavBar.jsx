import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useState, useEffect } from "react";
import Image from "../img/Logo.svg";
import "./NavBar.css";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("useAuth output in Navbar:", { auth, setAuth });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false); // Close the menu if the screen width is greater than 768px
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({ token: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Redirect to home page after logout
  };

  const isAuthenticated = auth && auth.token;
  const userExists = auth?.user;

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        {/* Logo Image wrapped with Link */}
        <Link to="/" className="navbar-logo-link">
          <img src={Image} alt="The Good List logo" className="navbar-logo-image" />
        </Link>

        {/* Burger Menu */}
        <div
            className="burger-menu" 
            onClick={toggleMenu}
            role="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <div className="burger-bar"></div>
            <div className="burger-bar"></div>
            <div className="burger-bar"></div>
          </div>

        {/* Overlay for closing menu when clicking outside */}
        {menuOpen && (
          <div 
            className="overlay" 
            onClick={() => {
              console.log("Overlay clicked");
              closeMenu();
            }}
            ></div>
        )}

        {/* Navigation Links */}
          <ul className={`navbar-links ${menuOpen ? "open" : ""}`} role="menu" aria-label="Navigation Links">
            <li role="menuitem">
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>

            {isAuthenticated && userExists && (
                <li role="menuitem">
                  <Link to="/lists" onClick={closeMenu}>Lists</Link>
                </li>
            )}
            
            {isAuthenticated && userExists ? (
                <li role="menuitem">
                  <Link to="/" onClick={handleLogout}>Log Out</Link>
                </li>
            ) : (
              <>
                <li role="menuitem">
                  <Link to="/login" onClick={closeMenu}>Login</Link>
                </li>
                <li role="menuitem">
                  <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
                </li>
              </>
            )}
        </ul>
      </nav>
      {/* This Outlet will render the HomePage, or any other nested routes */}
      <Outlet />
    </div>
  );
}

export default NavBar;
