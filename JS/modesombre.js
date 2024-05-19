const toggleModeIcon = document.getElementById('toggle-mode');

    // Fonction pour définir le mode initial
    function setInitialMode() {
        if (currentMode === 'dark') {
            document.body.classList.add('dark');
            toggleModeIcon.style.fill = 'black'; // Icône noir en mode sombre
        }
    }

    // Écouteur d'événements pour le clic sur l'icône
    toggleModeIcon.addEventListener('click', () => 
        {
        // Sélection des éléments HTML nécessaires
        const body = document.body; // Corps de la page
        const modeIcon = document.getElementById('toggle-mode'); // Icône du mode

        // Vérifie si le corps de la page a la classe 'dark' (mode sombre activé)
        if (body.classList.contains('dark')) {
            // Si oui, retire la classe 'dark' pour passer au mode clair
            body.classList.remove('dark');
            modeIcon.style.fill = 'white'; // Réinitialise la couleur de l'icône
            localStorage.setItem('mode', 'light'); // Enregistre le choix de l'utilisateur dans le stockage local
        } else {
            // Si non, ajoute la classe 'dark' pour passer au mode sombre
            body.classList.add('dark');
            modeIcon.style.fill = 'black'; // Change la couleur de l'icône
            localStorage.setItem('mode', 'dark'); // Enregistre le choix de l'utilisateur dans le stockage local
        }
        });