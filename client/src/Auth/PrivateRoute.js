import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { authData } = useAuth();

  return authData.isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
