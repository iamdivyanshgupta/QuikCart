// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(items);
      } catch (err) {
        console.error("🔥 Error fetching products:", err.message);
        setError("Failed to load products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({ id: product.id, name: product.name, price: product.price });
    alert("✅ Added to cart!");
  };

  if (error) return <p className="p-4 text-red-600">⚠️ {error}</p>;
  if (!products.length) return <p className="p-4 text-gray-500">⏳ Loading products...</p>;

  return (
    <div className="p-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">🛒 Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-md p-4 transition flex flex-col gap-2"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-40 object-cover rounded"
                />
              )}
              <Link to={`/product/${product.id}`}>
                <h2 className="text-lg font-semibold text-green-700">{product.name}</h2>
                <p className="text-sm text-gray-700">₹{product.price}</p>
                {product.offer && <p className="text-xs text-green-500">{product.offer}</p>}
              </Link>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
              >
                ➕ Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
