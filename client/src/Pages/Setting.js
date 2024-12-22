import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Setting() {
  const { theme, setTheme, authData } = useAuth();
  const [passVerify, setPassVerify] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    Number: "",
    verifyPassword: "",
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

  const verifyPassword = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/verifyPass?password=${userProfile.verifyPassword}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.user._id}`,
          },
        }
      );
      setPassVerify(response.status === 200);
    } catch (e) {
      console.error(e);
      setPassVerify(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (passVerify) {
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/updateUser`,
          { userProfile, notifications },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData.user._id}`,
            },
          }
        );
        console.log(response);
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Verify your Current Password");
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex h-screen flex-col md:flex-row bg-white dark:bg-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 flex flex-col gap-6 bg-gray-100 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
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
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={userProfile.name}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={userProfile.email}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Verify Existing Password
                </label>
                <input
                  type="password"
                  className="mt-1 p-2 w-[48%] border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={userProfile.verifyPassword}
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      verifyPassword: e.target.value,
                    })
                  }
                  required
                />
                <button
                  type="button"
                  className={`mt-6 p-2 text-white rounded-lg ml-[10%] ${
                    passVerify ? "bg-green-500" : "bg-blue-500 dark:bg-blue-700"
                  }`}
                  onClick={verifyPassword}
                >
                  Verify
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Number
                </label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={userProfile.Number}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, Number: e.target.value })
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
                  className="mt-1 p-2 w-[48%] border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={userProfile.password}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, password: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="mt-4 p-2 bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-900 rounded-lg"
              >
                Update Profile
              </button>
            </form>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Change Theme
            </h2>
            <div className="flex items-center space-x-4">
              <label className="text-sm text-black dark:text-white">
                Light
              </label>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  className="hidden"
                  id="theme-toggle"
                />
                <label
                  htmlFor="theme-toggle"
                  className="block w-12 h-6 bg-gray-300 rounded-full cursor-pointer"
                >
                  <span
                    className={`block w-6 h-6 bg-white rounded-full transition-transform ${
                      theme === "dark" ? "transform translate-x-6" : ""
                    }`}
                  ></span>
                </label>
              </div>
              <label className="text-sm text-black dark:text-white">Dark</label>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md mt-6">
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
