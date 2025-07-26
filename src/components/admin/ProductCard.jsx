import React from "react";
import { generateQR } from "../../Utils/generateQR";

export default function ProductCard({ product, onDelete }) {
  return (
    <div className="border rounded p-3 mb-4 flex gap-4 items-start">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-24 h-24 rounded object-cover"
        loading="lazy"
      />
      <div className="flex-1">
        <p className="font-semibold">{product.name}</p>
        <p>₹ {product.price}</p>
        <p className="text-sm text-gray-500">
          📍 {product.location} | 🏷️ {product.category}
        </p>
        <img
          src={generateQR(product.id)}
          alt="QR Code"
          className="mt-2"
          loading="lazy"
        />
      </div>
      <button
        onClick={() => onDelete(product.docId)}
        className="text-red-600 text-sm"
      >
        ❌
      </button>
    </div>
  );
}
