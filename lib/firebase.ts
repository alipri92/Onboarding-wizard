// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHIJcLdrx5qzOO08uTjIzJmEA2rka2dm0",
  authDomain: "onboarding-wizard-619e3.firebaseapp.com",
  projectId: "onboarding-wizard-619e3",
  storageBucket: "onboarding-wizard-619e3.firebasestorage.app",
  messagingSenderId: "824346134274",
  appId: "1:824346134274:web:8a4a2b6db6234288dba41b",
  measurementId: "G-D0W6ML3TSM"
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

console.log("🔥 Firebase initialized successfully");
console.log("📦 Firestore database:", db);

export { app, db };

