// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Firebase
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

// Pages
import PurpleVault from './PurpleVault';       // Landing
import Dashboard from './Dashboard';           // Main page
import Send from './Send';                     // Send page
import Receipts from './Receipts';             // ✅ You had this commented
import Transactions from './Transactions';     // ✅ You had this commented
import Subscription from './Subscription';     // ✅ You had this commented
import Logout from './Logout';               // Logout page

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
        <Route path="receipts" element={<Receipts />} />        {/* ✅ Now active */}
        <Route path="transactions" element={<Transactions />} />{/* ✅ Now active */}
        <Route path="subscription" element={<Subscription />} />{/* ✅ Now active */}
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
  );
}

export default App;