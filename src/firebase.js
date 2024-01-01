// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxl01Bkz2clB4eOjxhhrDJjyFFiBZh3cA",
  authDomain: "chat-app-96469.firebaseapp.com",
  projectId: "chat-app-96469",
  storageBucket: "chat-app-96469.appspot.com",
  messagingSenderId: "540683703813",
  appId: "1:540683703813:web:39ffc6f6f6d21b36526e6c",
  measurementId: "G-QJK0NJYTJ9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);