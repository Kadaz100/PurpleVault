// src/TransactionTable.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import moment from "moment";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "transactions"),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-black text-white p-4 rounded-lg border border-purple-600 shadow-sm">
      <h2 className="text-lg font-bold mb-3 text-purple-400">
        📄 Latest Transactions
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-purple-300 border-b border-purple-700">
            <tr>
              <th className="text-left py-2">Wallet</th>
              <th className="text-left py-2">Amount (SOL)</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 py-4"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => {
                const timestamp = tx.timestamp?.toDate
                  ? tx.timestamp.toDate()
                  : null;
                const date = timestamp
                  ? moment(timestamp).format("MMM D, YYYY")
                  : "N/A";
                const time = timestamp
                  ? moment(timestamp).format("h:mm A")
                  : "N/A";

                return (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-800 hover:bg-[#1f1f2e] transition-colors"
                  >
                    <td className="py-2 truncate max-w-[200px] text-purple-200">
                      {tx.to || tx.wallet || "Unknown"}
                    </td>
                    <td className="py-2">
                      {typeof tx.amount === "number"
                        ? tx.amount.toFixed(2)
                        : "0.00"}
                    </td>
                    <td className="py-2 text-gray-400">{date}</td>
                    <td className="py-2 text-gray-500">{time}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}