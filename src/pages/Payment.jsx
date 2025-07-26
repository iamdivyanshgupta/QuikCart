import React from 'react';

export default function Payment() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-green-100 p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-green-700">Payment Page</h1>
        <p className="mt-2">Coming soon: Razorpay Integration</p>
        <p className="mt-4 text-sm text-gray-500">We'll handle payment via UPI / QR here.</p>
      </div>
    </div>
  );
}
