// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVhVLJT_zTkoduOSwds6GN814yXjdk0Ng",
  authDomain: "graduation-project-b6b59.firebaseapp.com",
  projectId: "graduation-project-b6b59",
  storageBucket: "graduation-project-b6b59.appspot.com",
  messagingSenderId: "924426544910",
  appId: "1:924426544910:web:5e5c00808dc6f4bbc6195f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
