
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-j34uATgJXls_cdW18rWJujT2YnsibbA",
  authDomain: "ris-database-e0184.firebaseapp.com",
  databaseURL: "https://ris-database-e0184-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ris-database-e0184",
  storageBucket: "ris-database-e0184.appspot.com",
  messagingSenderId: "665781944621",
  appId: "1:665781944621:web:0580f97c25a955aaa093a4",
  measurementId: "G-3FX93CQT33",
  storageBucket: "gs://ris-database-e0184.appspot.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

//Création d'une référence de stockage qui va accuillir le fichier qui va être joint avec l'input file
//Les dossiers et sous dossiers sont eux aussi des références -> au cas où s'il ont besoin d'accueillir des fichiers
const storageRef = ref(storage);

// 'file' comes from the Blob or File API
//uploadBytes(AmpouleRef, file)
//.then((snapshot) => {
//  console.log(snapshot);
//});

export { db, auth, storageRef, storage };