import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

export default function TopWalletsSummary() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "transactions"),
      orderBy("amount", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const topWallets = snapshot.docs.map((doc) => ({
        id: doc.id,
        wallet: doc.data().wallet || doc.data().to, // fallback for 'to'
        amount: doc.data().amount,
      }));
      setWallets(topWallets);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-sm border border-purple-600 w-full">
      <h3 className="text-lg font-bold mb-4 text-purple-400">💼 Top 5 Wallets</h3>
      <div className="text-sm text-purple-200 space-y-2">
        {wallets.length > 0 ? (
          wallets.map((wallet, index) => (
            <div
              key={`${wallet.id}-${index}`}
              className="flex justify-between border-b border-gray-800 pb-2"
            >
              <span className="truncate max-w-[60%]">{wallet.wallet}</span>
              <span className="text-white font-medium">{wallet.amount?.toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No wallet data found.</p>
        )}
      </div>
    </div>
  );
}