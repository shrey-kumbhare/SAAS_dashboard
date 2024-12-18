import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import PrivateRoute from "./Auth/PrivateRoute";
import Home from "./Pages/Home";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
};

export default App;
