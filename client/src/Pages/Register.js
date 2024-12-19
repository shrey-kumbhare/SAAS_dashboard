import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );

      const { user, token } = response.data;

      login(user, token);

      navigate("/");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setError(null);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.error?.message ||
          "An error occurred. Please try again."
      );
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
          </div>
          <div className="signup-form-button-field">
            <button type="submit">Signup</button>
          </div>
        </form>
        {error && (
          <div className="message-container">
            <div className="error-message">{error}</div>
          </div>
        )}
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
