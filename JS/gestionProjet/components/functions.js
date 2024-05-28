
import { db, auth, storage } from "../../database/require.js";
import { doc, getDocs, getDoc, collection, setDoc, deleteDoc, updateDoc, where, query} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { deleteUser, signInWithEmailAndPassword, updateEmail, updatePassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { ref, getMetadata, uploadBytes, listAll, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

import { currentProj, userBroadcast } from "../gestionProj.js";

//====== Roles Create ======

function assignMember(projet, user){

	updateDoc(doc(db,"Users", user.id), {
		status: "Membre",
		projets: projet,
		role: "pending"
	})
}

function assignClient(projet, user){

	updateDoc(doc(db,"Users", user.id), {
		status: "Client",
		projets: projet,
		role: "pending"
	})
}


//====== Rendu html des users en attente ======

function renderPending(wrapper){

	const usersList = document.getElementById("usersList");
	usersList.innerHTML = "";

	//Recupération des documents de la collection Users dans le projet en question
	const queryPending = query(collection(db, "Users"), where("status", "==", "Pending"));
	const querySnapshot = getDocs(queryPending);
				
	querySnapshot.then((snapshot) => {

		snapshot.docs.forEach(penDoc=> {

			const lastName = penDoc.data().nom;
			const firstName = penDoc.data().prenom;
			const email = penDoc.data().email;
			const mdp = penDoc.data().mdp;
			let status = penDoc.data().status;
	
			let li = document.createElement("li");
	
			li.setAttribute("class", "d-flex container-fluid p-0 pe-2 m-0 justify-content-between");
			li.id = penDoc.id;
	
			const renderUI = `
			
				<div id="idWrapper" class="col-8 d-flex gap-2">
					<img src="../../../images/images_profils/ppTest.jpg" alt="Photo de profil de l'utilisateur." id="ppUser" class="col-6 img-thumbnail rounded-circle" style="max-width: 30%;">
					
					<section id="idUser" class="d-flex flex-column" style="flex: auto;">
						
						<div class="d-flex align-items-center gap-1">
							<p class="m-0 typTxtOrdi16 fs-5">${lastName} ${firstName}</p>
							<span class="typTxtOrdi16 fs-5">|</span>
							<p class="m-0 typTxtOrdi16 fs-6" style=""height: fit-content>date</p>
						</div>
						
						<div id="wrapperUserId" class="d-flex flex-column">
							<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Status: <span>${status}</span></p>
							<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Email: <span>${email}</span></p>
							<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Mot de passe: <span>${mdp}</span></p>
						</div>
					</section>
				</div>
				
				<div class="d-flex flex-column col-4 btnWrapper align-items-center justify-content-center gap-1">
					
					<button id="validerBtn" class="btn">
	
						<i id="validerIco" class='bx bxs-check-square bx-lg' style='color:#51ff00'></i>
	
					</button>
	
					<button id="modifBtn" class="btn text-white" style="background-color: var(--irisBlue); height: fit-content;">Modifier</button>
					
					<button id="refusBtn" class="btn text-white bg-danger" style="height: fit-content;">Refuser</button>
					
				</div>
			
			`;
	
			li.innerHTML = renderUI;

			//Interaction après récupération
			li.addEventListener("click", (event) => {

				//Definition de l'état de modification
				const modifyingState = `
					
					<form class="d-flex justify-content-center container-fluid p-0 m-0">
						<div id="idWrapper" class="col-8 d-flex align-items-center gap-3">
							<img src="../../../images/images_profils/ppTest.jpg" alt="Photo de profil de l'utilisateur." id="ppUser" class="col-6 img-thumbnail rounded-circle" style="max-width: 30%;">
							
							<section id="idUser" class="d-flex flex-column" style="flex: auto;">
								
								<div class="d-flex align-items-center gap-1">
									<p class="m-0 typTxtOrdi16 fs-5">Nom Prénom</p>
									<span class="typTxtOrdi16 fs-5">|</span>
									<p class="m-0 typTxtOrdi16 fs-6" style=""height: fit-content>date</p>
								</div>
								
								<div class="d-flex flex-column">
									<label for="status" class="m-0 typTxtOrdi16" style="font-size: 9pt;">Status: </label>
									<input type="text" id="status" name="status" placeholder="Membre ou Client" class="border border-secondary rounded-3" required>
	
									<label for="email" class="m-0 typTxtOrdi16" style="font-size: 9pt;">Email: </label>
									<input type="email" id="email" name="email" placeholder="${email}" class="border border-secondary rounded-3">
	
									<label for="mdp" class="m-0 typTxtOrdi16" style="font-size: 9pt;">Mot de passe: </label>
									<input type="text" id="mdp" name="mdp" placeholder="${mdp}" class="border border-secondary rounded-3">
	
								</div>
							</section>
						</div>
					
						<div class="d-flex flex-column col-4 btnWrapper align-items-center justify-content-end pb-3 gap-1">
							
							<button id="finModif" type="button" class="btn text-white" style="background-color: green; height: fit-content;">Terminer</button>
							
							<button type="reset" class="btn" style="height: fit-content; background-color: white; color: var(--irisBlue); border: solid 5px var(--irisblue);">Réinitialiser</button>
							
							<button id="annuler" type="button" class="btn" style="height: fit-content; background-color: white; color: var(--irisBlue); border: solid 5px var(--irisblue);">Annuler</button>
							
						</div>
					</form>
				
				`;

				if (event.target.id == "modifBtn"){
	
					li.classList.toggle("modifying");
	
					li.innerHTML = modifyingState;
	
				}else if (event.target.id == "finModif"){
	
					//const inputStatus = document.querySelector(`main section#${wrapper.id} form input#status`);
					const inputEmail = document.querySelector(`main section#${wrapper.id} form input#email`);
					const inputMdp = document.querySelector(`main section#${wrapper.id} form input#mdp`);
					const inputStatus = document.querySelector(`main section#${wrapper.id} form input#status`);

					//Modification des infos utilisateur

					//Besoin de se connecter au compte en question si modification d'email et de mot de passe
					getDoc(doc(db, "SuperAdmins", `${auth.currentUser.uid}`)).then((snapshot) => { //Recupérer les infos du modificateur pour pouvoir se reconnecter au compte initial après coups
						
						if (snapshot.data().nom == "Dirigeant") {

							signInWithEmailAndPassword(auth, email, mdp)
							.then(() => {
								
								//UpdateEmail
								updateEmail(auth.currentUser, `${inputEmail.value}`)
								.then(() => {

									//Le mail est changé
									//Besoin de vérifier instantanément le mail pour qu'il soit valable
									sendEmailVerification(auth.currentUser)
									.then(() => {
										//Email sent
									})
									
									//Besoin de rajouter un renvois d'infos par toast
								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								})
			
								//UpdatePassword
								updatePassword(auth.currentUser, `${inputMdp.value}`)
								.then(() => {
									//Le mot de passe est changé
								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								})

								signInWithEmailAndPassword(auth, "SadminDir@agence-1ris.com", "$4Dm1nD1r ")
									.then(() => {

										//reconnecté à l'utilisateur précédent
									})
									.catch((error) => {

										console.log(error.code);
										console.log(error.message);
								});

							})
						}else if (snapshot.data().nom == "ChefProj"){
							signInWithEmailAndPassword(auth, email, mdp)
							.then(() => {

								//UpdateEmail
								updateEmail(auth.currentUser, `${inputEmail.value}`)
								.then(() => {

									//Le mail est changé
									//Besoin de vérifier instantanément le mail pour qu'il soit valable
									sendEmailVerification(auth.currentUser)
									.then(() => {
										//Email sent
									})
									
									//Besoin de rajouter un renvois d'infos par toast
								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								})
			
								//UpdatePassword
								updatePassword(auth.currentUser, `${inputMdp.value}`)
								.then(() => {
									//Le mot de passe est changé
								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								})

								//l'utilisateur a été supprimé
								signInWithEmailAndPassword(auth, "SadminChefProj@agence-1ris.com", "$4Dm1nCh3F")
								.then(() => {

									//reconnecté à l'utilisateur précédent
								})
								.catch((error) => {

									console.log(error.code);
									console.log(error.message);
								});
							})
						}
					})


					li.classList.toggle("modifying");

					if (inputEmail.value != ""){

						email = inputEmail.value;

						
						//Changer les infos dans la bdd
						updateDoc(doc(db, "Users", `${penDoc.id}`), {
							email: inputEmail.value
						})

					}if(inputMdp.value != ""){

						mdp = inputMdp.value;

						
						//Changer les infos dans la bdd
						updateDoc(doc(db, "Users", `${penDoc.id}`), {
							mdp: inputMdp.value
						})
					}if(inputStatus.value != ""){
						
						status = inputStatus.value;

						//Changer les infos dans la bdd
						updateDoc(doc(db, "Users", `${penDoc.id}`), {
							status: inputStatus.value
						})
					}


					//Changer les infos de la bdd
					li.innerHTML = renderUI;

					let wrapperUser = document.getElementById("wrapperUserId");
					wrapperUser.innerHTML = `
					
						<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Statut: <span>${status}</span></p>
						<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Email: <span>${email}</span></p>
						<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Mot de passe: <span>${mdp}</span></p>
					
					`;
	
				}else if (event.target.id == "annuler"){

					li.classList.toggle("modifying");
					
					li.innerHTML = renderUI;
					
					let wrapperUser = document.getElementById("wrapperUserId");

					wrapperUser.innerHTML = `
					
						<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Statut: <span>${status}</span></p>
						<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Email: <span>${email}</span></p>
						<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Mot de passe: <span>${mdp}</span></p>
					
					`;
				
				
				}else if (event.target.id == "refusBtn"){

					//Besoin de se connecter au compte à supprimer (obligatoire)
					deleteDoc(doc(db, "Users", penDoc.id));

					getDoc(doc(db, "SuperAdmins", auth.currentUser.uid)).then((snapshot) => {
						
						if (snapshot.data().nom == "Dirigeant") {
							
							signInWithEmailAndPassword(auth, email, mdp)
							.then(() => {

								deleteUser(auth.currentUser)
								.then(() => {
									
									//l'utilisateur a été supprimé
									signInWithEmailAndPassword(auth, "SadminDir@agence-1ris.com", "$4Dm1nD1r ")
									.then(() => {

										//reconnecté à l'utilisateur précédent
									})
									.catch((error) => {

										console.log(error.code);
										console.log(error.message);
									});

								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								})

							})
							.catch((error) => {

								console.log(error.code);
								console.log(error.message);
							});

						}else if (snapshot.data().nom == "ChefProj"){
							signInWithEmailAndPassword(auth, email, mdp)
							.then(() => {

								deleteUser(auth.currentUser)
								.then(() => {
									
									//l'utilisateur a été supprimé
									signInWithEmailAndPassword(auth, "SadminChefProj@agence-1ris.com", "$4Dm1nCh3F")
									.then(() => {

										//reconnecté à l'utilisateur précédent
									})
									.catch((error) => {

										console.log(error.code);
										console.log(error.message);
									});

								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								})

							})
							.catch((error) => {

								console.log(error.code);
								console.log(error.message);
							});
						}
					})
	
				}else if (event.target.id == "validerBtn" || event.target.id == "validerIco"){

					if (status == "Membre"){
						
						assignMember(currentProj.textContent, penDoc);

					}else if(status == "Client"){

						assignClient(currentProj.textContent, penDoc);

					}

					li.remove();
	
				}
			})

			return usersList.appendChild(li);
		})
	});

}

//FERMER LE MODAL ACTUEL
function closeModal(nomModal){

	const modalBackdrop = document.querySelector("div.modal-backdrop");
	const body = document.getElementsByTagName("body")[0];

	body.style = "";
	body.classList.remove("modal-open");

	nomModal.style = "display: none;";
	
	if (modalBackdrop) {
		modalBackdrop.remove();
	}

}

function taskRenderAdmin(){

	const tasksList = document.getElementById("tasksList");

	//Génération de la liste des tâches
	const queryProj = query(collection(db, "Projets"), where("nom", "==", `${currentProj.textContent}`));

	getDocs(queryProj)
	.then((snapshot) => {

		const proj = snapshot.docs[0];
		
		//const queryAssignes = query(collection(db, "Projets", `${proj.id}`, "Taches"), where("assignes"));
		getDocs(collection(db, "Projets", `${proj.id}`, "Taches"))
		.then((taskRef) => {

			taskRef.docs.forEach((task) => {

				const data = task.data();

				const li = document.createElement("li");
				li.id = `${task.id}`;

				li.innerHTML = `
				
					<section class="d-flex taskHeader border-bottom border-secondary justify-content-between pb-1">
						<div class="d-flex gap-3 align-items-center">
							<p class="m-0 typTxtOrdi16"><span>[${data.status}]</span> ${data.nom}</p>
							<p class="assignedMembers list-unstyled m-0" style="height: fit-content;"></p>
							<button id="${task.id}" type="button" class="assignTaskMemberBtn btn" data-bs-toggle="modal" data-bs-target="#modalAddMembre">Ajouter un membre</button>
						</div>
						<div>
							<button id="${task.id}" type="button" class="remTask btn bg-danger text-white">Supprimer</button>
						</div>
							
					</section>
					<section class="d-flex flex-column mb-3 mt-2">
						<p class="m-0 typTxtOrdi16" style="font-size: 9pt; color: var(--irisBlue);">Du ${data.dateDebut} au ${data.dateFin}</p>
						<p class="my-1 typTxtOrdi16It" style="font-size: 10pt;">${data.description}</p>
						<form class="mt-3">
							<!--Barre de progression-->
							<input type="range" min="0" max="100" step="1" value="${data.progression}" class="range">
						</form>
					</section>
				
				`;

				const assignedMembers = li.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;

				getDoc(doc(db, `Projets/${proj.id}/Taches`, task.id))
				.then((snapshot) => {

					const data = snapshot.data();
					const nb = data.assignes;

					assignedMembers.textContent = `${nb.length} membres assignés`;

				})

				//====== AJOUTER UN MEMBRE A LA TACHE ====== 
				li.addEventListener("click", (event) => {

					if (event.target.classList.contains("assignTaskMemberBtn")){

						const queryAssignMembers = query(collection(db, "Users"), where("status", "==", "Membre"));
						const membersAssign = document.getElementById("membersAssign");
						
						membersAssign.innerHTML = "<option value='none'>Aucuns</option>";
						
						getDocs(queryAssignMembers)
						.then((snapshot) => {
							
							snapshot.docs.forEach((membre) => {
		
								const data = membre.data();
		
								const option = document.createElement("option");
								option.value = `${membre.id}`
								option.textContent = `${data.nom} ${data.prenom}`;
		
								membersAssign.appendChild(option);
							})
						})

						const modalAddMembre = document.getElementById("modalAddMembre");
						const addMember = document.getElementById("addMember");
						addMember.addEventListener("click", () => {

							let taches = [];
							let assignes = [];
							
							//Récupérer le tableau de taches assignées
							getDoc(doc(db, `Users`, membersAssign.value))
							.then((snapshot) => {

								const data = snapshot.data();

								taches = data.taches;
								taches.push(event.target.id);
							})

							taches.push(event.target.id); 

							//Récupérer le membre assigné dans la tache
							getDoc(doc(db, `Projets/${proj.id}/Taches`, task.id))
							.then((snapshot) => {

								const data = snapshot.data();

								assignes = data.assignes;

							})

							getDoc(doc(db, "Users", `${membersAssign.value}`))
							.then((snapshot) => {
								
								assignes.push(snapshot.id);
								
								updateDoc(doc(collection(db, "Projets", `${proj.id}`, "Taches"), `${event.target.id}`), {
									assignes: assignes
								})

								updateDoc(doc(db, "Users", snapshot.id), {
									taches: taches
								})
								
								closeModal(modalAddMembre);
							})
							.catch((error) => {
								console.log(error.code);
								console.log(error.message);
							})




						})

					}else if (event.target.classList.contains("remTask")){

						deleteDoc(doc(db, `Projets/${proj.id}/Taches`, event.target.id));

						li.remove();

						const listRef = ref(storage, `${proj.id}/${task.id}`);

						listAll(listRef)
						.then((doc) => {

							doc.prefixes.forEach((folderRef) => {
								
								listAll(folderRef)
								.then((itemRef) => {

									itemRef.items.forEach((item) => {

										const remRef = ref(storage, item.fullPath);

										deleteObject(remRef)
										.then(() => {
											//File removed
										})
										.catch((error) => {
											console.log(error.code);
											console.log(error.message);
										})

									})
								})
							})
						})
						.catch((error) => {
							console.log(error.code);
							console.log(error.message);
						})
					}
				})
					

				//Génération de la liste des documents ("prefixes" ce sont des dossiers et "items" ce sont les fichiers)
				const docOverview = document.createElement("section");

				docOverview.classList = "d-flex flex-column gap-3";
				docOverview.innerHTML = `

					<div class="d-flex container-fluid justify-content-between pb-2 border-bottom border-secondary">
						<p class="m-0 typTxtOrdi16" style="font-size: 14pt;">Documents récents:</p>
						<button id="${task.id}" class="btn text-white" style="background-color: var(--irisBlue);" data-bs-toggle="modal" data-bs-target="#modalAddDoc">Ajouter un document à la tâche</button>
					</div>
					
				`;

				const docList = document.createElement("ul");
				docList.classList = "d-flex gap-4 list-unstyled px-2";

				const listRef = ref(storage, `${proj.id}/${task.id}`);

				listAll(listRef)
				.then((doc) => {

					doc.prefixes.forEach((folderRef) => {
						
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


									docList.appendChild(li);

								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								})
							})
						})
					})
				})
				.catch((error) => {
					console.log(error.code);
					console.log(error.message);
				})
				

				//Création de la barre de progression
				const range = document.getElementsByClassName("range");
				
				Array.from(range).forEach((rangeElmnt) => {
					
					rangeElmnt.addEventListener("focus", () => {
						
						if (rangeElmnt.value != data.progression){

							const queryProj = query(collection(db, "Projets"), where("nom", "==", `${currentProj.textContent}`));
							
							getDocs(queryProj)
							.then((proj) => {

								getDocs(collection(db, "Projets", `${proj.docs[0].id}`, "Taches"))
								.then((taskRef) => {
									
									taskRef.docs.forEach((task) => {
										
										if (task.id == rangeElmnt.parentElement.parentElement.parentElement.id){

											updateDoc(doc(db, `Projets/${proj.docs[0].id}/Taches`, `${task.id}`), {
												progression: rangeElmnt.value
											})

										}

									})

								})
							})
							.catch((error) => {
								console.log(error.code);
								console.log(error.message);
							})
						}
					})	
				})

				docOverview.appendChild(docList);
				li.appendChild(docOverview);
				tasksList.appendChild(li);


				//====== LISTENER DU CLICK POUR AJOUTER UN DOCUMENT ======
				const modalAddDoc = document.getElementById("modalAddDoc");
				const addDoc = document.getElementById("addDoc"); //Boutton du modal
				const docInput = document.getElementById("documentInput");
				const btnAddDocTask = document.getElementById(task.id);

				btnAddDocTask.addEventListener("click", () => {

					const target = btnAddDocTask.id;

					addDoc.addEventListener("click", () => {
					
						const file = docInput.files[0];
		
						if (file.type.includes("image")){
							const fileRef = ref(storage, `${proj.id}/${target}/images/${file.name}`);
							const metadata = {
								contentType: `${file.type}`
							}
		
							uploadBytes(fileRef, file, metadata)
							.then((snapshot) => {
								//Le fichier a été mis en ligne !
							})
							.catch((error) => {
								console.log(error.code);
								console.log(error.message);
							});
		
							closeModal(modalAddDoc);
		
						}else if (file.type.includes("pdf")){
							const fileRef = ref(storage, `${proj.id}/${target}/pdfs/${file.name}`);
							const metadata = {
								contentType: `${file.type}`
							}
		
							uploadBytes(fileRef, file, metadata)
							.then((snapshot) => {
								//Le fichier a été mis en ligne !
							})
							.catch((error) => {
								console.log(error.code);
								console.log(error.message);
							});
		
							closeModal(modalAddDoc);
		
						}else if (file.type.includes("video")){
							const fileRef = ref(storage, `${proj.id}/${target}/videos/${file.name}`);
							const metadata = {
								contentType: `${file.type}`
							}
		
							uploadBytes(fileRef, file, metadata)
							.then((snapshot) => {
								//Le fichier a été mis en ligne !
							})
							.catch((error) => {
								console.log(error.code);
								console.log(error.message);
							});
		
							closeModal(modalAddDoc);
		
						}
	
						
					})

				})
			})


		})
	})
}



