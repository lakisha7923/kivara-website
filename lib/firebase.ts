// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOW0PFj4d9sXBB4iyqkGyJf3G5e163yp4",
  authDomain: "kivara-healthcare.firebaseapp.com",
  projectId: "kivara-healthcare",
  storageBucket: "kivara-healthcare.firebasestorage.app",
  messagingSenderId: "1011442622642",
  appId: "1:1011442622642:web:755778a3d7c91ac73f69ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;