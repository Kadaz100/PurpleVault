// src/components/ReceiptCard.jsx
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import background from "../assets/fipforce-bg.png"; // Adjust the path as necessary
const ReceiptCard = ({ wallet, amount, date }) => {
  const receiptRef = useRef();

  const downloadReceipt = () => {
    html2canvas(receiptRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = 'receipt-${wallet}-${date}.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="bg-black border border-purple-700 rounded-md p-4 text-white">
      <div
        ref={receiptRef}
        className="p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})`,}}
      >
        <p className="text-purple-300 font-semibold text-lg">FIP FORCE</p>
        <p className="text-sm mt-2">Wallet Address:</p>
        <p className="font-mono break-all">{wallet}</p>
        <p className="mt-2 text-sm">Amount Sent:</p>
        <p className="text-green-400">{amount} SOL</p>
        <p className="mt-2 text-sm">Date:</p>
        <p>{date}</p>
      </div>

      <button
        onClick={downloadReceipt}
        className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm"
      >
        Download Receipt
      </button>
    </div>
  );
};

export default ReceiptCard;