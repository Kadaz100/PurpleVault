// src/components/DailySentLineChart.jsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { db } from "./firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import moment from "moment";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function DailySentLineChart() {
  const [dailyTotals, setDailyTotals] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "transactions"), (snapshot) => {
      const totals = {};

      snapshot.forEach((doc) => {
        const { amount, timestamp } = doc.data();
        if (!amount || !timestamp?.toDate) return;

        const date = moment(timestamp.toDate()).format("MMM D");
        totals[date] = (totals[date] || 0) + parseFloat(amount);
      });

      setDailyTotals(totals);
    });

    return () => unsub();
  }, []);

  const labels = Object.keys(dailyTotals).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const dataPoints = labels.map((date) => dailyTotals[date]);

  const data = {
    labels,
    datasets: [
      {
        label: "Daily SOL Sent",
        data: dataPoints,
        fill: false,
        borderColor: "#a855f7",
        tension: 0.4,
        pointBackgroundColor: "#a855f7",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ccc",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
        grid: { color: "#333" },
      },
      y: {
        ticks: { color: "#aaa" },
        grid: { color: "#333" },
      },
    },
  };

  return (
    <div className="bg-black border border-purple-500 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2 text-purple-300">
        Daily Sent Trend
      </h2>
      {labels.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p className="text-gray-400">No daily data available.</p>
      )}
    </div>
  );
}