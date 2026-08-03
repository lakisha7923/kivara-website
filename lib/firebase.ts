// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOW0PFj4d9sXBB4iyqkGyJf3G5e163yp4",
  authDomain: "kivara-healthcare.firebaseapp.com",
  projectId: "kivara-healthcare",
  storageBucket: "kivara-healthcare.firebasestorage.app",
  messagingSenderId: "1011442622642",
  appId: "1:1011442622642:web:755778a3d7c91ac73f69ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;