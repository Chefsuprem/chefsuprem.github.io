
import { db, auth } from "../../database/require.js";
import { collection, getDocs, doc, query, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { renderPending } from "./functions.js";

import { currentProj, pageContent } from "../gestionProj.js";


function assigner(emplacement, widget){

	if (currentProj.textContent != "Aucun Projets"){
		
		const titre = document.querySelector(`main section#${emplacement} section#titre h3`);
		const wrapper = document.querySelector(`main section#${emplacement}`);

		if (widget == "resuProj"){

			const resuProj = `

				<section id="titre" class="container-fluid m-0 p-0">
					<h3>Résumé des projets</h3>
				</section>

				<div class="wrapper d-flex pb-4 gap-2" style="height: 93%; max-height: 93%;">

					<section id="paggination" class="d-flex flex-column justify-content-center align-items-center">
						<i class='bx bxs-checkbox bx-lg' style="color: var(--irisBlue);"></i>
						<i class='bx bx-checkbox bx-md'></i>
						<i class='bx bx-checkbox bx-md'></i>
						<i class='bx bx-checkbox bx-md'></i>
						<i class='bx bx-checkbox bx-md'></i>
					</section>
				
					<ul id="content" class="row container-fluid h-100" style="max-height: 100%;">
				
						<li id="nomProjet" class="d-flex gap-4 py-2" style="max-height: inherit;">
							
							<section id="presProjet" class="d-flex flex-column gap-2 col-5" style="max-height: 100%;">
								
								<div class="position-relative rounded overflow-hidden" style='max-height: 80%; height: 80%; max-width: 100%; background-image: url("../../../images/images_projets/projet1.jpg"); background-position: center; background-size: cover;' alt="Image de présentation du projet.">
								
									<hgroup class="position-absolute bottom-0 start-0 text-white p-3 rounded-top-4" style="backdrop-filter: blur(1px); background-color: rgba(0, 0, 0, .5);">
									
										<h4>Titre Projet</h4>
										<p class="m-0">Description Projet</p>
						
									</hgroup>
								
								</div>
					
								<section class="d-flex justify-content-between align-items-center px-2">
					
									<section class="d-flex justify-content-between gap-2" style="max-width: 60%; width: 60%;">
										<div class="rounded-circle" style="background-image: url('../../../images/images_profils/ppTest.jpg'); background-position: center; background-size: cover; max-height: 4vw; width: 4vw; height: 4vw;"></div>
					
										<div class="d-flex col flex-column justify-content-center">
					
											<h5>Nom Prénom</h5>
											<p class="m-0">Client</p>
					
										</div>
									</section>
									<button class="text-white py-1 px-3 rounded" style="background-color: var(--irisPurple); border: none;">Voir Profil</button>
					
								</section>
					
							</section>
							<section id="presStats" class="d-flex flex-column col-7">
					
								<ul class="d-flex justify-content-around list-unstyled col-12" style="flex: auto;">
									
									<li class="d-flex flex-column align-items-center col-5">
						
										<h5>(nb) Membres</h5>
										<ul class="d-flex flex-column p-0 col-12">
									
											<li class="d-flex justify-content-between align-items-center">
												
												
												<div class="d-flex justify-content-between">
													
													<div class="rounded-circle" style="background-image: url('../../../images/images_profils/ppTest.jpg'); background-position: canter; background-size: cover; width: 3.5vw; height: 3.5vw;"></div>
									
													<section class="d-flex flex-column justify-content-center align-items-start ps-3">
														
														<h5 class="m-0 typTtrOrdi25 fs-6">Nom Prénom</h5>
														<p class="m-0 typTxtOrdi16" style="font-size: 10pt;">Rôle</p>
									
													</section>
												</div>
									
												<i class="bx bxs-checkbox-minus bx-lg" style="color: red;"></i>
											</li>
									
										</ul>
									</li>
									<li class="d-flex flex-column align-items-center col-5">
										<h5>(nb) Documents</h5>
										<ul class="d-flex flex-column p-0 col-12">
											<li class="d-flex justify-content-between align-items-center">
												<i class="bx bxs-video bx-md"></i>
												<div class="d-flex justify-content-between">
													<section class="d-flex flex-column justify-content-center align-items-start ps-3">
														<h5 class="m-0 typTtrOrdi25 fs-6">Nom document</h5>
														<p class="m-0 typTxtOrdi16" style="font-size: 10pt;">date de publication</p>
													</section>
													<i class="bx bxs-checkbox-minus bx-lg" style="color: red;"></i>
												</div>
											</li>
										</ul>
									
										
									</li>
								</ul>
								<section class="d-flex container-fluid m-0 p-0 px-4 justify-content-between align-items-center" style="max-width: 100%; max-height: 20%; height: 20%;">
						
									<div class="col-7 progress rounded-5 position-relative" role="progressbar">
										
										<div class="progress-bar text-end pe-2" style="width: 30%; background-color: green;">30%</div>
								
									</div>
								
									<p class="col-4 m-0 text-center">(nb) Tâches terminées</p>
								
								</section>
							</section>
						</li>
					</ul>
				</div>
			`;

			wrapper.innerHTML = resuProj;

		}else if (widget == "suiviTaches"){

			const suiviTaches = `

				<section id="titre" class="container-fluid m-0 p-0">
					<h3>Suivis de tâches</h3>
				</section>

				<section class="content mt-4">
					<ul id="suivisList" class="d-flex flex-column list-unstyled gap-4">

					</ul>
				</section>
			`;

			getDocs(collection(db, `Projets/${currentProj.textContent}/Taches`)).then((snapshot) => {
				const suivisList = document.getElementById("suivisList");
				
				snapshot.docs.forEach(doc => {
					const data = doc.data();
					const li = document.createElement("li");
					
					li.classList = "d-flex flex-column container-fluid p-0 m-0 align-items-center";
					li.innerHTML = `
					
						<p class="container-fluid p-0 mb-3 typTxtOrdi16 fs-6 border-bottom border-secondary">[${data.status}] ${data.nom}</p>

						<div class="progress container-fluid m-0 p-0" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
							<div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${data.progression}%"></div>
						</div>
					
					`;

					suivisList.appendChild(li);

				});

			});

			wrapper.innerHTML = suiviTaches;

		}else if (widget == "validation"){

			const defaultState = `
			
				<section id="titre" class="container-fluid m-0 p-0">
					<h3>Validation</h3>
				</section>
				
				<ul id="usersList" class="list-unstyled container-fluid p-0 pt-3 m-0">
					
				</ul>
			
			`;

			wrapper.innerHTML = defaultState;

			renderPending(wrapper);

			//const wrapperUserId = document.getElementById("wrapperUserId");


					//function changedState(status, email, mdp){
					
					//	return(`	

					//		<div id="idWrapper" class="col-8 d-flex gap-2">
					//			<img src="../../../images/images_profils/ppTest.jpg" alt="Photo de profil de l'utilisateur." id="ppUser" class="col-6 img-thumbnail rounded-circle" style="max-width: 30%;">
								
					//			<section id="idUser" class="d-flex flex-column" style="flex: auto;">
									
					//				<div class="d-flex align-items-center gap-1">
					//					<p class="m-0 typTxtOrdi16 fs-5">Nom Prénom</p>
					//					<span class="typTxtOrdi16 fs-5">|</span>
					//					<p class="m-0 typTxtOrdi16 fs-6" style=""height: fit-content>date</p>
					//				</div>
									
					//				<div class="d-flex flex-column">
					//					<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Statut annoncé: <span>${status}</span></p>
					//					<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Email: <span>${email}</span></p>
					//					<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Mot de passe: <span>${mdp}</span></p>
					//				</div>
					//			</section>
					//		</div>
							
					//		<div class="d-flex flex-column col-4 btnWrapper align-items-center justify-content-center gap-1">
								
					//			<button id="modifBtn" class="btn text-white" style="background-color: var(--irisBlue); height: fit-content;">Modifier</button>
								
					//			<button id="refusBtn" class="btn text-white bg-danger" style="height: fit-content;">Refuser</button>
								
					//		</div>
						
					//	`);
					//}

			
		}else if (widget == "graphTaches"){
		
			const graphTaches = `
			
				<section id="titre" class="container-fluid m-0 p-0">
					<h3>Graphique des tâches</h3>
				</section>
			
			`;

			wrapper.innerHTML = graphTaches;

		}else if (widget == "resuComs"){
		
			const resuComs = `
			
				<section id="titre" class="container-fluid m-0 p-0">
					<h3>Résumé des commentaires</h3>
				</section>

				<ul class="content container-fluid p-0 m-0 list-unstyled">
					<li class="d-flex flex-column container-fluid p-0 m-0">
						<h5>Nom de tâche</h5>
						<ol id="coms" class="ps-5">
							<li class="d-flex flex-column">
								<section id="infosUser" class="d-flex">
									<div class="ppUser" style="max-width: 20%;">
										<img src="../../../images/images_profils/ppTest.jpg" alt="" class="img-fluid rounded-circle">
									</div>
									<div id="idUser" class="row">
										
										<p class="m-0">Nom Prénom</p>
										
										<span id="onlineState" class="d-flex justify-content-between align-items-center rounded-pill text-white typTxtOrdi16" style="background-color: var(--irisPurple); max-height: 3vh; max-width: 9vw; width: 8.5vw; font-size: 10pt;">
											déconnecté
											<span class="bg-danger badge rounded-circle" style="height: 1.6vh;">
												<span class="visually-hidden">Statut de connexion</span>
											</span>
										</span>

									</div>
									<p id="dateCom" class="m-0">Date commentaire</p>
								</section>
								<p id="descCom">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto similique vel repellat, distinctio ducimus expedita, obcaecati quam quisquam sapiente dolorum natus sequi suscipit mollitia inventore velit quaerat. Itaque, iste culpa?</p>
							</li>
						</ol>
					</li>
				</ul>
				
			
			`;

			wrapper.innerHTML = resuComs;
			
		}else if (widget == "dernier"){
		
			const dernier = `
			
				<section id="titre" class="container-fluid m-0 p-0">
					<h3>Dernier widget</h3>
				</section>


			
			`;

			wrapper.innerHTML = dernier;
			
		}else{
			//Changement de titre
			titre.textContent = `Widget ${emplacement}`;
			wrapper.firstElementChild.nextElementSibling.remove();
		}
	}else{
		alert("Vous devez choisir un projet valide pour pouvoir travailler dans votre espace de travail..")
	}
}

export {assigner};