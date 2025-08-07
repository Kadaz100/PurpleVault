// src/components/StatsCard.jsx
import React from 'react';

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-black border border-purple-500 rounded-lg p-4 text-white w-full">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm text-purple-400">{title}</h4>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="text-3xl text-purple-400">{icon}</div>
      </div>
    </div>
  );
}