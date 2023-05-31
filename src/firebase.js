// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv-s91VXKeWfoCFdbzFet0sUPZWD9K-YU",
  authDomain: "nutriculture-8b914.firebaseapp.com",
  projectId: "nutriculture-8b914",
  storageBucket: "nutriculture-8b914.appspot.com",
  messagingSenderId: "553087009925",
  appId: "1:553087009925:web:9a397c76dbb19f16dc95ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);