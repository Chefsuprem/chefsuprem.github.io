// Animation pour faire apparaître l'œil
gsap.from('#eye',{scrollTrigger:'#eye', duration:1.5, ease:'bound', y:'-200%'});
gsap.from('#eyeh1',{scrollTrigger:'#eyeh1', duration:1.5, ease:'bound', y:'-500%'});

//Bouton et italique
gsap.from('#Inscrire',{scrollTrigger:'#Inscrire', duration:1, ease:'bound', y:'300%'});
gsap.from('#compte',{scrollTrigger:'#compte', duration:1, ease:'bound', y:'200%'});



document.addEventListener('DOMContentLoaded', (event) => {
    const languageToggle = document.getElementById('languageToggle');

    // Function to toggle language
    function toggleLanguage() {
        if (document.documentElement.lang === "en") {
            document.documentElement.lang = "fr";
            languageToggle.textContent = "EN"; // Update button text to "EN"
            localStorage.setItem('language', 'fr'); // Save language to localStorage
        } else {
            document.documentElement.lang = "en";
            languageToggle.textContent = "FR"; // Update button text to "FR"
            localStorage.setItem('language', 'en'); // Save language to localStorage
        }

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

    // Update the text content and alt attributes based on the selected language
    document.addEventListener('languageChange', (event) => {
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
    });

    // Translations object
    const translations = {
        en: {
            welcome_title: 'Welcome to our <span class="hilight" style="font-size:45px;"> website</span> !',
            blog_header: 'Blog',
            contact: 'Contact',
            connexion_header: 'Login',
            inscription_header: 'Sign Up',
            statutsjuridiques: 'Legal Status',
            mentionslegales: 'Legal Notice',
            fluxrss: 'RSS Feed',
            statut: 'Legal Status',
            copyr:'©2024, 1ris and its affiliates',
            logo1ris: 'Logo of the 1ris agency',
            oeilbleu_alt: 'Light blue eye pattern looking at the form',
            vousinscrire: 'Sign up',
            nom_form: 'Name :',
            prenom_form: 'Forename :',
            email_form: 'Email :',
            mdp_form: 'Password :',
            mdpconfirm_form: 'Confirm the password:',
            btninscrire: 'Subscribe',
            compteexist: 'Already an account?',
        },
        fr: {
            welcome_title: 'Bienvenue sur notre site web',
            blog_header: 'Blog',
            contact: 'Contact',
            connexion_header: 'Connexion',
            inscription_header: 'Inscription',
            statutsjuridiques: 'Statuts juridiques',
            mentionslegales: 'Mentions Légales',
            fluxrss: 'Flux RSS',
            statut: 'Statuts juridiques',
            copyr:'©2024, 1ris et ses affiliés',
            logo1ris: 'Logo de l agence 1ris',
            oeilbleu_alt: 'Motif oeil bleu clair regardant le formulaire',
            vousinscrire: 'Inscrivez-vous',
            nom_form: 'Nom :',
            prenom_form: 'Prénom :',
            email_form: 'Email :',
            mdp_form: 'Mot de passe :',
            mdpconfirm_form: 'Confirmer le mot de passe:',
            btninscrire: "S'inscrire",
            compteexist: 'Déjà un compte ?',
        }
    };

    // Initialize language based on localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        document.documentElement.lang = savedLanguage;
        languageToggle.textContent = savedLanguage === 'en' ? 'FR' : 'EN';
        const event = new Event('languageChange');
        document.dispatchEvent(event);
    }
});
