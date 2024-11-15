document.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled"); // Applique la transparence au défilement
    } else {
        navbar.classList.remove("scrolled"); // Réinitialise à l'opacité initiale
    }
});





// Sélectionner tous les liens de la barre de navigation
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Ajouter un écouteur d'événement pour chaque lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Si le menu est ouvert, on le ferme
        const navbarCollapse = document.getElementById('navbarNav');
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click(); // Simule un clic pour fermer le menu
        }
    });
});







// Fonction pour gérer l'affichage du texte en fonction de la taille de l'écran
function handleTextDisplay() {
    var texteLong = document.getElementById('texteLong');
    var voirPlus = document.getElementById('voirPlus');

    // Si la largeur de l'écran est petite (mobile), afficher le texte tronqué
    if (window.innerWidth <= 576) {
        texteLong.classList.add('texte-court');
        texteLong.classList.remove('texte-complet');
        voirPlus.style.display = 'inline'; // Afficher la flèche "Voir plus"
    } else {
        // Sur les grands écrans, afficher tout le texte sans flèche
        texteLong.classList.add('texte-complet');
        texteLong.classList.remove('texte-court');
        voirPlus.style.display = 'none'; // Cacher la flèche "Voir plus"
    }
}

// Initialisation au chargement de la page
window.onload = handleTextDisplay;

// Réagir à la redimension du navigateur
window.onresize = handleTextDisplay;

// Gérer l'événement du clic sur la flèche "Voir plus"
document.getElementById('voirPlus').addEventListener('click', function() {
    var texteLong = document.getElementById('texteLong');
    var voirPlus = document.getElementById('voirPlus');

    texteLong.classList.toggle('texte-court');
    texteLong.classList.toggle('texte-complet');

    if (texteLong.classList.contains('texte-court')) {
        voirPlus.innerHTML = 'arrow_drop_down'; // Flèche vers le bas (Voir plus)
    } else {
        voirPlus.innerHTML = 'arrow_drop_up'; // Flèche vers le haut (Voir moins)
    }
});















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





let categories = ['special', 'boissons', 'mer', 'desserts'];
let currentCategoryIndex = 0;

function updateCategory() {
    // Cacher tous les menus
    document.querySelectorAll('.menu-items').forEach(item => item.classList.add('hidden'));
    
    // Afficher le menu de la catégorie actuelle
    const currentCategory = categories[currentCategoryIndex];
    document.getElementById(`${currentCategory}-menu`).classList.remove('hidden');
    
    // Mettre à jour le titre de la catégorie active
    const categoryTitles = {
        'special': 'MENU SPÉCIAL',
        'boissons': 'BOISSONS',
        'mer': 'PRODUITS DE LA MER',
        'desserts': 'DESSERTS'
    };
    document.getElementById('category-title').textContent = categoryTitles[currentCategory];
}

document.querySelector('.prev-category').addEventListener('click', () => {
    currentCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
    updateCategory();
});

document.querySelector('.next-category').addEventListener('click', () => {
    currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
    updateCategory();
});

// Initialiser avec la première catégorie
updateCategory();










// Variable pour suivre l'index de l'élément affiché
let currentIndex = null;

// Sélectionner les éléments du modal et du menu
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalImage = document.getElementById('modal-image');
const menuItems = document.querySelectorAll('.menu-item');
const menuModalLabel = document.getElementById('menuModalLabel');

// Fonction pour mettre à jour le contenu du modal avec les informations du plat
function updateModalContent(index) {
    const item = menuItems[index]; // Obtenez l'élément du tableau basé sur l'index
    modalTitle.textContent = item.dataset.name;
    modalDescription.textContent = item.dataset.description;
    modalImage.src = item.dataset.image;
    modalImage.alt = `Image de ${item.dataset.name}`;
    menuModalLabel.textContent = `${item.dataset.name} - ${item.dataset.price}`;
    currentIndex = index;
}

// Ajoutez un écouteur d'événements pour chaque élément du menu
menuItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        updateModalContent(index); // Mettre à jour le contenu du modal avec le plat sélectionné
        const modal = new bootstrap.Modal(document.getElementById('menuModal'));
        modal.show(); // Afficher le modal
    });
});

// Gérer le clic sur la flèche précédente
document.getElementById('prev-btn').addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--; // Descendre l'index
        updateModalContent(currentIndex); // Mettre à jour le contenu du modal
    }
});

// Gérer le clic sur la flèche suivante
document.getElementById('next-btn').addEventListener('click', function() {
    if (currentIndex < menuItems.length - 1) {
        currentIndex++; // Augmenter l'index
        updateModalContent(currentIndex); // Mettre à jour le contenu du modal
    }
});














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
