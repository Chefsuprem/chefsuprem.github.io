
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-j34uATgJXls_cdW18rWJujT2YnsibbA",
  authDomain: "ris-database-e0184.firebaseapp.com",
  databaseURL: "https://ris-database-e0184-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ris-database-e0184",
  storageBucket: "ris-database-e0184.appspot.com",
  messagingSenderId: "665781944621",
  appId: "1:665781944621:web:0580f97c25a955aaa093a4",
  measurementId: "G-3FX93CQT33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };