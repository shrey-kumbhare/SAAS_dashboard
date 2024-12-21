import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function Setting() {
  const { theme, setTheme } = useAuth();
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log("Updating profile:", userProfile);
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    // Apply the theme when the component mounts
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex h-screen flex-col md:flex-row bg-white dark:bg-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 flex flex-col gap-6 bg-gray-100 dark:bg-gray-900">
          {/* User Profile Update Form */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Update Profile
            </h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={userProfile.name}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={userProfile.email}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 p-2 w-full border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={userProfile.password}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, password: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 p-2 bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-900 rounded"
              >
                Update Profile
              </button>
            </form>
          </div>

          {/* Theme Toggle */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Change Theme
            </h2>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-black dark:text-white">
                Light
              </label>
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
                className="toggle-checkbox"
              />
              <label className="text-sm text-black dark:text-white">Dark</label>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Notification Preferences
            </h2>
            <div>
              <label className="block mb-2 text-black dark:text-white">
                <input
                  type="checkbox"
                  name="email"
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                  className="mr-2"
                />
                Receive updates via Email
              </label>
              <label className="block text-black dark:text-white">
                <input
                  type="checkbox"
                  name="sms"
                  checked={notifications.sms}
                  onChange={handleNotificationChange}
                  className="mr-2"
                />
                Receive updates via SMS
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
