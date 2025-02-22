// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaSkgtjR0ebMWKGpxRn7bplSndC64VL8w",
  authDomain: "fir-intro-a0b17.firebaseapp.com",
  projectId: "fir-intro-a0b17",
  storageBucket: "fir-intro-a0b17.firebasestorage.app",
  messagingSenderId: "347006288767",
  appId: "1:347006288767:web:36141a7514c8dab8d8d04a",
  measurementId: "G-F1LXKF8PL0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };