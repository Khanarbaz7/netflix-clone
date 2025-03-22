import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqlwKpVmHkIfaluQumZk38XZHrc9G3vV8",
  authDomain: "netflix-clone-17cca.firebaseapp.com",
  projectId: "netflix-clone-17cca",
  storageBucket: "netflix-clone-17cca.firebasestorage.app",
  messagingSenderId: "361603444355",
  appId: "1:361603444355:web:ebe751049221be502b35b6"
};

// Initialize Firebase first before exporting anything
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
