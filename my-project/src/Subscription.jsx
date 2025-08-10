import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction, Connection } from "@solana/web3.js";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Subscription() {
  const { publicKey, signTransaction, connected } = useWallet();
  const [loading, setLoading] = useState(false);

  // ✅ Use QuickNode RPC instead of default mainnet-beta
  const connection = new Connection(
    "https://morning-smart-research.solana-mainnet.quiknode.pro/ed7137fae26b3b8e01b058b5e0009b5d45a8f1a4/",
    "confirmed"
  );

  const RECEIVING_WALLET = new PublicKey("7W6oMrvfZvZLhfFiwLtJVQSUSYV4wFak1kgJDVE7q2mR");

  const handlePayment = async (amountSOL, type) => {
    if (!connected) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      setLoading(true);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: RECEIVING_WALLET,
          lamports: Math.floor(amountSOL * 1e9), // Convert SOL → lamports
        })
      );

      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      const signed = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature, "confirmed");

      // ✅ Save payment info to Firestore
      await addDoc(collection(db, "subscriptions"), {
        wallet: publicKey.toString(),
        amount: amountSOL,
        type,
        txSignature: signature,
        expiryDate: type === "monthly" 
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
          : null,
        timestamp: serverTimestamp(),
      });

      alert(`✅ Payment successful! Transaction: ${signature}`);
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Payment failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className=" p-6 bg-black text-white min-h-screen md:ml-64">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">💳 Subscription</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* One-Time Payment */}
        <div className="border border-purple-600 bg-black rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">One-Time Service</h2>
          <p className="mb-4 text-gray-300">
            Pay <span className="text-purple-400">0.25 SOL</span> for single use.
          </p>
          <button
            onClick={() => handlePayment(0.25, "one-time")}
            disabled={loading}
            className="w-full py-2 border border-purple-600 text-purple-400 hover:bg-purple-700 hover:text-white rounded transition-all"
          >
            {loading ? "Processing..." : "Pay 0.25 SOL"}
          </button>
        </div>

        {/* Monthly Subscription */}
        <div className="border border-purple-600 bg-black rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Monthly Subscription</h2>
          <p className="mb-4 text-gray-300">
            Pay <span className="text-purple-400">1 SOL</span> per month.
          </p>
          <button
            onClick={() => handlePayment(1, "monthly")}
            disabled={loading}
            className="w-full py-2 border border-purple-600 text-purple-400 hover:bg-purple-700 hover:text-white rounded transition-all"
          >
            {loading ? "Processing..." : "Pay 1 SOL"}
          </button>
        </div>
      </div>
    </main>
  );
}