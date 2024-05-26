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


document.addEventListener('DOMContentLoaded', (event) => {
    const languageToggle = document.getElementById('languageToggle');

    // Function to toggle language
    function toggleLanguage() {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === "en" ? "fr" : "en";
        document.documentElement.lang = newLang;
        languageToggle.textContent = newLang === "en" ? "FR" : "EN";

        // Save the selected language to localStorage
        localStorage.setItem('preferredLanguage', newLang);

        // Dispatch an event to notify that the language has changed
        const event = new Event('languageChange');
        document.dispatchEvent(event);
    }

    // Attach event listener to the language toggle button
    if (languageToggle) {
        languageToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleLanguage();
        });
    }

    // Function to apply translations based on the selected language
    function applyTranslations() {
        // Update text content
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        elementsToTranslate.forEach((element) => {
            const translationKey = element.getAttribute('data-translate');
            const translationText = translations[document.documentElement.lang][translationKey];
            element.innerHTML = translationText;

            // Check if the translated text contains elements with the "hilight" class
            const hilightElements = element.querySelectorAll('.hilight');
            hilightElements.forEach((hilightElement) => {
                // If the translated text contains elements with the "hilight" class, ensure they remain highlighted
                hilightElement.classList.add('hilight');
            });
        });

        // Update alt attributes for images
        const imagesToTranslate = document.querySelectorAll('[data-alt-translate]');
        imagesToTranslate.forEach((image) => {
            const altTranslationKey = image.getAttribute('data-alt-translate');
            image.alt = translations[document.documentElement.lang][altTranslationKey];
        });
    }

    // Apply saved language preference on page load
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        document.documentElement.lang = savedLanguage;
        languageToggle.textContent = savedLanguage === "en" ? "FR" : "EN";
    }

    // Apply translations on language change
    document.addEventListener('languageChange', applyTranslations);

    // Initial application of translations
    applyTranslations();
});

