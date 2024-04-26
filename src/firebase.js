// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vnetwork-c1edf.firebaseapp.com",
  projectId: "vnetwork-c1edf",
  storageBucket: "vnetwork-c1edf.appspot.com",
  messagingSenderId: "198413271995",
  appId: "1:198413271995:web:3f8f0ee4b56dc46b8b7a9e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
