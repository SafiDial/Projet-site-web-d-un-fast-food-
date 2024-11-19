// **************** la transparence au défilement la barre de navigation ********************//


document.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled"); // Applique la transparence au défilement
    } else {
        navbar.classList.remove("scrolled"); // Réinitialise à l'opacité initiale
    }
});



// **************** Pour le menu burger afin de le fermer si un lien est cliqué ********************//


// Sélectionner tous les liens de la barre de navigation
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// un écouteur d'événement pour chaque lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Si le menu est ouvert, on le ferme
        const navbarCollapse = document.getElementById('navbarNav');
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click(); 
        }
    });
});





// *********************la fleche pour aprops qui apparait en fonction le taille de l'ecran ********************//

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
        voirPlus.innerHTML = 'arrow_drop_down'; // Flèche (Voir plus)
    } else {
        voirPlus.innerHTML = 'arrow_drop_up'; // Flèche (Voir moins)
    }
});






// **************** Menu affichage en fonction de la categorie cliquer ********************//


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

// **************** Menu affichage en fonction de la categorie cliquer (pas tout les_categories_visibles en mm temps) ********************//

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



// **************** Pour afficher le modal du repas selectionne ********************//


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
    const item = menuItems[index]; 
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





// **************** Pour les images dans a propos.html ********************//


    // Définition des images pour chaque catégorie
    var images = {
        poulet: [
            "../css/images/dessert.png",
            "../css/images/fastfood1.png",
            "../css/images/desert_cheesecake.png"
        ],
        pizza: [
            "../css/images/chefouverture.png",
            "../css/images/Apropos.png",
            "../css/images/Aceuil2.jpg"
        ],
        burger: [
            "../css/images/fastfood1.png",
            "../css/images/fastfood1.png",
            "../css/images/chefouverture.png"
        ]
    };

    // Fonction pour changer les images
    function changeImages(type) {
        var selectedImages = images[type]; // Obtenir les images correspondantes

        // Mettre à jour les images
        document.getElementById('image1').src = selectedImages[0];
        document.getElementById('image2').src = selectedImages[1];
        document.getElementById('image3').src = selectedImages[2];

        // Réinitialiser les classes des boutons
        resetButtons();

        // Activer le bouton correspondant
        var selectedButton = document.getElementById('btn' + capitalizeFirstLetter(type));
        selectedButton.classList.add('active');
        selectedButton.classList.remove('inactive');
    }

    // Réinitialiser les boutons
    function resetButtons() {
        var buttons = document.querySelectorAll('.food-button');
        buttons.forEach(function(button) {
            button.classList.add('inactive');
            button.classList.remove('active');
        });
    }

    // Capitaliser la première lettre pour lier l'id du bouton
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Initialiser avec "Poulet" actif
    document.addEventListener('DOMContentLoaded', function() {
        changeImages('poulet');
    });

