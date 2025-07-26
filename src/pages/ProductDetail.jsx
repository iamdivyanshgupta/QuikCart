import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("Product not found");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ id, name: product.name, price: product.price });
    alert("Added to cart ✅");
  };

  const handleDeliverToCar = async () => {
    try {
      await addDoc(collection(db, "orders"), {
        productId: id,
        productName: product.name,
        status: "Pending",
        timestamp: Timestamp.now()
      });
      alert("🚗 Order placed! We'll deliver it to your car.");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    }
  };

  if (!product) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
        <img
  src={product.imageUrl}
  alt={product.name}
  className="w-full h-64 object-cover rounded mb-4"
/>

      <h1 className="text-2xl font-bold text-green-700 mb-2">{product.name}</h1>
      <p className="text-lg font-semibold">₹{product.price}</p>
      <p className="text-sm text-gray-500">{product.offer}</p>

      <div className="mt-4 bg-gray-100 p-4 rounded">
        <p><strong>Location:</strong> {product.location}</p>
        <p><strong>Nutrition:</strong> {product.nutrition}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleDeliverToCar}>
          Deliver to Car
        </button>
      </div>
    </div>
  );
}
