import { app, db } from "./require.js";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const auth = getAuth();

const signUpForm = document.getElementById("inscriptionForm");

//Inscription
signUpForm.addEventListener(("submit"), (event) => {

	event.preventDefault(); //Evite le rechargement de la page au submit;
	console.log(event);

	//Définitions du form et des inputs
	const email = signUpForm["email"].value;
	const mdp = signUpForm["mdp"].value;

	createUserWithEmailAndPassword(auth, email, mdp)
	.then((userCred) => {
		
		// Signed up 
		console.log(userCred.user);

	})
	.catch((error) => {

		console.log(error.code);
		console.log(error.message);

		if (error.code == "auth/email-already-in-use"){
			alert("Email déjà utilisé !");
		}
	});

});

//========== Connexion ==========

//Connexion
const signInForm = document.getElementById("connexionForm");

signInForm.addEventListener(("submit"), (event) => {
	
	event.preventDefault();

	const email = signInForm["email"];
	const mdp = signInForm["mdp"];

	signInWithEmailAndPassword(auth, email, password)
	.then((userCred) => {

		// Signed in 
		open("../../gestionProj.html", "_self");
	})
	.catch((error) => {

		console.log(error.code);
		console.log(error.message);
	});

});


//Réinitialisation de mot de passe
const mdpResetForm = document.getElementById("mdpResetForm");

mdpResetForm.addEventListener(("submit"), (event) => {
	
	event.preventDefault(); //Evite le rechargement de la page au submit;

	const email = mdpResetForm["email"];
	
	sendPasswordResetEmail(auth, email)
	.then(() => {
		// Prévoir un message qui dit que ça été envoyé
	})
	.catch((error) => {
		console.log(error.code);
		console.log(error.message);
	});
});
