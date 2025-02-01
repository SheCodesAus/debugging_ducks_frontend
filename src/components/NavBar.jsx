import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import Image from "../img/Logo.svg";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  console.log("useAuth output in Navbar:", { auth, setAuth });

  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({ token: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo Image wrapped with Link */}
        <Link to="/" className="logo-link">
          <img src={Image} alt="Logo" className="logo-image" />
        </Link>

        {/* Links container */}
        <div className="links">
          <Link to="/">Home</Link>
          {auth.token && auth.user ? (
            <Link to="#" onClick={handleLogout}>
              Logout
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
