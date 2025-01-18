import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";

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
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
        <Link to="/lists">Lists</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;