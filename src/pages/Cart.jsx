import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrders = async () => {
    if (cart.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const orderPromises = cart.map((item) => {
        if (!item.id || !item.name || item.price === undefined) {
          throw new Error("Cart item is missing required fields.");
        }

        return addDoc(collection(db, 'orders'), {
          productId: item.id,
          productName: item.name,
          price: item.price,
          status: 'Pending',
          timestamp: Timestamp.now(),
        });
      });

      await Promise.all(orderPromises);
      alert("🚗 Order placed!");
      clearCart();
    } catch (err) {
      console.error("❌ Error placing order:", err);
      alert("❌ Failed to place order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-gray-600">
            <p>Your cart is empty.</p>
            <Link
              to="/"
              className="inline-block mt-4 text-blue-600 underline hover:text-blue-800"
            >
              ← Go back to shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <li key={index} className="py-4 flex justify-between items-center">
                  <div>
                    <h2 className="font-medium text-lg">{item.name}</h2>
                    <p className="text-gray-500 text-sm">₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={placeOrders}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "🚗 Deliver to Car"}
              </button>

              <Link to="/payment">
                <button
                  onClick={placeOrders}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "💳 Proceed to Payment"}
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
