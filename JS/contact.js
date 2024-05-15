const desc = document.getElementById("description"); //définition de l'élément à rechercher dans le DOM


//ajout de l'écouteur d'évènements
desc.addEventListener("input", () => { //Fonction flechée -> pas besoin de nom car "usage unique" et la flèche veut signifier que ça sera tout ce qui sera "return" par la fonction.

    desc.style.height = "auto"; //modification de l'attribut "style" de l'élément

    desc.style.height = (desc.scrollHeight) + "px"; //recalcul de la hauteur de l'élément en fonction de la hauteur de scroll.
})

//animation titre et sous titre 
gsap.from('.typTtrOrdi50',{scrollTrigger:'.typTtrOrdi50', duration:1.2, ease:'bound', y:'-200%'});
gsap.from('.typSsTtrOrdi18',{scrollTrigger:'.typSsTtrOrdi18', duration:1, ease:'bound', y:'-500%'});

//partie icons et infos
gsap.from('.bx',{scrollTrigger:'.bx', duration:1, delay:0.5, ease:'back.out(1,7)', x:'-300%'});
gsap.from('#num',{scrollTrigger:'#num', duration:1, ease:'back.out(1,7)', x:'-300%'});
gsap.from('#adr',{scrollTrigger:'#adr', duration:1, ease:'back.out(1,7)', y:'-300%'});
gsap.from('#adrm',{scrollTrigger:'#adrm', duration:1, ease:'back.out(1,7)', y:'300%'});