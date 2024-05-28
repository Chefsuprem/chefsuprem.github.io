
import { db, auth, storage } from "../../database/require.js";
import { closeModal } from "../components/functions.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, getDocs, collection, setDoc, deleteDoc, Timestamp, addDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { listAll, ref, getMetadata, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

import { currentProj, pageContent, userBroadcast } from "../gestionProj.js";

function clientAccount(){

	getDoc(doc(db, "Users", userBroadcast.uid)).then((snapshot) => {
		
		const data = snapshot.data();

		//====== Changement de status vu qu'il est validé ======
		const headingAccount = document.getElementById("headingAccount");
		const status = headingAccount.nextElementSibling;

		headingAccount.textContent = `${data.nom} ${data.prenom}`;
		status.textContent = `${data.status}`;


		//====== ON RETAPE LA PAGE POUR AFFICHER QUE L'ESSENTIEL ======
		pageContent.innerHTML = `
				
			<section id="overviewDocuments" class="container-fluid bg-white py-3">
				<section id="headDocumentsOverview" class="d-flex container-fluid m-0 justify-content-between px-3 pb-3">
										
				<h3>Documents</h3>
			
			</section>
			<section>
			
				<ul id="documentsList" class="d-flex gap-4 list-unstyled ps-2">

				</ul>

			</section>

			</section>

		`;


		//====== QUAND ON CHOISI LE PROJET A GERER ======
		const btnProj = document.getElementById("choixProj");
		const select = document.getElementById("projetSelect");

		btnProj.addEventListener("click", () => {

			const overlay = document.getElementById("projsOverlay");

			overlay.classList.toggle("d-none");
			overlay.classList.toggle("d-flex");
			overlay.classList.toggle("pb-4");

			currentProj.parentElement.parentElement.classList.toggle("pb-4");
			currentProj.parentElement.parentElement.classList.toggle("pb-2");

			select.innerHTML = `<option value="none">Aucuns</option>`; //Besoin de réinitialiser la liste pour pas avoir de doublons
			
			const queryProj = query(collection(db, "Projets"), where("nom", "==", `${data.projets}`));
			getDocs(queryProj).then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					let option = document.createElement("option");
					option.textContent = `${doc.data().nom}`;
					option.value = `${doc.data().nom}`;

					select.appendChild(option);
				})
			});

			select.addEventListener("mouseleave", () => {

				if (select.value != "none"){

					currentProj.textContent = `${select.value}`;
					currentProj.value = `${select.value}`;
					overlay.classList.toggle("d-flex");
					overlay.classList.toggle("d-none");
				}
			})

		})
		
		select.addEventListener("focusout", () => {
			
			const documentList = document.getElementById("documentsList");
			const queryProj = query(collection(db, "Projets"), where("nom", "==", `${currentProj.textContent}`));
			
			getDocs(queryProj)
			.then((proj) => {

				const listRef = ref(storage, `${proj.docs[0].id}`);
				
				listAll(listRef)
				.then((doc) => {

					doc.prefixes.forEach((folderRef) => {
			
						listAll(folderRef)
						.then((taskRef) => {
			
							taskRef.prefixes.forEach((folderRef) => {
			
								listAll(folderRef)
								.then((itemRef) => {
			
									itemRef.items.forEach((item) => {
			
										getMetadata(item)
										.then((metadata) =>{
				
											const li = document.createElement("li");
											const timeCreatedDays = metadata.timeCreated.substring(0, 10);
											const timeCreatedHours = metadata.timeCreated.substring(11, 19);
											
											li.classList = "text-center";
											li.style = "width: fit-content; cursor: pointer;";
											li.innerHTML = `
				
												<p>${metadata.name}</p>
				
												<section id="docMeta">
													<p>${metadata.contentType}</p>
													<p>${timeCreatedDays}/${timeCreatedHours}</p>
												</section>
				
											`;

											li.addEventListener("click", () => {

												getDownloadURL(ref(storage, `${metadata.fullPath}`))
												.then((url) => {
													open(url);
												})
											})
				
											documentList.appendChild(li);
				
										})
										.catch((error) => {
											console.log(error.code);
											console.log(error.message);
										})
									})
								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								})
							})
						})
						.catch((error) => {
							console.log(error.code);
							console.log(error.message);
						})
					})
				})
				.catch((error) => {
					console.log(error.code);
					console.log(error.message);
				})
				
			})
	
		})

	});

	


	const navGestion = document.getElementById("navGestion");
	navGestion.remove();

	const sidebarContent = document.getElementById("sidebarContent");
	sidebarContent.classList.remove("overflow-y-scroll");

	const sidebarWidgets = document.getElementById("widWrapper");
	sidebarWidgets.remove();

	const hpanel = document.getElementById("hPanel");
	hpanel.remove();

	const main = document.querySelector("#pageContent main");
	main.style = "overflow: hidden;";

	const projsFooter = document.querySelector("#projsOverlay #projsFooter");
	projsFooter.remove();

	const projsOverlay = document.querySelector("#projsOverlay");
	projsOverlay.firstElementChild.classList.add("container-fluid");

}


export { clientAccount };