// Translations object
const translations = {
    en: {
        welcome_title: 'Welcome to our <span class="hilight" style="font-size:45px;"> website</span> !',
        blog_header: 'Blog',
        contact: 'Contact',
        connexion_header: 'Login',
        inscription_header: 'Sign Up',
        boutonaide: "Need help?",
        imgpersonne_alt: "Alt text for persona image",
        imgequipe_alt: "Static image of the team.",
        imgequipemembre_alt: "Svg of the background of the team image.",
        seraphin_boyer: 'Seraphin Boyer',
        seraphin_caption_1: 'Seraphin does not just capture images, he creates captivating visual stories.',
        seraphin_caption_2: 'As a photographer and digital content creator, he brings your ideas to life through impactful visuals. From product photos to catchy flyers; each visual carefully respects your expectations and adds value to your communication.',
        equipe_title: 'OUR TEAM',
        raphael_vasseur: 'Raphael Vasseur',
        raphael_caption_1: 'Raphael is an outstanding developer. He brings your business\' online presence to life by crafting dynamic and intuitive websites.',
        raphael_caption_2: 'Whether it is to create an elegant online showcase or a robust e-commerce platform, Raphael turns your digital aspirations into reality.',
        raphael_caption_3: 'He is a true asset to the agency.',
        rahnya_lanyeri: 'Rahnya Lanyeri',
        rahnya_caption_1: 'Communication Officer and Project Manager, Rahnya formats your message to effectively reach your audience, your media and your sponsors.',
        rahnya_caption_2: 'Responsible for the overall management of the agency, she will also coordinate all aspects of your communication strategy, ensuring that each element is perfectly put in place to maximize the impact of each initiative.',
        amelie_jammes: 'Amélie Jammes',
        amelie_caption_1: 'Event Planner and Editor, Amélie is your guide to memorable events and impactful content.',
        amelie_caption_2: 'She transforms your ideas into unforgettable experiences: from a professional conference to product launches and the application of her creative pen, Amélie feeds your editorial strategy and strengthens your online presence.',
        yoann_Fejean: 'Yoann Fejean',
        yoann_caption_1: 'Community manager and web developer, Yoann is the maestro of your online presence.',
        yoann_caption_2: 'It develops engaging and relevant content that stimulates interaction and strengthens ties with your community. <br>Thanks to it, you maximize the impact of your digital communication, and at the same time, Yoann creates your dynamic and intuitive website.',
        imgequipefond_alt: "Background SVG of the team image",
        agenceexplication: '1ris is a communication agency created as part of a project by five students.',
        oeilbleu1_alt: 'Eye looking at the text',
        oeilbleu2_alt: 'Eye looking at the text',
        creativite: 'Creativity',
        text_creativite: '1RIS develops <span class="hilight">unique</span> concepts and <span class="hilight">innovative</span> strategies for each project.',
        adaptabilite: 'Adaptability',
        text_adaptabilite: '1ris stands out for its <span class="hilight"> adaptability</span> adjusting to the specific needs of <span class="hilight">each customer</span> and offering <span class="hilight">tailor-made solutions</span>.',
        oeiljaune1_alt: 'Eye looking at the text',
        oeiljaune2_alt: 'Eye looking at the text',
        respect:'Respect',
        oeilviolet1_alt: 'Eye looking at the text',
        oeilviolet2_alt: 'Eye looking at the text',
        text_respect: 'The agency respects the <span class="hilight">opinions,</span> the <span class="hilight">cultures</span> and the <span class="hilight">values</span> of all.',
        prestation_title: 'OUR SERVICES',
        imgbrain_alt: 'Illustration of the subject.',
        titre_carte1: 'Brain Content',
        brain_text: 'The creation of impactful and effective content.',
        imgreseaux_alt: 'Illustration of the subject.',
        titre_carte2: 'Social Media',
        reseaux_text: 'Dissemination on various social networks for greater influence.',
        imgstrategie_alt: 'Illustration of the subject.',
        titre_carte3: 'Digital strategy',
        strategie_text: 'The implementation of a personalized strategy to optimize your online presence and achieve your objectives.',
        realisation_title: 'OUR ACHIEVEMENTS',
        realisation_subtitle: 'The 1ris agency in video',
        boutonnousdecouvrir: 'Discover us',
        identite_title: 'OUR IDENTITY',
        identite1: 'Discover our <span class="hilight">visual identity</span>',
        identite2: 'But also <span class="hilight">our way of being</span>',
        charte_graphique_miniature_alt: 'Thumbnail of the graphic charter.',
        charte_editoriale_miniature_alt: 'Thumbnail of the editorial charter.',
        statutsjuridiques: 'Legal Status',
        mentionslegales: 'Legal Notice',
        fluxrss: 'RSS Feed',
        statut: 'Legal Status',
        copyr:'©2024, 1ris and its affiliates',
        logo1ris: 'Logo of the 1ris agency',
    },
    fr: {
        welcome_title: 'Bienvenue sur notre site <span class="hilight">web</span> !',
        blog_header: 'Blog',
        contact: 'Contact',
        connexion_header: 'Connexion',
        inscription_header: 'Inscription',
        boutonaide: "Besoin d'aide?",
        imgpersonne_alt: "Texte alternatif pour l'image de la personne",
        imgequipe_alt: "Image Statique de l'équipe.",
        imgequipemembre_alt: "Svg du fond de image de l'équipe.",
        seraphin_boyer: 'Séraphin Boyer',
        seraphin_caption_1: 'Séraphin ne capture pas simplement des images, il crée des histoires visuelles captivantes.',
        seraphin_caption_2: 'En tant que photographe et créateur de contenu numérique, il donne vie à vos idées à travers des visuels percutants. Des photos de produits aux flyers accrocheurs; chaque visuel respecte soigneusement vos attendus et apportent un plus à votre communication.',
        equipe_title: 'NOTRE ÉQUIPE',
        raphael_vasseur: 'Raphaël Vasseur',
        raphael_caption_1: 'Raphaël est un développeur hors pair. Il donne vie à votre présence en ligne en concevant des sites web dynamiques et intuitifs.',
        raphael_caption_2: 'Que ce soit pour créer une vitrine en ligne élégante ou une plateforme e-commerce robuste, Raphaël transforme vos aspirations numériques en réalité.',
        raphael_caption_3: "C'est un véritable atout pour l'agence.",
        rahnya_lanyeri: 'Rahnya Lanyeri',
        rahnya_caption_1: 'Chargée de Communication et Cheffe de Projet, Rahnya format votre message pour atteindre efficacement votre audience, vos médias et vos partenaires.',
        rahnya_caption_2: 'Responsable de la gestion globale de l’agence, elle coordonne également tous les aspects de votre stratégie de communication, veillant à ce que chaque élément soit parfaitement mis en place pour maximiser l’impact de chaque initiative.',
        amelie_jammes: 'Amélie Jammes',
        amelie_caption_1: 'Organisatrice d’événements et rédactrice, Amélie est votre guide vers des événements mémorables et des contenus percutants.',
        amelie_caption_2: 'Elle transforme vos idées en expériences inoubliables : d’une conférence professionnelle à des lancements de produits et l’application de sa plume créative, Amélie nourrit votre stratégie éditoriale et renforce votre présence en ligne.',
        yoann_Fejean: 'Yoann Fejean',
        yoann_caption_1: 'Community manager et développeur web, Yoann est le maestro de votre présence en ligne.',
        yoann_caption_2: 'Il développe des contenus engageants et pertinents qui stimulent l’interaction et renforcent les liens avec votre communauté. <br>Grâce à lui, vous maximisez l’impact de votre communication digitale, et parallèlement, Yoann crée votre site web dynamique et intuitif.',
        imgequipefond_alt: "SVG de fond de l'image de l'équipe",
        agenceexplication: '1ris est une agence de communication créée dans le cadre d\'un projet par cinq étudiants.',
        oeilbleu1_alt: 'Oeil regardant le texte',
        oeilbleu2_alt: 'Oeil regardant le texte',
        creativite: 'Créativité',
        text_creativite: '1RIS élabore des concepts <span class="hilight">uniques</span> et des stratégies <span class="hilight">innovantes</span> pour chaque projet.',
        adaptabilite: 'Adaptabilité',
        text_adaptabilite: '1ris se distingue par son <span class="hilight">adaptabilité</span> s’ajustant aux besoins spécifiques de <span class="hilight">chaque client</span> et proposant des <span class="hilight">solutions sur mesure</span>.',
        oeiljaune1_alt: 'Oeil regardant le texte',
        oeiljaune2_alt: 'Oeil regardant le texte',
        respect:'Respect',
        oeilviolet1_alt: 'Oeil regardant le texte',
        oeilviolet2_alt: 'Oeil regardant le texte',
        text_respect: 'L’agence respecte les <span class="hilight">opinions,</span> les <span class="hilight">cultures</span> et les <span class="hilight">valeurs</span> de tous.',
        prestation_title: 'NOS PRESTATIONS',
        imgbrain_alt: 'Illustration du sujet.',
        titre_carte1: 'Brain Content',
        brain_text: 'La création de contenu impactant et efficace.',
        imgreseaux_alt: 'Illustration du sujet.',
        titre_carte2: 'Réseaux sociaux',
        reseaux_text: 'La diffusion sur divers réseaux sociaux pour une plus grande influence.',
        imgstrategie_alt: 'Illustration du sujet.',
        titre_carte3: 'Stratégie digitale',
        strategie_text: 'La mise en œuvre d’une stratégie personnalisée pour optimiser votre présence en ligne et atteindre vos objectifs.',
        realisation_title: 'NOS RÉALISATIONS',
        realisation_subtitle: 'L’agence 1ris en vidéo',
        boutonnousdecouvrir: 'Nous découvrir',
        identite_title: 'NOTRE IDENTITÉ',
        identite1: 'Découvrez notre <span class="hilight">identité visuelle</span>',
        identite2: 'Mais aussi <span class="hilight">notre façon d’être</span>',
        charte_graphique_miniature_alt: 'Miniature de la charte graphique.',
        charte_editoriale_miniature_alt: 'Miniature de la charte éditoriale.',
        statutsjuridiques: 'Statuts Juridiques',
        mentionslegales: 'Mentions Légales',
        fluxrss: 'Flux RSS',
        statut: 'Statuts Juridiques',
        copyr:'©2024, 1ris et ses affiliés',
        logo1ris: 'Logo de l’agence 1ris',
    }
};
