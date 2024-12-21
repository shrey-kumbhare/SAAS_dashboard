import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      return { isAuthenticated: true, user: JSON.parse(user) };
    } else {
      return { isAuthenticated: false, user: null };
    }
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
    localStorage.removeItem("theme");
  };

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, login, logout, theme, setTheme }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
