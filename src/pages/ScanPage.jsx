import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function ScanPage() {
  const navigate = useNavigate();
  const [manualId, setManualId] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log("✅ Detected:", decodedText);
        scanner.clear().then(() => {
          navigate(`/product/${decodedText}`);
        });
      },
      (error) => {
        // silently ignore
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [navigate]);

  // Handle manual submission
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      navigate(`/product/${manualId.trim()}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-green-700 mb-4 text-center">
        📷 Scan QR Code
      </h1>

      {/* QR Scanner */}
      <div id="reader" className="w-full rounded shadow" />

      {/* Manual Entry Fallback */}
      <form onSubmit={handleManualSubmit} className="mt-6">
        <p className="text-sm text-gray-600 mb-1">🔧 Product not scanning? Enter code manually:</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Product ID (e.g. 8901234567890)"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
}
