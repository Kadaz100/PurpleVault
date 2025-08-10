// src/Logout.jsx
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { disconnect } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        // Disconnect Phantom or other wallet
        await disconnect();

        // Clear any stored data
        localStorage.clear();
        sessionStorage.clear();

        console.log("✅ User logged out successfully");

        // Redirect to landing page
        navigate("/");
      } catch (error) {
        console.error("❌ Error during logout:", error);
      }
    };

    doLogout();
  }, [disconnect, navigate]);

  return null; // No UI, just process logout
}