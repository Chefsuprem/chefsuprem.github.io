const sunBtn = document.getElementById("toggle-mode");

sunBtn.addEventListener('mouseenter', () => {
    sunBtn.classList.add('bx-spin');
});

sunBtn.addEventListener('mouseleave', () => {
    sunBtn.classList.remove('bx-spin');
});