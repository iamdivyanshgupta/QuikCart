// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3LW7QfFqc-XRyS-5GGvvcOzaPAYxtqmk",
  authDomain: "quikcart-c039b.firebaseapp.com",
  projectId: "quikcart-c039b",
  storageBucket: "quikcart-c039b.firebasestorage.app",
  messagingSenderId: "674708071298",
  appId: "1:674708071298:web:099de8151ab4c220dce59b",
  measurementId: "G-8VNH9K75DW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);