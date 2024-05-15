

function assigner(emplacement, widget){
		
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
			<ul class="d-flex flex-column list-unstyled gap-2">
				<li class="d-flex container-fluid p-0 m-0 align-items-center justify-content-between pe-3">
					<p class="col-4 m-0 typTxtOrdi16 fs-6">Nom de la tâche 1</p>
					<div class="col-6 progress rounded-5 overflow-hidden" role="progressbar">
						<div class="progress-bar" style="background-color: green; width: 30%;"></div>
					</div>
					<p class="col-2 m-0 text-end typTxtOrdi16" style="font-size: 10pt;">Retard<br>(nb) jours</p>
				</li>
				<li class="d-flex container-fluid p-0 m-0 align-items-center justify-content-between pe-3">
					<p class="col-4 m-0 typTxtOrdi16 fs-6">Nom de la tâche 2</p>
					<div class="col-6 progress rounded-5 overflow-hidden" role="progressbar">
						<div class="progress-bar" style="background-color: green; width: 50%;"></div>
					</div>
					<p class="col-2 m-0 text-end typTxtOrdi16" style="font-size: 10pt;">Retard<br>(nb) jours</p>
				</li>
				<li class="d-flex container-fluid p-0 m-0 align-items-center justify-content-between pe-3">
					<p class="col-4 m-0 typTxtOrdi16 fs-6">Nom de la tâche 3</p>
					<div class="col-6 progress rounded-5 overflow-hidden" role="progressbar">
						<div class="progress-bar" style="background-color: green; width: 70%;"></div>
					</div>
					<p class="col-2 m-0 text-end typTxtOrdi16" style="font-size: 10pt;">Retard<br>(nb) jours</p>
				</li>
				<li class="d-flex container-fluid p-0 m-0 align-items-center justify-content-between pe-3">
					<p class="col-4 m-0 typTxtOrdi16 fs-6">Nom de la tâche 4</p>
					<div class="col-6 progress rounded-5 overflow-hidden" role="progressbar">
						<div class="progress-bar" style="background-color: green; width: 10%;"></div>
					</div>
					<p class="col-2 m-0 text-end  typTxtOrdi16" style="font-size: 10pt;">Retard<br>(nb) jours</p>
				</li>
			</ul>
		</section>
		
		`;

		wrapper.innerHTML = suiviTaches;

	}else if (widget == "validation"){

		let status = "client";
		let email = "salut.coucou@heya.fr";
		let mdp = "123456";

		const defaultState = `
		
			<section id="titre" class="container-fluid m-0 p-0">
				<h3>Validation</h3>
			</section>
			
			<ul class="list-unstyled container-fluid p-0 pt-3 m-0">
				<li class="d-flex container-fluid p-0 pe-2 m-0 justify-content-between">
					<div id="idWrapper" class="col-8 d-flex gap-2">
						<img src="../../../images/images_profils/ppTest.jpg" alt="Photo de profil de l'utilisateur." id="ppUser" class="col-6 img-thumbnail rounded-circle" style="max-width: 30%;">
						
						<section id="idUser" class="d-flex flex-column" style="flex: auto;">
							
							<div class="d-flex align-items-center gap-1">
								<p class="m-0 typTxtOrdi16 fs-5">Nom Prénom</p>
								<span class="typTxtOrdi16 fs-5">|</span>
								<p class="m-0 typTxtOrdi16 fs-6" style=""height: fit-content>date</p>
							</div>
							
							<div class="d-flex flex-column">
								<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Statut annoncé: <span>${status}</span></p>
								<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Email: <span>${email}</span></p>
								<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Mot de passe: <span>${mdp}</span></p>
							</div>
						</section>
					</div>
					
					<div class="d-flex flex-column col-4 btnWrapper align-items-center justify-content-center gap-1">
						
						<button id="modifBtn" class="btn text-white" style="background-color: var(--irisBlue); height: fit-content;">Modifier</button>
						
						<button id="refusBtn" class="btn text-white bg-danger" style="height: fit-content;">Refuser</button>
						
					</div>
				</li>
			</ul>
		
		`;

		wrapper.innerHTML = defaultState;

		const liModifTggl = document.querySelectorAll(`main section#${wrapper.id} ul li`);

		Array.from(liModifTggl).forEach((li) => {

			li.addEventListener("click", (click) => {

				//Definition des états du li
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
									<label for="status" class="m-0 typTxtOrdi16" style="font-size: 9pt;">Statut annoncé: </label>
									<input type="text" id="status" name="status" placeholder="${status}" class="border border-secondary rounded-3">

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
							
						</div>
					</form>
				
				`;

				function changedState(status, email, mdp){
				 
					return(`	

						<div id="idWrapper" class="col-8 d-flex gap-2">
							<img src="../../../images/images_profils/ppTest.jpg" alt="Photo de profil de l'utilisateur." id="ppUser" class="col-6 img-thumbnail rounded-circle" style="max-width: 30%;">
							
							<section id="idUser" class="d-flex flex-column" style="flex: auto;">
								
								<div class="d-flex align-items-center gap-1">
									<p class="m-0 typTxtOrdi16 fs-5">Nom Prénom</p>
									<span class="typTxtOrdi16 fs-5">|</span>
									<p class="m-0 typTxtOrdi16 fs-6" style=""height: fit-content>date</p>
								</div>
								
								<div class="d-flex flex-column">
									<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Statut annoncé: <span>${status}</span></p>
									<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Email: <span>${email}</span></p>
									<p class="m-0 typTxtOrdi16" style="font-size: 9pt;">Mot de passe: <span>${mdp}</span></p>
								</div>
							</section>
						</div>
						
						<div class="d-flex flex-column col-4 btnWrapper align-items-center justify-content-center gap-1">
							
							<button id="modifBtn" class="btn text-white" style="background-color: var(--irisBlue); height: fit-content;">Modifier</button>
							
							<button id="refusBtn" class="btn text-white bg-danger" style="height: fit-content;">Refuser</button>
							
						</div>
					
					`);
				}

				//Execution des conditions de changement
				if (click.target.id == "modifBtn"){
					li.classList.toggle("modifying");

					li.innerHTML = modifyingState;

				}else if (click.target.id == "finModif"){

					const inputStatus = document.querySelector(`main section#${wrapper.id} form input#status`);
					const inputEmail = document.querySelector(`main section#${wrapper.id} form input#email`);
					const inputMdp = document.querySelector(`main section#${wrapper.id} form input#mdp`);

					if (inputStatus.value == "" || inputEmail.value == "" || inputMdp.value == ""){

						li.classList.toggle("modifying");

						li.innerHTML = changedState(status, email, mdp);

					}else{

						status = inputStatus.value;
						email = inputEmail.value;
						mdp = inputMdp.value;


						li.classList.toggle("modifying");

						li.innerHTML = changedState(status, email, mdp);
					}
				}
			})

		});

		
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
}

export {assigner};