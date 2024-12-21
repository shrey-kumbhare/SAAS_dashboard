import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  AiOutlineHome,
  AiOutlineBarChart,
  AiOutlineSetting,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  const { logout, authData } = useAuth();
  const userName = authData?.user?.name || "Guest";
  const userImage = "https://via.placeholder.com/40";

  return (
    <header className="w-full px-6 py-4 bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="flex items-center gap-6 ml-6">
          <nav className="hidden lg:flex gap-6 items-center">
            <Link
              to="/"
              className="flex items-center text-gray-700 hover:text-blue-500 gap-2"
            >
              <AiOutlineHome size={20} />
              Overview
            </Link>
            <Link
              to="/analytics"
              className="flex items-center text-gray-700 hover:text-blue-500 gap-2"
            >
              <AiOutlineBarChart size={20} />
              Analytics
            </Link>
            <Link
              to="/settings"
              className="flex items-center text-gray-700 hover:text-blue-500 gap-2"
            >
              <AiOutlineSetting size={20} />
              Settings
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <img
              src={userImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-gray-700">{userName}</span>
            <button
              className="flex items-center text-red-500 hover:text-red-700 gap-2"
              onClick={logout}
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
