// src/components/WalletConnect.jsx
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function WalletConnect() {
  return (
    <div className="ml-auto">
      <WalletMultiButton className="custom-wallet-button" />
    </div>
  );
}