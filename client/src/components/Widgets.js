import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Widgets = () => {
  const { authData } = useAuth();
  const [metrics, setMetrics] = useState([
    { label: "Users", value: 0 },
    { label: "Revenue", value: "$0" },
    { label: "Active Sessions", value: 0 },
  ]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/totalUsers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.isAuthenticated}`,
          },
        });
        const data = await response.json();
        setMetrics((prevMetrics) =>
          prevMetrics.map((metric) =>
            metric.label === "Users"
              ? { ...metric, value: data.totalUsers }
              : metric
          )
        );
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
    const interval = setInterval(() => {
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => {
          if (metric.label === "Revenue") {
            const currentRevenue = parseInt(metric.value.replace("$", ""));
            const randomIncrease = Math.floor(Math.random() * 100);
            return { ...metric, value: `$${currentRevenue + randomIncrease}` };
          } else if (metric.label === "Active Sessions") {
            const totalUsers = prevMetrics.find(
              (m) => m.label === "Users"
            )?.value;
            const randomActiveSessions = Math.floor(
              Math.random() * (totalUsers + 1)
            );
            return { ...metric, value: randomActiveSessions };
          }
          return metric;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="p-4 bg-white rounded shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg sm:text-xl font-semibold">{metric.label}</h2>
          <p className="text-xl sm:text-2xl font-bold">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Widgets;
