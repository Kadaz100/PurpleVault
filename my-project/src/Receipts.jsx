import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useWallet } from "@solana/wallet-adapter-react";
import ReceiptCard from "./ReceiptCard";

export default function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchReceipts = async () => {
      if (!publicKey) return; // Wait until wallet is connected

      try {
        const q = query(
          collection(db, "transactions"),
          where("from", "==", publicKey.toString()),
          orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("🧾 Real receipts fetched:", data);
        setReceipts(data);
      } catch (error) {
        console.error("❌ Error fetching receipts:", error);
      }
    };

    fetchReceipts();
  }, [publicKey]);

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-purple-400">Receipts</h1>

      {receipts.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          {publicKey ? "No receipts found." : "Connect your wallet to view receipts."}
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receipts.map((r) => {
            const date = r.timestamp?.toDate
              ? r.timestamp.toDate().toLocaleString()
              : "Unknown date";

            return (
              <ReceiptCard
                key={r.id}
                wallet={r.to}
                amount={r.amount}
                date={date}
                txSignature={r.txSignature}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}