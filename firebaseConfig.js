// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIUtNYsyIDCVIAtQckeMat4LUFHei5M2M",
  authDomain: "chat-app-7b4dc.firebaseapp.com",
  projectId: "chat-app-7b4dc",
  storageBucket: "chat-app-7b4dc.appspot.com",
  messagingSenderId: "788354048883",
  appId: "1:788354048883:web:97129a23c9d5b6cccb1b06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
