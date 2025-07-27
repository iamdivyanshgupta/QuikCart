// src/pages/SeedDemo.jsx
import React from "react";
import { seedDemoProducts } from "../Utils/seedProducts";

export default function SeedDemo() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🌱 Upload Demo Items</h1>
      <button
        onClick={seedDemoProducts}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Upload Products
      </button>
    </div>
  );
}
