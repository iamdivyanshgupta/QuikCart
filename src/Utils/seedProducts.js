// src/utils/seedProducts.js
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export const seedDemoProducts = async () => {
  const demoItems = [
    {  
      id : UUID(),
      name: "Banana",
      price: 30,
      location: "Aisle 1",
      offer: "Buy 1 Get 1",
      nutrition: "High in potassium",
      imageUrl: "https://source.unsplash.com/300x300/?banana",
      createdAt: Timestamp.now(),
    },
    { 
        id : UUID(),
      name: "Milk",
      price: 50,
      location: "Aisle 2",
      offer: "10% off",
      nutrition: "Calcium rich",
      imageUrl: "https://source.unsplash.com/300x300/?milk",
      createdAt: Timestamp.now(),
    },
    { 
        id : UUID(),
      name: "Tomato",
      price: 20,
      location: "Aisle 3",
      offer: "Fresh Today",
      nutrition: "Vitamin C",
      imageUrl: "https://source.unsplash.com/300x300/?tomato",
      createdAt: Timestamp.now(),
    },
    {
        
      id : UUID(),
      name: "Bread",
      price: 40,
      location: "Bakery",
      offer: "None",
      nutrition: "Carbs",
      imageUrl: "https://source.unsplash.com/300x300/?bread",
      createdAt: Timestamp.now(),
    }
  ];

  try {
    for (let item of demoItems) {
      const docRef = await addDoc(collection(db, "products"), item);
      console.log(`✅ Added: ${item.name} (ID: ${docRef.id})`);
    }
    alert("🎉 Demo items uploaded successfully!");
  } catch (error) {
    console.error("❌ Error adding products:", error);
    alert("Error uploading demo items.");
  }
};
