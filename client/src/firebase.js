// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "samo-fbfbd.firebaseapp.com",
  projectId: "samo-fbfbd",
  storageBucket: "samo-fbfbd.appspot.com",
  messagingSenderId: "540846526395",
  appId: "1:540846526395:web:9e65427d723afa84a8fe9e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



