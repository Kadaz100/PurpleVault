import React from "react";
import WalletConnect from "./WalletConnect";
import StatsCard from "./Statscard";
import ChartCard from "./Chartcard";
import TopWalletsSummary from "./TopWalletsSummary";
import ActivityTable from "./ActivityTable";

export default function Dashboard() {
  return (
    <main className="ml-64 p-6 bg-black text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-400">📊 Dashboard</h1>
        <WalletConnect />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard title="🟣 Total Sent" type="total" />
        <StatsCard title=" 🟣 Last Sent" type="last" />
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