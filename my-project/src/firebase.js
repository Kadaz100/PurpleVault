// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDe10pvWgzcJkagUFTihPyfgUnVWWRyAUw",
  authDomain: "purple-vault.firebaseapp.com",
  projectId: "purple-vault",
  storageBucket: "purple-vault.appspot.com",
  messagingSenderId: "151760162105",
  appId: "1:151760162105:web:1f4dd1d0ecba34127bace8",
  measurementId: "G-VKD5LF994R"
};

// ✅ Prevent duplicate initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);