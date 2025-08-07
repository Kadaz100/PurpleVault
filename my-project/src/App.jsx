// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Firebase
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

// Pages
import PurpleVault from './PurpleVault';   // Landing
import Dashboard from './Dashboard';       // Main page
import Send from './Send';                 // Send page
// import Receipts from './Receipts';
// import Transactions from './Transactions';
// import Subscription from './Subscription';

// Layout
import MainLayout from './MainLayout';

function App() {
  useEffect(() => {
    const testFirebase = async () => {
      try {
        const docRef = await addDoc(collection(db, 'test'), {
          message: 'Firebase works with Purple Vault!',
          timestamp: new Date(),
          app: 'PurpleVault',
        });
        console.log('📦 Firebase connected! Document ID:', docRef.id);
      } catch (error) {
        console.error('❌ Firebase error:', error);
      }
    };

    testFirebase();
  }, []);

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<PurpleVault />} />

      {/* Protected Routes with Sidebar layout */}
      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="send" element={<Send />} />
        {/* <Route path="receipts" element={<Receipts />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="subscription" element={<Subscription />} /> */}
      </Route>
    </Routes>
  );
}

export default App;