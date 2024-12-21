import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import PrivateRoute from "./Auth/PrivateRoute";
import Home from "./Pages/Home";
import Analatics from "./Pages/Analatics";
import Settings from "./Pages/Setting";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/analytics"
          element={<PrivateRoute element={<Analatics />} />}
        />
        <Route
          path="/settings"
          element={<PrivateRoute element={<Settings />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
