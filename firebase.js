// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Solo necesitas esta línea si usas Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-tyxWI53wicroqnaBEYDRlpyuYJMj2Zw",
  authDomain: "bspstore-edddc.firebaseapp.com",
  projectId: "bspstore-edddc",
  storageBucket: "bspstore-edddc.appspot.com",
  messagingSenderId: "889829954972",
  appId: "1:889829954972:web:62401248e72e0951c0e459"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Solo necesitas esto para la autenticación

export { auth }; // Exporta solo lo necesario para la autenticación
