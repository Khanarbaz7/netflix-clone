// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqlwKpVmHkIfaluQumZk38XZHrc9G3vV8",
  authDomain: "netflix-clone-17cca.firebaseapp.com",
  projectId: "netflix-clone-17cca",
  storageBucket: "netflix-clone-17cca.firebasestorage.app",
  messagingSenderId: "361603444355",
  appId: "1:361603444355:web:ebe751049221be502b35b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
