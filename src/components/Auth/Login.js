import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  // For simulation purposes only
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [selectedUser, setSelectedUser] = useState("");

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserSelect = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // For simulation purposes only
    const user = users.find((user) => user.email === email);

    if (user && password === "password") {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      navigate("/events");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label>Select User Type:</label>
          <select value={selectedUser} onChange={handleUserSelect} required>
            <option value="">--Select User--</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
};

export default Login;
