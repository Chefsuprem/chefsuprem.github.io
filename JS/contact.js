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
            nouscontacter: 'Contact us',
            commentcontacter: 'If you would like to contact us, please fill out the form <br>below',
            adresse: '70 Avenue Roger Devoucoux, 83000 Toulon',
            numtel: '07.69.43.07.54',
            email: 'agence-1ris@gmx.com',
            envoimessage: 'Send a message',
            nom_form: 'Name',
            prenom_form: 'Forename',
            email_form: 'Email',
            description_form: 'Description',
            message_form: ' Your message',
            send_form: 'Send',
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
            nouscontacter: 'Nous contacter',
            commentcontacter: 'Si vous souhaitez nous contacter, merci de remplir le formulaire <br>ci-dessous',
            adresse: '70 Avenue Roger Devoucoux, 83000 Toulon',
            numtel: '07.69.43.07.54',
            email: 'agence-1ris@gmx.com',
            envoimessage: 'Envoyer un message',
            nom_form: 'Nom',
            prenom_form: 'Prénom',
            email_form: 'Email',
            description_form: 'Description',
            message_form: ' Votre message',
            send_form: 'Envoyer',
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
