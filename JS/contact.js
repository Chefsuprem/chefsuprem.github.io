const desc = document.getElementById("description"); //définition de l'élément à rechercher dans le DOM


//ajout de l'écouteur d'évènements
desc.addEventListener("input", () => { //Fonction flechée -> pas besoin de nom car "usage unique" et la flèche veut signifier que ça sera tout ce qui sera "return" par la fonction.

    desc.style.height = "auto"; //modification de l'attribut "style" de l'élément

    desc.style.height = (desc.scrollHeight) + "px"; //recalcul de la hauteur de l'élément en fonction de la hauteur de scroll.
})