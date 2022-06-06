// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQF2eD4_paRxD5fXbZgPVa17QTqm3wtu0",
  authDomain: "superchat-64a39.firebaseapp.com",
  projectId: "superchat-64a39",
  storageBucket: "superchat-64a39.appspot.com",
  messagingSenderId: "24761344192",
  appId: "1:24761344192:web:5d23a1b80959d81d900d25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
