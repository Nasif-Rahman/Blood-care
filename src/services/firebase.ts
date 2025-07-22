
import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiseecjl0-gLYjEDpdonhjUJYIIZmmUCA",
  authDomain: "blood-donation-f0f43.firebaseapp.com",
  projectId: "blood-donation-f0f43",
  storageBucket: "blood-donation-f0f43.firebasestorage.app",
  messagingSenderId: "245194730916",
  appId: "1:245194730916:web:bc2b74d068f3153075a531",
  measurementId: "G-PBXCPK213H"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();