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
            titrestatut: 'Legal status',
            p1statut: '1ris is a dynamic and innovative communication agency, incorporated under the legal form of Société par Actions Simplifiée (SAS). This choice of status offers several advantages to our company:',
            nomstatut: 'Simplified Joint Stock Company <span class="hilight"> (SAS in french) </span>',
            p2statut: 'The SAS is a form of company offering great flexibility in its operation and flexibility in the drafting of the articles of association. This allows us to customize our corporate governance to our specific needs. In an SAS, the partners hold shares and their liability is limited to the amount of their contributions. This limitation of liability is an important advantage for the partners of 1ris, thus protecting them from certain financial obligations.Finally, the SAS offers us a great deal of freedom in terms of management and profit distribution, which allows us to put in place mechanisms adapted to our growth strategy and our commercial objectives.',
            p3statut: 'We are proud to be a SAS and we firmly believe that this legal status contributes to our success as an innovative and successful communication agency.',
            titremention: 'Legal Notice',
            soustitremention: 'Our legal notices',
            droitauteur: 'Copyright',
            p1droit: "All rights reserved to the 1RIS Agency, belonging to the company SAEMMITLN, any use of content belonging to the agency without its consent is strictly prohibited. If you need to use the agency's content or make requests related to 1RIS, please fill in the contact form, send an email or contact us on our phone number.",
            droitproprietaire: 'Website Owner',
            proprionom: 'Mr Christophe Lachaume.',
            proprioadresse: 'Company: SAEMMITLN - 70 Avenue Roger Devoucoux, 83000 Toulon - France',
            usedata: 'Personal data and use of cookies',
            p1usedata: "1RIS does not use cookies and any personal information of the user is kept private. All information collected through the contact or registration forms will be kept confidential. Your personal information is stored on secure servers and protected from unauthorized access. We take all necessary technical and organisational measures to ensure the security of your data and to prevent any loss, alteration or unauthorised disclosure.",
            heberg: 'Site Hosting',
            p1heberg: "Website host: This website is hosted by Github Pages, owned by the company GitHub. To contact this host:",
            p2heberg: 'Founders: Tom Preston-Werner and Chris Wanstrath.',
            p3heberg: 'E-mail:',
            p4heberg: 'Mailing address: 88 Colin P. Kelly Jr Street, San Francisco, CA 94107 United States.',
            titreflux: 'Link to our RSS feed',
            soustitreflux: 'Select a language to view the corresponding RSS feed.',
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
            titrestatut: 'Statut Juridique',
            p1statut: '1ris est une agence de communication dynamique et innovante, constituée sous la forme juridique de Société par Actions Simplifiée (SAS). Ce choix de statut offre plusieurs avantages à notre entreprise :',
            nomstatut: 'Société par Actions Simplifiée <span class="hilight"> (SAS) </span>',
            p2statut: "La SAS est une forme de société offrant une grande souplesse de fonctionnement et une flexibilité dans la rédaction des statuts. Cela nous permet de personnaliser la gouvernance de notre entreprise en fonction de nos besoins spécifiques. Dans une SAS, les associés détiennent des actions et leur responsabilité est limitée au montant de leurs apports. Cette limitation de responsabilité constitue un avantage important pour les associés de 1ris, les protégeant ainsi de certaines obligations financières de l'entreprise. De plus, la SAS permet d'avoir une structure juridique solide et reconnue, ce qui peut faciliter les relations avec les partenaires commerciaux, les investisseurs et les institutions financières.Enfin, la SAS nous offre une grande liberté en matière de gestion et de répartition des bénéfices, ce qui nous permet de mettre en place des mécanismes adaptés à notre stratégie de croissance et à nos objectifs commerciaux.",
            p3statut: "Nous sommes fiers d'être une SAS et nous croyons fermement que ce statut juridique contribue à notre succès en tant qu'agence de communication innovante et performante.",
            titremention: 'Mentions légales ',
            soustitremention: 'Nos mentions légales',
            droitauteur: "Droits d'auteur",
            p1droit: "Tous droits réservés à l'Agence 1RIS, appartenant à l'entreprise SAEMMITLN, toutes utilisations de contenus appartenant à l'agence sans son consentement est formellement interdit. Si besoin d'utilisation du contenu de l'agence ou demandes en lien avec 1RIS, veuillez remplir le formulaire de contact, envoyer un mail ou prendre contact sur notre numéro de téléphone.",
            droitproprietaire: 'Propriétaire du site',
            proprionom: 'Mr Christophe Lachaume.',
            proprioadresse: 'Entreprise : SAEMMITLN - 70 Avenue Roger Devoucoux, 83000 Toulon - France',
            usedata: 'Données personnelles et utilisation des cookies',
            p1usedata: "L'agence 1RIS n'utilise pas de cookies et toute information personnelle de l'utilisateur est gardée privée. Toutes les informations collectées par le biais des formulaires de contact ou d'inscription resterons confidentielles. Vos informations personnelles sont stockées sur des serveurs sécurisés et protégés contre tout accès non autorisé. Nous prenons toutes les mesures techniques et organisationnelles nécessaires pour assurer la sécurité de vos données et empêcher toute perte, altération ou divulgation non autorisée.",
            heberg: 'Hébergement',
            p1heberg: "Hebergeur du site web : Ce site internet est hébergé par Github Pages, possedé par la société GitHub. Pour contacter cet hébergeur :",
            p2heberg: 'Fondateurs : Tom Preston-Werner et Chris Wanstrath.',
            p3heberg: 'Adresse électronique : ',
            p4heberg: 'Adresse postale : 88 Colin P. Kelly Jr Street, San Francisco, CA 94107 United States.',
            titreflux: 'Lien vers notre flux RSS',
            soustitreflux: 'Sélectionnez une langue pour afficher le flux RSS correspondant.',
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
