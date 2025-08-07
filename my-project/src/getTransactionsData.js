import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
 * Fetch all transactions from Firestore "transactions" collection
 */
export async function fetchAllTransactions() {
  const snapshot = await getDocs(collection(db, "transactions"));
  return snapshot.docs.map((doc) => doc.data());
}

/**
 * Get Total Amount Sent
 */
export async function getTotalSent() {
  const transactions = await fetchAllTransactions();
  const total = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);
  return parseFloat(total.toFixed(2));
}

/**
 * Get Last Sent Transaction
 */
export async function getLastSent() {
  const q = query(collection(db, "transactions"), orderBy("timestamp", "desc"), limit(1));
  const snapshot = await getDocs(q);
  const latest = snapshot.docs[0]?.data();
  return latest || null;
}

/**
 * Get Daily Volume for Chart (Used in ChartCard)
 */
export async function getDailyVolume() {
  const transactions = await fetchAllTransactions();
  const grouped = {};

  transactions.forEach((tx) => {
    if (!tx.timestamp || !tx.amount) return;
    const date = new Date(tx.timestamp.seconds * 1000).toISOString().split("T")[0];
    grouped[date] = (grouped[date] || 0) + tx.amount;
  });

  return Object.entries(grouped).map(([date, total]) => ({
    date,
    total: parseFloat(total.toFixed(2)),
  }));
}

/**
 * Get Top 5 Wallets by Total Amount Sent
 */
export async function getTopWallets() {
  const transactions = await fetchAllTransactions();
  const walletMap = {};

  transactions.forEach((tx) => {
    if (!tx.wallet || !tx.amount) return;
    walletMap[tx.wallet] = (walletMap[tx.wallet] || 0) + tx.amount;
  });

  const sorted = Object.entries(walletMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([wallet, total]) => ({
      wallet,
      total: parseFloat(total.toFixed(2)),
    }));

  return sorted;
}

/**
 * Get Recent Activity (Last 5 transactions)
 */
export async function getRecentTransactions() {
  const q = query(collection(db, "transactions"), orderBy("timestamp", "desc"), limit(5));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}