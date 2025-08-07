// src/firebase/utils.js
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Ensure this path is correct in your project

export const getTransactionsData = async () => {
  try {
    const q = query(collection(db, "transactions"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);

    const transactions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || null,
    }));

    // Total Sent
    const totalSent = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);

    // Last Sent
    const lastSent = transactions.length > 0 ? transactions[0] : null;

    // Top 5 Wallets by amount
    const walletTotals = {};
    transactions.forEach(({ wallet, amount }) => {
      if (!wallet) return;
      walletTotals[wallet] = (walletTotals[wallet] || 0) + amount;
    });

    const topWallets = Object.entries(walletTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Chart Data (grouped by day)
    const chartData = groupChartData(transactions);

    return {
      totalSent,
      lastSent,
      topWallets,
      recentTransactions: transactions.slice(0, 5),
      chartData,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return {
      totalSent: 0,
      lastSent: null,
      topWallets: [],
      recentTransactions: [],
      chartData: [],
    };
  }
};

// Helper to group chart data by day
function groupChartData(transactions) {
  const grouped = {};

  transactions.forEach(({ timestamp, amount }) => {
    if (!timestamp) return;

    const dateKey = timestamp.toISOString().split("T")[0];
    grouped[dateKey] = (grouped[dateKey] || 0) + amount;
  });

  return Object.entries(grouped).map(([date, amount]) => ({
    x: date,
    y: amount,
  }));
}