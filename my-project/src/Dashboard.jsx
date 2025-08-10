// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import WalletConnect from "./WalletConnect";
import StatsCard from "./Statscard";
import ChartCard from "./Chartcard";
import TopWalletsSummary from "./TopWalletsSummary";
import ActivityTable from "./ActivityTable";

export default function Dashboard() {
  const [totalSent, setTotalSent] = useState(0);
  const [lastSent, setLastSent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "transactions"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        let total = 0;
        let lastAmount = 0;

        querySnapshot.forEach((doc, index) => {
          const data = doc.data();
          if (data.amount) {
            total += Number(data.amount);
            if (index === 0) {
              lastAmount = Number(data.amount);
            }
          }
        });

        setTotalSent(total);
        setLastSent(lastAmount);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-black text-white min-h-screen px-4 py-6 md:ml-64">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-purple-400">📊 Dashboard</h1>
        <WalletConnect />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard title="🟣 Total Sent" value={`${totalSent} SOL`} />
        <StatsCard title="🟣 Last Sent" value={`${lastSent} SOL`} />
      </div>

      {/* Chart + Top Wallets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <ChartCard />
        <TopWalletsSummary />
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <ActivityTable />
      </div>
    </main>
  );
}