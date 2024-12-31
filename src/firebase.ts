// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXNCXXKlqZDDOqdpZ9r7YoEnQKyERDmt4",
  authDomain: "year-end-914b7.firebaseapp.com",
  projectId: "year-end-914b7",
  storageBucket: "year-end-914b7.firebasestorage.app",
  messagingSenderId: "307493762609",
  appId: "1:307493762609:web:560c22a4e970a56adfc710",
  measurementId: "G-R0D6TFJ4L2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
