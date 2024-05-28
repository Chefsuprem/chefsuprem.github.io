
import { db, auth } from "../../database/require.js";
import { closeModal, taskRenderAdmin } from "../components/functions.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, getDocs, collection, setDoc, deleteDoc, Timestamp, addDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { uploadBytes, ref, listAll, getMetadata } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

import { currentProj, pageContent, userBroadcast } from "../gestionProj.js";
import { storage } from "../../database/require.js";


function adminAccount(){
			
	getDoc(doc(db, "SuperAdmins", userBroadcast.uid)) //Récupère un document parce que les infos utilisateurs secondaires sont référencées dans un document
	.then((snapshot) => {
		
		const data = snapshot.data();

		//Changement de status vu qu'il est validé
		const headingAccount = document.getElementById("headingAccount");
		const status = headingAccount.nextElementSibling;

		headingAccount.textContent = `${data.nom} ${data.prenom}`;
		status.textContent = `${data.status}`;

	})


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
						<button type="button" class="btn btn-primary bg-success" data-bs-toggle="modal" data-bs-target="#modalNewTask">Ajouter une tâche</button>
					
					</section>
					<section>
					
						<ul id="tasksList" class="d-flex flex-column gap-4 list-unstyled ps-2">

						</ul>

					</section>
				</article>
				<article id="overviewClients" class="container-fluid bg-white py-3">
					
					<section id="headClientsOverview" class="d-flex container-fluid m-0 justify-content-between px-3 pb-3">
						
						<h3>Clients</h3>
					
					</section>
					<section>
					
						<ul id="clientsList" class="d-flex gap-4 list-unstyled">
							<li id="addClient" class="card text-center rounded-4" style="width: 15rem; background-color: var(--gestionBg); border: dashed 3px var(--irisBlue);">
								<img src="..." class="card-img-top rounded-circle" alt="Image de présentation pour ajouter un client." style="border: dashed 3px var(--irisBlue);">
								<section class="card-body">
									<p class="card-text" style="color: var(--irisBlue)">Ajouter un client</p>
								</section>
								<section class="card-footer" style="background: none; border-top: none;">
									<button type="button" class="btn" style="border: dashed 3px var(--irisBlue) !important;">Ajouter</button>
								</section>
							</li>
						</ul>
					
					
					</section>
				</article>
				<article id="overviewMembres" class="container-fluid bg-white py-3">
					
					<section id="headMembresOverview" class="d-flex container-fluid m-0 justify-content-between px-3 pb-3">
						
						<h3>Membres</h3>
					
					</section>
					<section>
					
						<ul id="membresList" class="d-flex gap-4 list-unstyled">
							<li id="addMembre" class="card text-center rounded-4" style="width: 15rem; background-color: var(--gestionBg); border: dashed 3px var(--irisBlue);">
								<img src="..." class="card-img-top rounded-circle" alt="Image de présentation pour ajouter un membre." style="border: dashed 3px var(--irisBlue);">
								<section class="card-body">
									<p class="card-text" style="color: var(--irisBlue)">Ajouter un membre</p>
								</section>
								<section class="card-footer" style="background: none; border-top: none;">
									<button type="button" class="btn" style="border: dashed 3px var(--irisBlue) !important;">Ajouter</button>
								</section>
							</li>
						</ul>
					
					
					</section>
				</article>
			
			`;

			//==== AJOUT DE TACHES ====
	
			const newTaskModal = document.getElementById("modalNewTask");
			const newTaskBtn = document.getElementById("newTaskbtn");

			newTaskBtn.addEventListener("click", () => {

				const newTaskForm = document.querySelector("#modalNewTask form");

				
				if (newTaskForm["child"].value != "none"){

					////Changer le scope d'action sur le projet actuel + créer la tâche dedans
					//setDoc(doc(db, "Projets", `${currentProj.textContent}`, "Taches", `${newTaskForm["nameTask"].value}`), {
					//	description: `${newTaskForm["descTask"].value}`,
					//	status: `${newTaskForm["statusTask"].value}`,
					//	dateDebut: newTaskForm["dateD"].value,
					//	dateFin: newTaskForm["dateF"].value
					//})

					//closeModal(newTaskModal);

				}else{

					//Changer le scope d'action sur le projet actuel + créer la tâche dedans
					const queryProj = query(collection(db, "Projets"), where("nom", "==", `${currentProj.textContent}`));
					getDocs(queryProj)
					.then((snapshot) => {

						const proj = snapshot.docs[0];

						addDoc(collection(db, "Projets", `${proj.id}`, "Taches"), {
							nom: `${newTaskForm["nameTask"].value}`,
							description: `${newTaskForm["descTask"].value}`,
							status: `${newTaskForm["statusTask"].value}`,
							dateDebut: newTaskForm["dateD"].value,
							dateFin: newTaskForm["dateF"].value,
							roles: roles,
							progression: 0,
							assignes: []
						})
			
						closeModal(newTaskModal);
						taskRenderAdmin();

					})
					.catch((error) => {
						console.log(error.code);
						console.log(error.message);
					})

				}

			})

			taskRenderAdmin();

			const membresList = document.getElementById("membresList");
			const clientsList = document.getElementById("clientsList");

			//Génération de la liste des clients
			const queryClients = query(collection(db, "Users"), where("status", "==", "Client"));

			getDocs(queryClients)
			.then((snapshot) => {

				snapshot.docs.forEach((docClient) => {

					const data = docClient.data();
					const card = document.createElement("li");
					const addClient = document.getElementById("addClient");

					card.classList = "card text-center";
					card.style = "width: 15rem; background-color: var(--gestionBg);"
					card.innerHTML = `
					
						<img src="..." class="card-img-top" alt="Photo de profil du client.">
						<section class="card-body">
							<p class="card-text">${data.nom} ${data.prenom}</p>
						</section>
						<section class="card-footer">
							<button type="button" class="btn btnPurp">Voir</button>
						</section>
					
					`;

					clientsList.insertBefore(card, addClient);
				})
			})

			//Génération de la liste des membres
			const queryMembres = query(collection(db, "Users"), where("status", "==", "Membre"));

			getDocs(queryMembres)
			.then((snapshot) => {

				snapshot.docs.forEach((docMembre) => {

					const data = docMembre.data();
					const card = document.createElement("li");
					const addMembre = document.getElementById("addMembre");

					card.classList = "card text-center";
					card.style = "width: 15rem; background-color: var(--gestionBg);"
					card.innerHTML = `
					
						<img src="..." class="card-img-top" alt="Photo de profil du membre.">
						<section class="card-body">
							<p class="card-text">${data.nom} ${data.prenom}</p>
						</section>
						<section class="card-footer">
							<button type="button" class="btn btnPurp">Voir</button>
						</section>
					
					`;

					membresList.insertBefore(card, addMembre);
				})
			})

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

		select.innerHTML = `<option value="none">Aucuns</option>`; //Besoin de réinitialiser la liste pour pas avoir de doublons
		
		getDocs(collection(db, "Projets")).then((snapshot) => {
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

		//==== Ajout de nouveaux projets ===
		const addModal = document.getElementById("modalNewProj");
		const addForm = document.querySelector("#modalNewProj form");
		const submitBtn = document.getElementById("submitNewProj")

		submitBtn.addEventListener("click", (event) => {

			const newProjNom = addForm["nameProj"].value;

			setDoc(doc(db, "Projets", `${newProjNom}`), {
				nom: `${newProjNom}`
			})

			closeModal(addModal);

		})

		//==== Suppression de projets ====
		const remModal = document.getElementById("modalRemProj");
		const remSelect = document.getElementById("removeProjetSelect");
		const remBtn = document.getElementById("remBtn");

		
		remSelect.innerHTML = ``; //Besoin de réinitialiser la liste pour pas avoir de doublons
		
		getDocs(collection(db, "Projets")).then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				let option = document.createElement("option");
				option.textContent = `${doc.data().nom}`;
				option.value = `${doc.data().nom}`;

				remSelect.appendChild(option);
			})
		});

		remBtn.addEventListener("click", () => {
			
			deleteDoc(doc(db, "Projets", `${remSelect.value}`));
			
			closeModal(remModal);
		})

	})


	//==== AJOUT DE ROLES ====
	const rolesList = document.getElementById("rolesList");
	const roleInput = document.getElementById("roleArea");
	const addRoleBtn = document.getElementById("addRoleBtn");
	let roles = [];

	addRoleBtn.addEventListener("click", () => {
		
		const li = document.createElement("li");
		const remBtn = document.createElement("btn");
		
		li.id = roleInput.value;
		li.style = "display: flex; width: fit-content;"
		li.classList.add("gap-2");
		li.classList.add("rounded-pill");
		li.innerHTML = `
		
			<p>${roleInput.value}</p>

		`;

		//=== SET LE BTN DE SUPPR + SON LISTENER PERSO ===
		remBtn.setAttribute("type", "button");
		remBtn.setAttribute("class", "btn-close");
		remBtn.addEventListener("click", () => {
			roles.splice(roles.indexOf(remBtn.previousElementSibling.textContent), 1);
			remBtn.parentNode.remove();
		})

		li.appendChild(remBtn);


		roles.push(`${roleInput.value}`);

		rolesList.appendChild(li);

		roleInput.value = "";

	})
}

export { adminAccount };