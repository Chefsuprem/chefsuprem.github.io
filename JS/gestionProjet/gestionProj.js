
import { db, auth } from "../database/require.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

//Evènement de trigger du toast
const toastLiveExample = document.getElementById('liveToast')


onAuthStateChanged(auth, (user) => {
	if (user){

		const uid = user.uid;
		const userDoc = getDoc(doc(db, "Pending", `${uid}`));

		if (userDoc){
			
			userDoc.then((snapshot) => {

				const data = snapshot.data();

				//Toast pour signaler l'attente de validité
				//J'ai du faire le texte en plusieurs fois pour intégrer le span
				const toastLiveExample = document.getElementById("liveToast");
				const timesTamp = document.getElementsByClassName("toastTimestamp");

				const timestampSliced = user.metadata.lastSignInTime.slice(0, 16);
				timesTamp[0].textContent = `${timestampSliced}`;

				const toastBody = document.getElementsByClassName("toast-body");
				let span1 = document.createElement("span");
				span1.setAttribute("class", "hilight");
				span1.textContent = `${data.nom} ${data.prenom},`;

				let pBodyStart = document.createElement("p");
				pBodyStart.textContent = "Bonjour ";

				let pBodyMid = document.createElement("p");
				pBodyMid.textContent = "votre compte est en accès limité.";
				pBodyMid.setAttribute("class", "mb-1")

				let pBodyEnd = document.createElement("p");
				pBodyEnd.textContent = "Toutes les fonctionnalités seront disponible après votre validation par nos équipes.";
				pBodyEnd.setAttribute("class", "m-0");

				pBodyStart.appendChild(span1);
				pBodyStart.appendChild(pBodyMid);
				pBodyStart.appendChild(pBodyEnd);

				toastBody[0].appendChild(pBodyStart);

				const toastOptions = {
					delay: 10000
				}

  				const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample, toastOptions);
				toastBootstrap.show()
			})
		
		}else{

			//Afficher toute la gestion de projet en fonction de son rôle
			console.log("N'est pas en attente");
		};

	}else{

		open("../connexion.html", "_self");
	}
})