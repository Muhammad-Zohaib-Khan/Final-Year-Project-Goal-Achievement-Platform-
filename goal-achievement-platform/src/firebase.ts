// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_VWlywOYHfxWhCUzZiOBE0eSFCXVi8v0",
  authDomain: "deep-motive.firebaseapp.com",
  projectId: "deep-motive",
  storageBucket: "deep-motive.firebasestorage.app",
  messagingSenderId: "480682363912",
  appId: "1:480682363912:web:a0cdb332db6138d27415bd",
  measurementId: "G-R2S782HNE0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
