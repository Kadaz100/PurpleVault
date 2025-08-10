// src/context/ReceiptContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "./firebase"; // ✅ make sure this path is correct
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const ReceiptContext = createContext();
export const useReceipts = () => useContext(ReceiptContext);

export const ReceiptProvider = ({ children }) => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch receipts from Firestore on mount
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "transactions"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReceipts(data);
      } catch (error) {
        console.error("❌ Error fetching receipts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  // ✅ Add new receipt to Firestore
  const addReceipt = async (receipt) => {
    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        ...receipt,
        timestamp: serverTimestamp(),
      });
      setReceipts(prev => [{ id: docRef.id, ...receipt }, ...prev]);
    } catch (error) {
      console.error("❌ Error adding receipt:", error);
    }
  };

  return (
    <ReceiptContext.Provider value={{ receipts, addReceipt, loading }}>
      {children}
    </ReceiptContext.Provider>
  );
};