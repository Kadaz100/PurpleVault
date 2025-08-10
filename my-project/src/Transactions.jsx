// src/Transactions.jsx
import React from "react";
import AmountSentBarChart from "./AmountSentBarChart";
import WalletDistributionPie from "./WalletDistributionPie";
import DailySentLineChart from "./DailySentLineChart";
import TransactionTable from "./TransactionTable";

export default function Transactions() {
  return (
    <main className="p-6 bg-black text-white min-h-screen lg:ml-64">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Transactions</h1>

      {/* Top Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black border border-purple-500 rounded-lg p-4">
          <AmountSentBarChart />
        </div>
        <div className="bg-black border border-purple-500 rounded-lg p-4">
          <WalletDistributionPie />
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-black border border-purple-500 rounded-lg p-4">
          <DailySentLineChart />
        </div>
        <div className="bg-black border border-purple-500 rounded-lg p-4">
          <TransactionTable />
        </div>
      </div>
    </main>
  );
}