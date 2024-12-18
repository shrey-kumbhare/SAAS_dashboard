import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
const LoginForm = ({ onLogin, setCart, setFavourite }) => {
  const [formData, setFormData] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );

      setError({ status: null, message: null });

      onLogin(
        response.data.token,
        response.data.options.expires,
        response.data.user
      );
    } catch (error) {
      setError({
        status: error.response?.status,
        message: error.response?.data?.errMessage || "An error occurred",
      });
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-content">
        <header>Login</header>
        <form onSubmit={handleLogin}>
          <div className="login-form-field input-field">
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
          <div className="login-form-field input-field">
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
          <div className="login-form-link">
            <a href="/forgotPassword" className="forgot-pass">
              Forgot password?
            </a>
          </div>
          <div className="login-form-button-field">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="message-container">
          {error.message && (
            <div className="error-message">{error.message}</div>
          )}
        </div>
        <div className="login-form-link">
          <span>
            Don't have an account?{" "}
            <Link to="/register" className="link signup-link">
              Signup
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
