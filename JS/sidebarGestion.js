
//====== AU CHARGEMENT DU SCRIPT ======

const state = ["admin", "membre", "client"];


const widSidebar = document.getElementById("widWrapper");

//Définition du statut de l'utilisateur

let userState = state[0];

//Récupération des widgets

const taches = document.getElementById("widTaches");

//Condition du widget à afficher

if (userState == "admin"){
	taches.classList.toggle("active");
}



//====== Home Panel ======

//==== Definition ====

//Définition de la liste qui accueil les widgets
const panelsList = ["resuProj", "suiviTaches", "validation", "graphTaches", "resuComs", "dernier"];

//Recuperation des éléments de dropdown
const ddTggl = document.getElementsByClassName("dropdown-toggle");
let ddMenu = document.getElementsByClassName("dropdown-menu");


//Assignation des widgets à la liste des dropdown pour rendre accessible les propositions à l'utilisateur
for (let i = 0; i < ddMenu.length; i++) {

	//Assignation des widgets
	for (let j = 0; j < panelsList.length; j++) {

		let li = document.createElement("li");
		
		let a = document.createElement("a");
		a.setAttribute("class", "dropdown-item");
		a.textContent = panelsList[j];
		a.setAttribute("id", panelsList[j]);
	
		li.appendChild(a);
	
		ddMenu[i].appendChild(li);
	}

};


//==== Execution ====

//Récupération des éléments de listes qui ont été créés précédement (HTML Collection)

const dd = document.getElementsByClassName("dropdown");

for (let i = 0; i < dd.length; i++){

	//Ajout des écouteurs d'évènements sur chaques Items pour pouvoir créer l'interaction souhaitée
	dd[i].addEventListener("click", (event) => {
		const ddListItems = document.getElementsByClassName("dropdown-item");
		let verify = Array.from(ddListItems);
		let flagReset;

		if (event.target.classList.contains("dropdown-item") && event.target.classList.contains("clear") === false) {
			
			const ddItem = event.target;
			const parent = ddItem.parentElement.parentElement.previousElementSibling;
			const menu = ddItem.parentElement.parentElement;

			//Condition si le parent possède un textContent différent du texte par défaut (pour ne pas ajouter le texte par défaut à la liste de propositions)
			if (parent.textContent != "Vide") {

				panelsList.push(parent.textContent); //Ajoute au tableau le textContent actuel du parent

				panelsList.splice(panelsList.indexOf(ddItem.textContent), 1); //Supprime de la liste des propositions le widget choisi

				let newLi = document.createElement("li");
				let newA = document.createElement("a");

				newA.setAttribute("class", "dropdown-item");
				newA.textContent = parent.textContent;
				newA.setAttribute("id", parent.textContent);

				parent.textContent = ddItem.textContent; //Affecte comme textContent du parent le widget choisi

				verify.forEach((key) => {
					if (key.id == parent.textContent) {
						
						key.parentElement.remove();
					}
				}) //Supprime de la liste le widget choisi

				newLi.appendChild(newA);
				menu.appendChild(newLi);

			} else {

				panelsList.splice(panelsList.indexOf(ddItem.textContent), 1);

				parent.textContent = ddItem.textContent;

				verify.forEach((key) => {
					if (key.id == parent.textContent) {

						key.parentElement.remove();
					}
				})

				Array.from(menu.children).forEach((element) => {
					Array.from(element.children).forEach((enfant) => {
						
						if (enfant.classList.contains("clear")){
							flagReset = true;
						}
					})
				})

				if (flagReset != true) {

					//Assignation du boutton de "reset"
					let clearLi = document.createElement("li");
					let clearA = document.createElement("a");
	
					clearA.setAttribute("class", "dropdown-item clear");
					clearA.textContent = "Ne rien mettre";
	
					clearLi.appendChild(clearA);
					menu.insertBefore(clearLi, menu.firstElementChild);
					
				}

			}

		}else if (event.target.classList.contains("clear")){

			const ddItem = event.target;
			const parent = ddItem.parentElement.parentElement.previousElementSibling;
			
			if (parent.textContent == "Vide"){

			}else{

				panelsList.push(parent.textContent);

				Array.from(ddMenu).forEach((menu) => {

					let newLi = document.createElement("li");
					let newA = document.createElement("a");
		
					newA.setAttribute("class", "dropdown-item");
					newA.textContent = panelsList[panelsList.length - 1];
					newA.setAttribute("id", panelsList[panelsList.length - 1]);
		
					parent.textContent = "Vide";
		
					ddItem.parentElement.remove();
		
					newLi.appendChild(newA);

					menu.appendChild(newLi);
				})

			}


		}else{

			const menu = event.target.nextElementSibling;

			Array.from(menu.children).forEach((element) => {
				Array.from(element.children).forEach((enfant) => {

					if (enfant.classList.contains("clear")){
						flagReset = true;
					}
				})
			})

			if (event.target.classList.contains("dropdown-toggle") && flagReset != true && menu.childElementCount < 6) {
				
				//Assignation du boutton de "reset"
				let clearLi = document.createElement("li");
				let clearA = document.createElement("a");

				clearA.setAttribute("class", "dropdown-item clear");
				clearA.textContent = "Ne rien mettre";

				clearLi.appendChild(clearA);
				menu.insertBefore(clearLi, menu.firstElementChild);

			}
		}
	})
}