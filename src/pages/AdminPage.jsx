import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import ProductForm from "../components/admin/ProductForm";
import ProductCard from "../components/admin/ProductCard";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "products"));
    const data = snap.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-700">🛠️ Admin Panel</h1>
      <ProductForm onAdd={fetchProducts} />

      <h2 className="text-xl font-bold mb-2">📦 Products</h2>

      {loading ? (
        <p className="text-gray-500 italic">⏳ Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400 italic">No products yet.</p>
      ) : (
        products.map((p) => (
          <ProductCard key={p.docId} product={p} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}
