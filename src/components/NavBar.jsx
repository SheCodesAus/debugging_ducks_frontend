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
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({ token: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    closeMenu();
  };

  const isAuthenticated = auth && auth.token;
  const userExists = auth?.user;

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        {/* Logo Image wrapped with Link */}
        <Link to="/" className="navbar-logo-link" onClick={closeMenu}>
          <img src={Image} alt="The Good List logo" className="navbar-logo-image" />
        </Link>

        {/* Burger Menu */}
        <div
          className={`burger-menu ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          role="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <div className="burger-bar"></div>
          <div className="burger-bar"></div>
          <div className="burger-bar"></div>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div className="overlay" onClick={closeMenu}></div>
        )}
        
        {/* Links container */}
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu}>🌟 Home</Link>
          {isAuthenticated && userExists && (
            <Link to="/lists" onClick={closeMenu}>🌟 Lists</Link>
          )}
          {isAuthenticated && userExists ? (
            <Link to="/" onClick={handleLogout}>
              🌟 Log Out
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>🌟 Login</Link>
              <Link to="/signup" onClick={closeMenu}>🌟 Sign Up</Link>
            </>
          )}
        </div>
      </nav>
      {/* This Outlet will render the HomePage, or any other nested routes */}
      <Outlet />
    </div>
  );
}

export default NavBar;
