import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // For simulation purposes only
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "student",
  });

  const { email, password, first_name, last_name, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // For simulation purposes only
    const newUser = {
      id: Date.now(),
      email,
      first_name,
      last_name,
      role,
    };

    dispatch({ type: "LOGIN_SUCCESS", payload: newUser });
    navigate("/events");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="auth-form">
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
            placeholder="Create a password"
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleChange}
            required
            placeholder="Enter your last name"
          />
        </div>
        <div className="form-group">
          <label>User Role:</label>
          <select name="role" value={role} onChange={handleChange} required>
            <option value="student">Student</option>
            <option value="admin">Admin (Teacher)</option>
          </select>
        </div>
        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );
};

export default Register;
