// src/components/WalletDistributionPie.jsx
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { db } from "./firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function WalletDistributionPie() {
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
        label: "Wallet Distribution",
        data: amounts,
        backgroundColor: [
          "#8b5cf6",
          "#a78bfa",
          "#c084fc",
          "#d8b4fe",
          "#f5d0fe",
          "#ddd6fe",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#ccc",
        },
        position: "right",
      },
    },
  };

  return (
    <div className="bg-black border border-purple-500 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2 text-purple-300">
        Distribution by Wallet
      </h2>
      {labels.length > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <p className="text-gray-400">No transaction data found.</p>
      )}
    </div>
  );
}