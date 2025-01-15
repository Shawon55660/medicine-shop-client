// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId:import.meta.env.VITE_PROJECT_ID,
  storageBucket:import.meta.env.STORAGEBUCKET,
  messagingSenderId:import.meta.env.MESSAGING_SENDER_ID,
  appId:import.meta.env.APP_ID 
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
export const auth = getAuth(app);