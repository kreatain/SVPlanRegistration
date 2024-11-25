import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../../apiService"; 
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ email, password, first_name, last_name, role, department });
      console.log("Signup successful");

      const loginResponse = await loginUser({ email, password }); 
      console.log("Login response:", loginResponse);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: loginResponse, 
      });

      navigate("/events");
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed. Please try again.");
    }
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
            <option value="Student">Student</option>
            <option value="Admin">Admin (Teacher)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Department:</label>
          <select name="department" value={department} onChange={handleChange} required>
            <option value="Khoury">Khoury</option>
            <option value="College of Engineering">College of Engineering</option>
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