import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isAuthenticated: false,
    user: null,
  });

  const login = (userData) => {
    setAuthData({ isAuthenticated: true, user: userData });
  };

  const logout = () => {
    setAuthData({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
