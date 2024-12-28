// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "freshfarm-fbcee.firebaseapp.com",
  projectId: "freshfarm-fbcee",
  storageBucket: "freshfarm-fbcee.firebasestorage.app",
  messagingSenderId: "616357893230",
  appId: "1:616357893230:web:26564d75c3a114ad6a427f",
  measurementId: "G-PCJXP7ZVBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
