import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../apiService"; 
import "../../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await loginUser({ email, password }); 
      console.log("Login response:", response);

      const { role, message } = response.data;
  
      console.log(`Login success: ${message}, Role: ${role}`);

      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { email, role }, 
      });

      navigate("/events");
    } catch (error) {
      console.error("Login failed:", error);
  
      alert(error.response?.data?.error || "Invalid credentials. Please try again.");
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