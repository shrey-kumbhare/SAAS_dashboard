import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({ status: null, message: null });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/register", formData);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
      setError({ status: null, message: null });
      onLogin(
        response.data.token,
        response.data.options.expires,
        response.data.user
      );
    } catch (error) {
      setError({
        status: error.response?.status,
        message:
          error.response?.data?.error?.errors?.password?.message ||
          "User Already Exist",
      });
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-content">
        <header>Signup</header>
        <form onSubmit={handleSignup}>
          <div className="signup-form-field input-field">
            <input
              type="text"
              placeholder="User Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="signup-form-field input-field">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="signup-form-field input-field">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="password"
              required
            />
            <i className="bx bx-hide eye-icon"></i>
          </div>
          <div className="signup-form-button-field">
            <button type="submit">Signup</button>
          </div>
        </form>
        <div className="message-container">
          {error.message && (
            <div className="error-message">{error.message}</div>
          )}
        </div>
        <div className="signup-form-link">
          <span>
            Already have an account?{" "}
            <Link to="/login" className="link login-link">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
