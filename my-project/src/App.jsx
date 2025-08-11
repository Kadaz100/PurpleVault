import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Firebase
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// Pages
import PurpleVault from "./PurpleVault";
import Dashboard from "./Dashboard";
import Send from "./Send";
import Receipts from "./Receipts";
import Transactions from "./Transactions";
import Subscription from "./Subscription";
import Logout from "./Logout";
import MainLayout from "./MainLayout";

function App() {
  useEffect(() => {
    const testFirebase = async () => {
      try {
        const docRef = await addDoc(collection(db, "test"), {
          message: "Firebase works with Purple Vault!",
          timestamp: new Date(),
          app: "PurpleVault",
        });
        console.log("📦 Firebase connected! Document ID:", docRef.id);
      } catch (error) {
        console.error("❌ Firebase error:", error);
      }
    };

    testFirebase();
  }, []);

  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<PurpleVault />} />

      {/* Protected pages with sidebar */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/logout" element={<Logout />} />
      </Route>

      {/* Wildcard fallback */}
      <Route path="*" element={<PurpleVault />} />
    </Routes>
  );
}

export default App;