
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-j34uATgJXls_cdW18rWJujT2YnsibbA",
  authDomain: "ris-database-e0184.firebaseapp.com",
  databaseURL: "https://ris-database-e0184-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ris-database-e0184",
  storageBucket: "ris-database-e0184.appspot.com",
  messagingSenderId: "665781944621",
  appId: "1:665781944621:web:2946f163b6eab11ca093a4",
  measurementId: "G-XDVZL8C4XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);


//============ Connexion ============

//Récupération de la requête de connexion
let urlBrut = document.location.search;
let membre = [];

function url(urlBrut){
	let net = (urlBrut.substring(1)).split("&").forEach((string => {
		let position = (string.indexOf("=") + 1);
		let cle = string.substring(0, position - 1);
		let value = string.substring(position);
		membre[cle] = value;
	}));
};


//Récupération de données 

function Doc(doc){
	console.log(doc.data().prenomMem);
	console.log(membre["prenom"]);

	if ((doc.data().prenomMem == membre["prenom"]) && (doc.data().nomMem == membre["nom"])){
		window.open("./sucess.html", "_self");
	}
}

async function getMember(db){
	const memberCol = collection(db, "Membre");
	const memberSnapshot = await getDocs(memberCol);
	const memberList = memberSnapshot.docs.forEach(doc => {
		Doc(doc);
	});
}

//Condition de connexion
if (document.location.search != null){
	url(urlBrut);
	getMember(db);
}