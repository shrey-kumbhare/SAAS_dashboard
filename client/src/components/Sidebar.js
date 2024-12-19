import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } h-full bg-blue-800 text-white flex flex-col transition-all duration-300`}
    >
      <button
        className="p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <nav className="flex flex-col gap-4 mt-4 px-4">
        <a href="#overview" className="hover:bg-blue-700 p-2 rounded">
          Overview
        </a>
        <a href="#analytics" className="hover:bg-blue-700 p-2 rounded">
          Analytics
        </a>
        <a href="#settings" className="hover:bg-blue-700 p-2 rounded">
          Settings
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
