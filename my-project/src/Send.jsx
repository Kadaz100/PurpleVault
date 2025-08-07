import React, { useState } from "react";
import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
} from "@solana/web3.js";
import Papa from "papaparse";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Send() {
  const [recipients, setRecipients] = useState([]);
  const [manualAddress, setManualAddress] = useState("");
  const [manualAmount, setManualAmount] = useState("");

  const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

  const totalAmount = recipients.reduce(
    (sum, r) => sum + parseFloat(r.amount || 0),
    0
  );

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsed = results.data.map((row) => ({
          address: row.Wallet || row.wallet || row.Address || row.address,
          amount: row.Amount || row.amount,
        }));
        setRecipients([...recipients, ...parsed]);
      },
    });
  };

  const handleManualAdd = () => {
    if (!manualAddress || !manualAmount) return;
    setRecipients([...recipients, { address: manualAddress, amount: manualAmount }]);
    setManualAddress("");
    setManualAmount("");
  };

  const handleSendTransactions = async () => {
    if (!window.solana || !window.solana.isPhantom) {
      return alert("Phantom wallet not found!");
    }

    try {
      const provider = window.solana;
      await provider.connect();
      const fromPubkey = provider.publicKey;

      for (let r of recipients) {
        const toPubkey = new PublicKey(r.address);
        const lamports = Math.floor(parseFloat(r.amount) * 1e9);

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports,
          })
        );

        const { signature } = await provider.signAndSendTransaction(transaction);
        await connection.confirmTransaction(signature, "confirmed");

        await addDoc(collection(db, "transactions"), {
          from: fromPubkey.toString(),
          to: r.address,
          amount: parseFloat(r.amount),
          txSignature: signature,
          timestamp: serverTimestamp(),
        });
      }

      alert("✅ All transactions sent and logged!");
      setRecipients([]);
    } catch (err) {
      console.error("❌ Transaction error:", err);
      alert("❌ Error sending transactions. Check console.");
    }
  };

  return (
    <div className="text-white min-h-screen bg-black p-6">
      <h1 className="text-2xl font-bold mb-6 text-purple-400">Send</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Upload CSV + Manual Add */}
        <div className="border border-purple-600 bg-black rounded-lg p-4">
          <h2 className="font-semibold mb-3">Upload Recipients</h2>
          <div className="border-2 border-dashed border-purple-600 p-4 rounded text-center">
            <input type="file" accept=".csv" onChange={handleCSVUpload} />
            <p className="text-sm text-gray-400 mt-2">Upload CSV</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Add Manually</h3>
            <input
              className="w-full mb-2 p-2 rounded bg-[#1A1A2E] text-white"
              placeholder="Wallet address"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
            />
            <input
              className="w-full mb-2 p-2 rounded bg-[#1A1A2E] text-white"
              placeholder="Amount (SOL)"
              value={manualAmount}
              onChange={(e) => setManualAmount(e.target.value)}
            />
            <button
              onClick={handleManualAdd}
              className="w-full py-2 border border-purple-600 hover:bg-purple-700 text-purple-400 hover:text-white rounded mt-2 transition-all"
            >
              + Add Wallet
            </button>
            </div>
        </div>

        {/* Recipients List */}
        <div className="border border-purple-600 bg-black rounded-lg p-4">
          <h2 className="font-semibold mb-3">Recipients</h2>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-purple-400">
                  <th>Wallet</th>
                  <th>Amount (SOL)</th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((r, idx) => (
                  <tr key={idx}>
                    <td className="text-white truncate">{r.address}</td>
                    <td className="text-white">{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary + Send Button */}
        <div className="border border-purple-600 bg-black rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold mb-3">Summary</h2>
            <p className="text-sm">🧾 Total Wallets: {recipients.length}</p>
            <p className="text-sm mb-4">💸 Total Amount: {totalAmount.toFixed(2)} SOL</p>
          </div>
          <button
            onClick={handleSendTransactions}
            disabled={recipients.length === 0}
            className="py-2 border border-purple-600 hover:bg-purple-700 text-purple-400 hover:text-white font-semibold rounded transition-all"
          >
             Send Now
          </button>
        </div>
      </div>
    </div>
  );
}