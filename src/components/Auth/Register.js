import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "Student",
    department: "Khoury",
  });

  const { email, password, first_name, last_name, role, department } = formData;

  const apiUrl = process.env.REACT_APP_API_URL;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle registration submission
  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Request Body:", {
      email,
      password,
      first_name,
      last_name,
      role,
      department,
    });

    try {
      // Step 1: Send signup request
      await axios.post(`${apiUrl}/api/signup/`, {
        email,
        password,
        first_name,
        last_name,
        role,
        department,
      });

      console.log("Signup successful");

      // Step 2: Automatically login after successful registration
      const loginResponse = await axios.post(`${apiUrl}/api/signin/`, {
        email,
        password,
      });

      console.log("Login response:", loginResponse.data);

      // Step 3: Update Redux store and navigate to events
      dispatch({ type: "LOGIN_SUCCESS", payload: loginResponse.data });
      navigate("/events");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );

      // Show error to user
      alert(
        error.response?.data?.error
          ? `Error: ${error.response.data.error}`
          : "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="auth-form">
        {/* Email */}
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
        {/* Password */}
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
        {/* First Name */}
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
        {/* Last Name */}
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
        {/* Role Selection */}
        <div className="form-group">
          <label>User Role:</label>
          <select name="role" value={role} onChange={handleChange} required>
            <option value="Student">Student</option>
            <option value="Admin">Admin (Teacher)</option>
          </select>
        </div>
        {/* Department Selection */}
        <div className="form-group">
          <label>Department:</label>
          <select
            name="department"
            value={department}
            onChange={handleChange}
            required
          >
            <option value="Khoury">Khoury</option>
            <option value="College of Engineering">
              College of Engineering
            </option>
          </select>
        </div>
        {/* Register Button */}
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
