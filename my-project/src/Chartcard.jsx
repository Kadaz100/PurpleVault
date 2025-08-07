import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getDailyVolume } from "./getTransactionsData";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartCard = ({ transactions = [] }) => {
  const dailyVolume = getDailyVolume(transactions);
  const labels = Object.keys(dailyVolume);
  const data = Object.values(dailyVolume);

  const chartData = {
    labels,
    datasets: [
      {
        label: "SOL Sent",
        data,
        backgroundColor: "#A855F7", // Purple bars
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#A855F7",
        },
        grid: {
          color: "#333333",
        },
      },
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          color: "#A855F7",
        },
        grid: {
          color: "#333333",
        },
      },
    },
  };

  return (
    <div className="bg-black border border-purple-600 rounded-lg p-4 w-full shadow-md">
      <h3 className="text-purple-400 font-bold text-lg mb-4">
        📊 Daily Send Volume
      </h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartCard;