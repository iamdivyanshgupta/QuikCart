import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("✅ Products fetched:", items);
        setProducts(items);
      } catch (err) {
        console.error("🔥 Error fetching products:", err.message);
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!products.length) return <p className="p-4 text-gray-500">⏳ Loading products...</p>;

  return (
    <div className="p-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">🛒 Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map(product => (
            <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white rounded shadow p-4 hover:shadow-md transition flex flex-col gap-2"
          >
            
            <h2 className="text-lg font-semibold text-green-700">{product.name}</h2>
            <p className="text-sm text-gray-700">₹{product.price}</p>
            <p className="text-xs text-green-500">{product.offer}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
