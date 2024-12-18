import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isAuthenticated: false,
    user: null,
  });

  const login = (userData, token) => {
    setAuthData({ isAuthenticated: true, user: userData });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setAuthData({ isAuthenticated: false, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setAuthData({ isAuthenticated: true, user: JSON.parse(user) });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuthData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
