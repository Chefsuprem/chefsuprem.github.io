// Sélectionnez les cartes à animer
const cards = document.querySelectorAll('.card');


// Fonction pour animer les cartes avec GSAP
function animateCards() {
    // Parcours des cartes et définition de l'animation
    cards.forEach((card, index) => {
        gsap.fromTo(card, {
            x: "100%", // Commence à droite
            opacity: 0 // Commence invisible
        }, {
            x: 0, // Se déplace vers la gauche
            opacity: 1, // Devient visible
            duration: 0.3, // Durée de l'animation
            delay: index * 0.8 // Délai dépendant de l'index pour un effet de cascade
        });
    });
}


/// Appelez la fonction pour animer les cartes lorsque la fenêtre est chargée
window.addEventListener('load', animateCards);

// Fonction pour vérifier si la partie prestation est visible à l'écran
function isPrestasVisible() {
    const prestasSection = document.getElementById('prestas');
    const prestasRect = prestasSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // La partie des prestations est considérée comme visible si elle est au moins à moitié visible à l'écran
    return prestasRect.top < windowHeight && prestasRect.bottom >= 0;
}

// Fonction pour animer les cartes avec GSAP quand la partie prestation devient visible
function animateOnScroll() {
    if (isPrestasVisible()) {
        animateCards();
        // Désactivez l'écouteur d'événement une fois que les cartes sont animées
        window.removeEventListener('scroll', animateOnScroll);
    }
}

// Ajoutez un écouteur d'événement pour déclencher l'animation lors du défilement
window.addEventListener('scroll', animateOnScroll);

function ElementVisible(id_element) {
    const rect = id_element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('DOMContentLoaded', function() {
    // Bienvenue sur le site et le persona
    gsap.from('#bvn_btn', { duration: 2, ease: 'back.out(1,9)', x: '-100%' });
    gsap.from('#persona', { duration: 2, ease: 'back.out(1,9)', x: '200%' });

    // Pour l'équipe
    gsap.from('#equipeh2', { duration: 0.5, ease: 'sine.out', y: '100%', scrollTrigger: { trigger: '#equipeh2', start: 'top bottom', end: 'bottom top' } });
    gsap.from('#equipetxt', { duration: 0.5, ease: 'sine.out', y: '-100%', scrollTrigger: { trigger: '#equipetxt', start: 'top bottom', end: 'bottom top' } });

    // Pour les valeurs
    gsap.from('#oeilbleu', { duration: 1.5, ease: 'back.out(1,7)', x: '-100%', scrollTrigger: { trigger: '#oeilbleu', start: 'top bottom', end: 'bottom top' } });
    gsap.from('#oeilbleutxt', { duration: 1.5, ease: 'back.out(1,7)', x: '200%', scrollTrigger: { trigger: '#oeilbleutxt', start: 'top bottom', end: 'bottom top' } });
    gsap.from('#oeiljaunetxt', { duration: 1.5, ease: 'back.out(1,7)', delay: 0.5, x: '-100%', scrollTrigger: { trigger: '#oeiljaunetxt', start: 'top bottom', end: 'bottom top' } });
    gsap.from('#oeiljaune', { duration: 1.5, ease: 'back.out(1,7)', delay: 0.5, x: '200%', scrollTrigger: { trigger: '#oeiljaune', start: 'top bottom', end: 'bottom top' } });
    gsap.from('#oeilviolet', { duration: 1.5, ease: 'back.out(1,7)', delay: 1, x: '-100%', scrollTrigger: { trigger: '#oeilviolet', start: 'top bottom', end: 'bottom top' } });
    gsap.from('#oeilviolettxt', { duration: 1.5, ease: 'back.out(1,7)', delay: 1, x: '200%', scrollTrigger: { trigger: '#oeilviolettxt', start: 'top bottom', end: 'bottom top' } });

    // Pour les réalisations
    gsap.from('#cgraphique', { duration: 1.5, ease: 'back.out(1,3)', delay: 0, x: '-100%', scrollTrigger: { trigger: '#cgraphique', start: 'top bottom', end: 'bottom top' } });
    gsap.from('#ceditoriale', { duration: 1.5, ease: 'back.out(1,3)', delay: 0, x: '200%', scrollTrigger: { trigger: '#ceditoriale', start: 'top bottom', end: 'bottom top' } });
});
