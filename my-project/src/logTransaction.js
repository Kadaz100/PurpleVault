// src/utils/logTransaction.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseconfig";

export const logTransactionToFirestore = async ({ from, to, amount }) => {
  try {
    await addDoc(collection(db, "transactions"), {
      from,
      to,
      amount,
      timestamp: serverTimestamp(),
      status: "success",
    });
    console.log("✅ Transaction saved to Firestore");
  } catch (err) {
    console.error("❌ Error saving transaction:", err);
  }
};