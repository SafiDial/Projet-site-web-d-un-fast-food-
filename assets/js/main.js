document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
    const menus = document.querySelectorAll(".menu-items");

    categories.forEach(category => {
        category.addEventListener("click", () => {
            // Enlève la classe 'active' des autres catégories
            categories.forEach(cat => cat.classList.remove("active"));
            category.classList.add("active");

            // Cache tous les menus
            menus.forEach(menu => menu.classList.add("hidden"));

            // Affiche le menu sélectionné
            const selectedMenu = document.getElementById(`${category.dataset.category}-menu`);
            if (selectedMenu) {
                selectedMenu.classList.remove("hidden");
            }
        });
    });
});


function toggleDownloadOptions() {
    const options = document.querySelector('.download-options');
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

// Ferme le menu déroulant si on clique en dehors
window.onclick = function(event) {
    if (!event.target.matches('.btn-download-main')) {
        const dropdowns = document.querySelector('.download-options');
        if (dropdowns.style.display === 'block') {
            dropdowns.style.display = 'none';
        }
    }
}















let currentSlide = 0;
const slides = document.querySelectorAll(".carousel2-slide");
const totalSlides = slides.length;
const carousel = document.querySelector(".carousel2");

// Fonction pour déplacer le carrousel
function moveSlide(direction) {
    currentSlide += direction;

    // Si on atteint la fin des slides, revenir au début
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    // Déplacement du carrousel
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Défilement automatique toutes les 3 secondes (par exemple)
let autoSlide = setInterval(() => moveSlide(1), 3000);

// Réinitialiser l'intervalle du défilement automatique après un clic sur les flèches
document.querySelector(".carousel2-button.left").addEventListener("click", () => {
    clearInterval(autoSlide); // Arrête le défilement automatique
    autoSlide = setInterval(() => moveSlide(1), 3000); // Redémarre le défilement automatique après 3 secondes
});

document.querySelector(".carousel2-button.right").addEventListener("click", () => {
    clearInterval(autoSlide); // Arrête le défilement automatique
    autoSlide = setInterval(() => moveSlide(1), 3000); // Redémarre le défilement automatique après 3 secondes
});
