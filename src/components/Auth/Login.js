import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Login request
      const response = await axios.post(`${apiUrl}/api/signin/`, {
        email,
        password,
      });

      console.log("Login response:", response.data);
      const userData = response.data;

      // Step 2: Add email and password to userData for storage in Redux
      const userWithCredentials = {
        ...userData,
        email,
        password,
      };

      // Step 3: Dispatch to Redux
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: userWithCredentials,
      });

      // Step 4: Redirect to events page
      navigate("/events");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
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
