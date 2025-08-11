// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";

import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";

import { BrowserRouter } from "react-router-dom";


import "@solana/wallet-adapter-react-ui/styles.css";
import { ReceiptProvider } from "./ReceiptContext"; // ✅ Your receipt context

// Use mainnet or devnet depending on your environment
const endpoint = import.meta.env.VITE_SOLANA_RPC;

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter()
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <BrowserRouter>
            <ReceiptProvider>
              <App />
            </ReceiptProvider>
          </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>
);