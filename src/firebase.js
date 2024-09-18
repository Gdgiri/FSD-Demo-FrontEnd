// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogger-hunt-dd25f.firebaseapp.com",
  projectId: "blogger-hunt-dd25f",
  storageBucket: "blogger-hunt-dd25f.appspot.com",
  messagingSenderId: "267753890645",
  appId: "1:267753890645:web:a8deb27f2307d5835f85dc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
