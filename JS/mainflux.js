document.addEventListener('DOMContentLoaded', () => {
    const languageLinks = document.querySelectorAll('.language-link');

    languageLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = link.getAttribute('href');
            fetchRSS(href);
        });
    });
});

function fetchRSS(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rssWindow = window.open();
            rssWindow.document.write(data);
        })
        .catch(error => console.error('Error fetching RSS:', error));
}
