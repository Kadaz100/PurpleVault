import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import moment from "moment";

export default function ActivityTable() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "transactions"),
      orderBy("timestamp", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-black text-white p-4 rounded-lg w-full shadow-sm border border-purple-600">
      <h3 className="text-lg font-bold mb-4 text-purple-400">🧾 Recent Activity</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-purple-300 border-b border-purple-700">
            <tr>
              <th className="py-2">Wallet</th>
              <th className="py-2">Amount (SOL)</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.length > 0 ? (
              activities.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-800">
                  <td className="py-2 text-purple-200 truncate max-w-[200px]">
                    {activity.wallet || activity.to}
                  </td>
                  <td className="py-2 font-medium">{parseFloat(activity.amount).toFixed(2)}</td>
                  <td className="py-2 text-gray-400">
                    {moment(activity.timestamp?.toDate()).format("MMM D, YYYY • h:mm A")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-gray-500 text-center py-4">
                  No recent transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}