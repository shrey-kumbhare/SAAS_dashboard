import React from "react";
import { useAuth } from "../context/AuthContext";
const Header = () => {
  const { logout } = useAuth();
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <nav className="flex gap-6">
        <a href="#overview" className="text-gray-700 hover:text-blue-500">
          Overview
        </a>
        <a href="#analytics" className="text-gray-700 hover:text-blue-500">
          Analytics
        </a>
        <a href="#settings" className="text-gray-700 hover:text-blue-500">
          Settings
        </a>
        <button className="text-red-500 hover:text-red-700" onClick={logout}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
