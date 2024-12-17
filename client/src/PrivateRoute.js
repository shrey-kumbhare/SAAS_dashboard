// PrivateRoute.js
import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import useAuth hook

const PrivateRoute = ({ element, ...rest }) => {
  const { authData } = useAuth();
  const navigate = useNavigate();
  if (!authData.isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
