import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { authData } = useAuth();

  if (!authData.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
