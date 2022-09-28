// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe0D80XIUXvSJckBR78EfFxNy31X4iQJQ",
  authDomain: "auth-d4b39.firebaseapp.com",
  projectId: "auth-d4b39",
  storageBucket: "auth-d4b39.appspot.com",
  messagingSenderId: "699287387629",
  appId: "1:699287387629:web:e98ad54a947fcdd42afbe4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