function taskRenderMembre(){

	//Génération de la liste des tâches
	const queryProj = query(collection(db, "Projets"), where("nom", "==", `${currentProj.textContent}`));
	
	getDocs(queryProj)
	.then((snapshot) => {
		
		const proj = snapshot.docs[0];
		
		//Recupération des tâches en fonction des assignations
		getDoc(doc(db, "Users", userBroadcast.uid))
		.then((user) => {

			const data = user.data();
			const assignedTasks = data.taches;

			assignedTasks.forEach((tasksId) => {
				
				getDoc(doc(db, `Projets/${proj.id}/Taches`, tasksId))
				.then((task) => {

					console.log(task);
					const data = task.data();
		
					const li = document.createElement("li");
		
					li.innerHTML = `
					
						<section class="d-flex taskHeader border-bottom border-secondary gap-3">
							<p class="m-0 typTxtOrdi16"><span>[${data.status}]</span> ${data.nom}</p>
								
						</section>
						<section class="d-flex flex-column mb-3 mt-2">
							<p class="m-0 typTxtOrdi16" style="font-size: 9pt; color: var(--irisBlue);">Du ${data.dateDebut} au ${data.dateFin}</p>
							<p class="my-1 typTxtOrdi16It" style="font-size: 10pt;">${data.description}</p>
							<form class="mt-3">
		
								<!--Barre de progression-->
								<section class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
									<div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${data.progression}%"></div>
								</div>
		
							</form>
						</section>
					
					`;
		
					//Génération de la liste des documents ("prefixes" ce sont des dossiers et "items" ce sont les fichiers)
					const docOverview = document.createElement("section");
		
					docOverview.classList = "d-flex flex-column gap-3";
					docOverview.innerHTML = `
		
						<div class="d-flex container-fluid justify-content-between pb-2 border-bottom border-secondary">
							<p class="m-0 typTxtOrdi16" style="font-size: 14pt;">Documents récents:</p>
							<button id="${task.id}" class="btn text-white" style="background-color: var(--irisBlue);" data-bs-toggle="modal" data-bs-target="#modalAddDoc">Ajouter un document à la tâche</button>
						</div>
						
					`;
		
					const docList = document.createElement("ul");
					docList.classList = "d-flex gap-4 list-unstyled px-2";
		
					const listRef = ref(storage, `${proj.id}/${task.id}`);
		
					listAll(listRef)
					.then((doc) => {
		
						doc.prefixes.forEach((folderRef) => {
							
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
		
		
										docList.appendChild(li);
		
									})
									.catch((error) => {
										console.log(error.code);
										console.log(error.message);
									})
								})
							})
						})
					})
					.catch((error) => {
						console.log(error.code);
						console.log(error.message);
					})
					
		
					//Création de la barre de progression
					const range = document.getElementsByClassName("range");
					
					Array.from(range).forEach((rangeElmnt) => {
						
						rangeElmnt.addEventListener("focus", () => {
							
							if (rangeElmnt.value != data.progression){
		
								const queryProj = query(collection(db, "Projets"), where("nom", "==", `${currentProj.textContent}`));
								
								getDocs(queryProj)
								.then((proj) => {
									console.log(proj);
								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								})
		
								//updateDoc(doc(db, `Projets/${currentProj.textContent}/Taches`, `${docTask.id}`), {
								//	progression: rangeElmnt.value
								//})
							}
						})	
					})
		
					docOverview.appendChild(docList);
					li.appendChild(docOverview);
					tasksList.appendChild(li);
		
		
					//====== LISTENER DU CLICK POUR AJOUTER UN DOCUMENT ======
					const modalAddDoc = document.getElementById("modalAddDoc");
					const addDoc = document.getElementById("addDoc"); //Boutton du modal
					const docInput = document.getElementById("documentInput");
					const btnAddDocTask = document.getElementById(task.id);
		
					btnAddDocTask.addEventListener("click", () => {
		
						const target = btnAddDocTask.id;
		
						addDoc.addEventListener("click", () => {
						
							const file = docInput.files[0];
		
							if (file.type.includes("image")){
								const fileRef = ref(storage, `${proj.id}/${target}/images/${file.name}`);
								const metadata = {
									contentType: `${file.type}`
								}
		
								uploadBytes(fileRef, file, metadata)
								.then((snapshot) => {
									//Le fichier a été mis en ligne !
								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								});
		
								closeModal(modalAddDoc);
		
							}else if (file.type.includes("pdf")){
								const fileRef = ref(storage, `${proj.id}/${target}/pdfs/${file.name}`);
								const metadata = {
									contentType: `${file.type}`
								}
		
								uploadBytes(fileRef, file, metadata)
								.then((snapshot) => {
									//Le fichier a été mis en ligne !
								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								});
		
								closeModal(modalAddDoc);
		
							}else if (file.type.includes("video")){
								const fileRef = ref(storage, `${proj.id}/${target}/videos/${file.name}`);
								const metadata = {
									contentType: `${file.type}`
								}
		
								uploadBytes(fileRef, file, metadata)
								.then((snapshot) => {
									//Le fichier a été mis en ligne !
								})
								.catch((error) => {
									console.log(error.code);
									console.log(error.message);
								});
		
								closeModal(modalAddDoc);
		
							}
		
							
						})
		
					})
				})
			})
			

		})

	})
}

export { renderPending, closeModal, taskRenderAdmin, taskRenderMembre };