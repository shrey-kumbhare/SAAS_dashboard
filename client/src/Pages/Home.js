import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { theme } = useAuth();

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div
          className={`p-6 flex flex-col gap-6 ${
            theme === "dark" ? "bg-gray-800 text-white" : ""
          }`}
        >
          <Widgets />
        </div>
      </div>
    </div>
  );
}

export default Home;
