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

const Charts = () => {
  const { authData } = useAuth();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/UserTime", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.user._id}`,
          },
        });
        const { createdAt } = response.data;

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
              tension: 0.4, // Smooth curve
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
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
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">User Growth</h2>
      <div className="relative h-64 sm:h-80 md:h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Charts;
