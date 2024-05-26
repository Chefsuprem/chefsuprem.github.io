
import { db, auth, storageRef, storage } from "../database/require.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { ref } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

//Recuperation des differentes versions de status
import { clientAccount } from "./statusUI/Client.js";
import { membreAccount } from "./statusUI/Membre.js";
import { pendingAccount } from "./statusUI/Pending.js";
import { adminAccount } from "./statusUI/Admin.js";

const pageContent = document.querySelector("#pageContent main");
const currentProj = document.getElementById("currentProj");
let userBroadcast;


onAuthStateChanged(auth, (user) => {

	userBroadcast = user;

	//Création des références par projets
	getDocs(collection(db, "Projets"))
	.then((snapshot) => {
		snapshot.docs.forEach(proj => {
			const projRef = ref(storage, `${proj.data().nom}`);
			const imageProjRef = ref(storage, `${proj.data().nom}/images`);
			const pdfProjRef = ref(storage, `${proj.data().nom}/pdfs`);
			const videoProjRef = ref(storage, `${proj.data().nom}/videos`);
		});
	})

	if (user){

		if (user.email == "sadmindir@agence-1ris.com" || user.email == "sadminchefProj@agence-1ris.com"){
			adminAccount();
		}else{

			getDoc(doc(db, "Users", user.uid))
			.then((snapshot) => {
	
				const data = snapshot.data();
	
				if (data.status == "Client"){
					clientAccount();
				}else if (data.status == "Membre"){
					membreAccount();
				}else if (data.status == "Pending"){
					pendingAccount();
				}
			})
		}
		
		
	}else{

		open("../../../connexion.html", "_self");
	}
})

export { currentProj, pageContent, userBroadcast };