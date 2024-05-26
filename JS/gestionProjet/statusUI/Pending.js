
import { db, auth } from "../../database/require.js";
import { closeModal } from "../components/functions.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, getDocs, collection, setDoc, deleteDoc, Timestamp, addDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { currentProj, pageContent } from "../gestionProj.js";

function pendingAccount(){
	
	onAuthStateChanged(auth, (user) => {
	
		if (user){
			
			const userDoc = getDoc(doc(db, "Users", user.uid)); //Récupère un document parce que les infos utilisateurs secondaires sont référencées dans un document
			
			userDoc.then((snapshot) => {
				
				const data = snapshot.data();
				
				if (data.status == "Pending"){
	
	
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
	
				}else{
	
					//Changement de status vu qu'il est validé
					const headingAccount = document.getElementById("headingAccount");
					const status = headingAccount.nextElementSibling;
	
					headingAccount.textContent = `${data.nom} ${data.prenom}`;
					status.textContent = `${data.status}`;
				};
			})
	
			//Regarde si le compte est un compte admin
			getDoc(doc(db, "SuperAdmins", user.uid))
			.then((snapshot) => {
	
				const data = snapshot.data();
	
				if (data.nom || data.prenom){
					const headingAccount = document.getElementById("headingAccount");
					const status = headingAccount.nextElementSibling;
	
					headingAccount.textContent = `${data.nom} ${data.prenom}`;
					status.textContent = `${data.status}`;
				}
			}).catch((error) => {
	
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
	
					const tasksList = document.getElementById("tasksList");
					const clientsList = document.getElementById("clientsList");
					const membresList = document.getElementById("membresList");
	
					//Génération de la liste des tâches
					getDocs(collection(db, "Projets", `${currentProj.textContent}`, "Taches"))
					.then((snapshot) => {
	
						snapshot.docs.forEach((docTask) => {
	
							const data = docTask.data();
							const li = document.createElement("li");
	
							li.innerHTML = `
							
								<section class="d-flex taskHeader border-bottom border-secondary gap-3">
									<p class="m-0 typTxtOrdi16"><span>[${data.status}]</span> ${data.nom}</p>
										
								</section>
								<section class="d-flex flex-column mt-2">
									<p class="m-0 typTxtOrdi16" style="font-size: 9pt; color: var(--irisBlue);">Du ${data.dateDebut} au ${data.dateFin}</p>
									<p class="my-1 typTxtOrdi16It" style="font-size: 10pt;">${data.description}</p>
									<form>
	
										<!--Barre de progression-->
										<input type="range" min="0" max="100" step="1" value="${data.progression}" class="range">
									</form>
								</section>
							
							`;
							
							tasksList.appendChild(li);
	
							//Création de la barre de progression
							const range = document.getElementsByClassName("range");
	
							Array.from(range).forEach((rangeElmnt) => {
								
								rangeElmnt.addEventListener("focus", () => {
	
									if (rangeElmnt.value != data.progression){
										updateDoc(doc(db, `Projets/${currentProj.textContent}/Taches`, `${docTask.id}`), {
											progression: rangeElmnt.value
										})
									}
								})	
							})
	
						})
					})
	
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
	
				select.addEventListener("focusout", () => {
	
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
					addDoc(collection(db, "Projets", `${currentProj.textContent}`, "Taches"), {
						nom: `${newTaskForm["nameTask"].value}`,
						description: `${newTaskForm["descTask"].value}`,
						status: `${newTaskForm["statusTask"].value}`,
						dateDebut: newTaskForm["dateD"].value,
						dateFin: newTaskForm["dateF"].value,
						roles: roles,
						progression: 0
					})
		
					closeModal(newTaskModal);
	
					const tasksList = document.getElementById("tasksList");
	
					getDocs(collection(db, "Projets", `${currentProj.textContent}`, "Taches"))
					.then((snapshot) => {
	
						snapshot.docs.forEach((doc) => {
	
							const data = doc.data();
							const li = document.createElement("li");
	
							li.innerHTML = `
							
								<section class="d-flex flex-column taskHeader">
									<p>${data.nom}</p>
									<div>
										<p>Du ${data.dateD} au ${data.dateF}</p>
									
									</div>
			
								</section>
								<section>
									<p>Status ${data.status}</p><br>
									<p>${data.description}</p>
								</section>
							
							`;
	
							tasksList.appendChild(li);
	
						})
					})
	
				}
	
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
	
			const imgSignOut = document.getElementById("imgProfil");
			imgSignOut.addEventListener("click", () => {
	
				signOut(auth).then(() => {
				// Sign-out successful.
				}).catch((error) => {
					console.log(error.code);
					console.log(error.message);
				});
			})
	
		}else{
	
			open("../../../connexion.html", "_self");
		}
	})

}

export { pendingAccount };