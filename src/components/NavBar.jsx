import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";
import Image from "../img/logo.svg";

function NavBar() {
  const { auth, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("NavBar component rendered");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout(); // Use the logout function from useAuth
    }
  };

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <img src={Image} alt="logo" className="logo-image" />
        <Link to="/">Home</Link>
        {!auth.token && <Link to="/signup">Sign Up</Link>}{" "}
        {/*signup will only show if the user is not logged in*/}
        {auth.token && <Link to="/lists">Lists</Link>}{" "}
        {/*List link will only show if the user is logged in*/}
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            LOGOUT
          </Link>
        ) : (
          <Link to="/login">LOGIN</Link>
        )}
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
