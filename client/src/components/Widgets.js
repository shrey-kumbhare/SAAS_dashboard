import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the required components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { authData } = useAuth();

  // States for Widgets
  const [metrics, setMetrics] = useState([
    { label: "Users", value: 0 },
    { label: "Revenue", value: "$0" },
    { label: "Active Sessions", value: 0 },
  ]);
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [],
        borderColor: "rgb(97, 247, 59)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  });

  // State for Charts
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "User Growth",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  });

  // Fetch metrics and user growth data
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const metricsResponse = await axios.get(
          "http://localhost:5000/api/totalUsers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData.user._id}`,
            },
          }
        );
        setMetrics((prevMetrics) =>
          prevMetrics.map((metric) =>
            metric.label === "Users"
              ? { ...metric, value: metricsResponse.data.totalUsers }
              : metric
          )
        );
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    const fetchChartData = async () => {
      try {
        const chartResponse = await axios.get(
          "http://localhost:5000/api/UserTime",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData.user._id}`,
            },
          }
        );
        const { createdAt } = chartResponse.data;
        const labels = createdAt.map((timestamp) =>
          new Date(timestamp).toLocaleDateString()
        );
        const values = createdAt.map((_, index) => index + 1);

        setChartData({
          labels,
          datasets: [
            {
              label: "User Growth",
              data: values,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchMetrics();
    fetchChartData();

    // Interval updates for revenue and active sessions
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => {
          if (metric.label === "Revenue") {
            const currentRevenue = parseInt(metric.value.replace("$", ""));
            const randomIncrease = Math.floor(Math.random() * 100);
            const updatedRevenue = currentRevenue + randomIncrease;

            setRevenueData((prevData) => ({
              labels: [...prevData.labels, timestamp].slice(-10),
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [...prevData.datasets[0].data, updatedRevenue].slice(
                    -10
                  ),
                },
              ],
            }));

            return { ...metric, value: `$${updatedRevenue}` };
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
  }, [authData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: "rgba(200, 200, 200, 0.2)" },
        ticks: { beginAtZero: true },
      },
    },
  };

  return (
    <div className="p-4 space-y-8">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Charts Section (Side-by-Side on Large Screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <div
          className="bg-white rounded shadow-md p-4"
          style={{
            height: "100%",
          }}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">
            Revenue Over Time
          </h2>
          <div className="relative h-64 sm:h-80">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            User Growth
          </h2>
          <div className="relative h-64 sm:h-80 md:h-96">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
