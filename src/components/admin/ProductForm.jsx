import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    location: "",
    image: null,
  });

  const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/djynitpqp/image/upload";
  const UPLOAD_PRESET = "QuikCart";

  const uploadToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url; // ✅ Final image URL
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, price, category, location, image } = form;
    if (!id || !name || !price || !image) return alert("All fields required");

    const imageUrl = await uploadToCloudinary(image);

    await addDoc(collection(db, "products"), {
      id,
      name,
      price,
      category,
      location,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    alert("✅ Product added");

    setForm({ id: "", name: "", price: "", category: "", location: "", image: null });
    onAdd(); // Refresh product list
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-8">
      {["id", "name", "price", "category", "location"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      ))}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        ➕ Add Product
      </button>
    </form>
  );
}
