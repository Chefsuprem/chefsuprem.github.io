
import { db, auth } from "../../database/require.js";
import { doc, getDocs, getDoc, collection, setDoc, deleteDoc, updateDoc, where, query} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { deleteUser, signInWithEmailAndPassword, updateEmail, updatePassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { currentProj } from "../gestionProj.js";

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
								signInWithEmailAndPassword(auth, "SadminChefProj@agence-1ris.com", "$4Dm1nCh3F ")
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
									signInWithEmailAndPassword(auth, "SadminChefProj@agence-1ris.com", "$4Dm1nCh3F ")
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

	nomModal.style = "display: none;";
	modalBackdrop.remove();

}


export { renderPending, closeModal };