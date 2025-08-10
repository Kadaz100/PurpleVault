// src/components/AmountSentBarChart.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { db } from "./firebaseConfig"; // ✅ your firebase config
import { collection, onSnapshot } from "firebase/firestore";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AmountSentBarChart() {
  const [walletData, setWalletData] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "transactions"), (snapshot) => {
      const walletTotals = {};

      snapshot.forEach((doc) => {
        const { to, amount } = doc.data();
        if (!to || !amount) return;
        walletTotals[to] = (walletTotals[to] || 0) + parseFloat(amount);
      });

      setWalletData(walletTotals);
    });

    return () => unsub();
  }, []);

  const labels = Object.keys(walletData);
  const amounts = Object.values(walletData);

  const data = {
    labels,
    datasets: [
      {
        label: "Amount Sent (SOL)",
        data: amounts,
        backgroundColor: "#a855f7",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: { color: "#ccc" },
        beginAtZero: true,
      },
      x: {
        ticks: { color: "#ccc" },
      },
    },
  };

  return (
    <div className="bg-black border border-purple-500 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2 text-purple-300">
        Amount Sent per Wallet
      </h2>
      {labels.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p className="text-gray-400">No transaction data found.</p>
      )}
    </div>
  );
}