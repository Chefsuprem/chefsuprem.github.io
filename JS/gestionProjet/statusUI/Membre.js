
import { db, auth, storage } from "../../database/require.js";
import { closeModal, taskRender } from "../components/functions.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, getDocs, collection, setDoc, deleteDoc, Timestamp, addDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { ref, listAll, getMetadata, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

import { currentProj, pageContent, userBroadcast } from "../gestionProj.js";


function membreAccount(){
			
	getDoc(doc(db, "Users", userBroadcast.uid)) //Récupère un document parce que les infos utilisateurs secondaires sont référencées dans un document
	.then((snapshot) => {

		const data = snapshot.data();

		//Changement de status vu qu'il est validé
		const headingAccount = document.getElementById("headingAccount");
		const status = headingAccount.nextElementSibling;

		headingAccount.textContent = `${data.nom} ${data.prenom}`;
		status.textContent = `${data.status}`;


		//====== QUAND ON CHOISI LE PROJET A GERER ======
		const btnProj = document.getElementById("choixProj");
		btnProj.addEventListener("click", () => {

			const overlay = document.getElementById("projsOverlay");
			const select = document.getElementById("projetSelect");

			overlay.classList.toggle("d-none");
			overlay.classList.toggle("d-flex");
			overlay.classList.toggle("pb-4");

			currentProj.parentElement.parentElement.classList.toggle("pb-4");
			currentProj.parentElement.parentElement.classList.toggle("pb-2");

			select.classList.add("container-fluid");
			select.innerHTML = `<option value="none">Aucuns</option>`; //Besoin de réinitialiser la liste pour pas avoir de doublons
			
			const queryProj = query(collection(db, "Projets"), where("nom", "==", `${data.projets}`));

			getDocs(queryProj)
			.then((snapshot) => {
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

	})

	const widProfils = document.getElementById("widProfils");
	widProfils.remove();

	const projsFooter = document.getElementById("projsFooter");
	projsFooter.remove();


	//====== QUAND ON CLIQUE SUR "MY WORK" ======
	const triggerBtnWork = document.getElementById("triggerWork");
	let widgets = [];

	triggerBtnWork.addEventListener("click", () => {
		if (currentProj.textContent != "Aucun Projets"){

			//==== GENERATION DE LA PAGE DE WORK ====
			pageContent.classList = "working d-flex flex-column gap-3";
			pageContent.innerHTML = `
			
				<article id="overviewTasks" class="container-fluid bg-white py-3">
					
					<section id="headTasksOverview" class="d-flex container-fluid m-0 justify-content-between px-3 pb-3">
						
						<h3>Tâches</h3>
					
					</section>
					<section>
					
						<ul id="tasksList" class="d-flex flex-column gap-4 list-unstyled ps-2">

						</ul>

					</section>
				</article>
			
			`;

			taskRender();

		}else{
			alert("Vous devez choisir un projet valide pour pouvoir travailler dans votre espace de travail..")
		}
	})


	//====== QUAND ON CLIQUE SUR "HOME" ======
	const triggerHome = document.getElementById("home");

	triggerHome.addEventListener("click", () => {
		pageContent.classList = "home";
		pageContent.innerHTML = `
		
			<main style="height: 200vh; overflow: hidden;">

				<!--Positionnement des emplacements de widgets-->
				<section id="principal" class="bg-white container-fluid p-2 ps-4 mb-2 overflow-hidden" style="height: 20%;">
					<section id="titre" class="container-fluid m-0 p-0">
						<h3>Widget Principal</h3>
					</section>

				</section>
				<div class="wrapper d-flex flex-column" style="height: 60%;">
					<div class="row container-fluid m-0 p-0 justify-content-between gap-2 mb-2" style="height: 50%;">
						<section id="simple1" class="bg-white p-2 ps-4" style="flex: 6;">
							<section id="titre">
								<h3>Widget Simple 1</h3>

							</section>
			
						</section>
						<section id="simple2" class="bg-white p-2 ps-4" style="flex: 6;">
							<section id="titre">
								<h3>Widget Simple 2</h3>

							</section>
			
						</section>
					</div>
					<div class="row container-fluid m-0 p-0 justify-content-between gap-2 mb-2" style="height: 50%">
						<section id="simple3" class="bg-white p-2 ps-4" style="flex: 6;">
							<section id="titre">
								<h3>Widget Simple 3</h3>

							</section>
			
						</section>
						<section id="Simple4" class="bg-white p-2 ps-4" style="flex: 6;">
							<section id="titre">
								<h3>Widget Simple 4</h3>

							</section>
			
						</section>
					</div>
				</div>
				<section id="footer" class="bg-white container-fluid p-2 ps-4" style="height: 20%;">
					<section id="titre">
						<h3>Widget Footer</h3>

					</section>

				</section>
			</main>
		`;
	})


	const imgSignOut = document.getElementById("imgProfil");
	imgSignOut.addEventListener("click", () => {

		signOut(auth).then(() => {
		// Sign-out successful.
		}).catch((error) => {
			console.log(error.code);
			console.log(error.message);
		});
	})

}

export { membreAccount };