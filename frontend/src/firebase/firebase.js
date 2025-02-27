import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLup7sIQvSs4XThwiVxnO4gSwqr5ZoAKk",
  authDomain: "kpop-market-f46d4.firebaseapp.com",
  projectId: "kpop-market-f46d4",
  storageBucket: "kpop-market-f46d4.firebasestorage.app",
  messagingSenderId: "320546513016",
  appId: "1:320546513016:web:46f0bae0d2f21630178d8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, auth, db};