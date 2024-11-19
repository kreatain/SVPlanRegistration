import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Navbar.css";
import "../styles/Buttons.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>SV Plan Registration</h1>
      </div>
      <div className="navbar-right">
        <Link to="/events">Events</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/notifications">Notifications</Link>
        {user && user.role === "Admin" && (
          <Link to="/events/create">Create Event</Link>
        )}
        {user && (
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
