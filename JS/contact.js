    
//======== CODE ORIGINAL ========

// Réajuste la hauteur de la case automatiquement en fonction du contenu dedans
//document.getElementById("description").addEventListener("input", function() { //On cible l'élément d'id "description" et si l'événement est déclanché, la fonction s'execute (à chaque interaction avec l'input, on vérifie l'événement
//    this.style.height = "auto"; //hauteur de la zone de texte en automatique
//    this.style.height = (this.scrollHeight) + "px"; //hauteur de la zone de texte en fonction du contenu en px
//});


//======== CODE DEVELOPPE ========

const desc = document.getElementById("description"); //définition de l'élément à rechercher dans le DOM


//ajout de l'écouteur d'évènements
desc.addEventListener("input", () => { //Fonction flechée -> pas besoin de nom car "usage unique" et la flèche veut signifier que ça sera tout ce qui sera "return" par la fonction.

    desc.style.height = "auto"; //modification de l'attribut "style" de l'élément

    desc.style.height = (desc.scrollHeight) + "px"; //recalcul de la hauteur de l'élément en fonction de la hauteur de scroll.
})