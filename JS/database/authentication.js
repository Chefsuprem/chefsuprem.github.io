import { db, auth } from "./require.js";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, doc, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const signUpForm = document.getElementById("inscriptionForm");

if (signUpForm != undefined){

	//Inscription
	signUpForm.addEventListener(("submit"), (event) => {

		event.preventDefault(); //Evite le rechargement de la page au submit;

		//Récupération des valeurs pour les users "pending"
		const pendingLastName = signUpForm["nom"].value;
		const pendingFirstName = signUpForm["prenom"].value;

		//Définitions du form et des inputs
		const email = signUpForm["email"].value;
		const mdp = signUpForm["mdp"].value;

		const colRef = collection(db, "Pending");

		//Création de la collection qui va contenir tout les users

		createUserWithEmailAndPassword(auth, email, mdp)
		.then((userCred) => {
			
			// Signed up 
			console.log(userCred.user);

			//Création de la collection qui va contenir tout les users
			setDoc(doc(collection(db, "Pending"), `${userCred.user.uid}`), {
				
				nom: pendingLastName,
				prenom: pendingFirstName,
				email: email,
				mdp: mdp
			});

		})
		.catch((error) => {

			console.log(error.code);
			console.log(error.message);

			if (error.code == "auth/email-already-in-use"){
				alert("Email déjà utilisé !");
			}
		});

	});
};

//========== Connexion ==========

//Connexion
const signInForm = document.getElementById("connexionForm");
//const user = undefined;

if (signInForm != undefined){

	signInForm.addEventListener(("submit"), (event) => {
		
		event.preventDefault();

		const email = signInForm["email"].value;
		const mdp = signInForm["mdp"].value;

		signInWithEmailAndPassword(auth, email, mdp)
		.then((userCred) => {

			// Signed in 
			open("../../gestionProj.html", "_self");

		})
		.catch((error) => {

			console.log(error.code);
			console.log(error.message);
		});

	});
};


////Réinitialisation de mot de passe
//const mdpResetForm = document.getElementById("mdpResetForm");

//mdpResetForm.addEventListener(("submit"), (event) => {
	
//	event.preventDefault(); //Evite le rechargement de la page au submit;

//	const email = mdpResetForm["email"];
	
//	sendPasswordResetEmail(auth, email)
//	.then(() => {
//		// Prévoir un message qui dit que ça été envoyé
//	})
//	.catch((error) => {
//		console.log(error.code);
//		console.log(error.message);
//	});
//});

export { auth };

