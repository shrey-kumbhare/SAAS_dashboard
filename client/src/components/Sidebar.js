import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useAuth();

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } h-screen flex flex-col transition-all duration-300 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-800 text-white"
      }`}
    >
      <button
        className="p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <div className={`flex-1 overflow-y-auto ${isOpen ? "mt-4" : ""}`}>
        {isOpen && (
          <nav className="flex flex-col gap-4 px-4">
            <a
              href="/"
              className="hover:bg-blue-700 dark:hover:bg-blue-600 p-2 rounded"
            >
              Overview
            </a>
            <a
              href="/analytics"
              className="hover:bg-blue-700 dark:hover:bg-blue-600 p-2 rounded"
            >
              Analytics
            </a>
            <a
              href="/settings"
              className="hover:bg-blue-700 dark:hover:bg-blue-600 p-2 rounded"
            >
              Settings
            </a>
            {/* Add more items if needed */}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
