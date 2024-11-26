// **************** La transparence au défilement de la barre de navigation ********************

document.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled"); // Applique la transparence au défilement
    } else {
        navbar.classList.remove("scrolled"); // Réinitialise à l'opacité initiale
    }
});

// **************** Pour le menu burger afin de le fermer si un lien est cliqué ********************

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Ajout d'un écouteur d'événement pour chaque lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Si le menu est ouvert, on le ferme
        const navbarCollapse = document.getElementById('offcanvasMenu'); // Utiliser l'ID du menu
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click(); // Cela déclenche la fermeture du menu
        }
    });
});




// Fonction pour fermer le menu si l'écran est redimensionné
window.addEventListener('resize', function () {
    const offcanvas = document.getElementById('offcanvasMenu');
    const offcanvasBackdrop = document.querySelector('.offcanvas-overlay');
    
    // Si la fenêtre est plus grande que 992px (taille de bureau) et que le menu est ouvert
    if (window.innerWidth > 992) {
        if (offcanvas.classList.contains('show')) {
            // Ferme le menu
            offcanvas.classList.remove('show');
            offcanvasBackdrop.style.display = 'none'; // Enlève l'arrière-plan du menu
        }
    }
});



// ********************* Menu affichage en fonction de la catégorie cliquée ********************//



const categories = document.querySelectorAll('.category');
const menus = document.querySelectorAll('.menu-items');
const categoryTitle = document.getElementById('category-title');
let currentCategoryIndex = 0;

// Tableau des titres de catégories
const categoryTitles = {
    special: "MENU SPÉCIAL",
    boissons: "BOISSONS",
    mer: "PRODUITS DE LA MER",
    desserts: "DESSERTS"
};

// Fonction pour mettre à jour l'affichage du menu
function updateMenuDisplay() {
    // Masquer toutes les catégories de menus
    menus.forEach(menu => menu.classList.add('hidden'));

    // Afficher la catégorie active
    menus[currentCategoryIndex].classList.remove('hidden');

    // Mettre à jour les catégories actives
    categories.forEach((category, index) => {
        if (index === currentCategoryIndex) {
            category.classList.add('active');
        } else {
            category.classList.remove('active');
        }
    });

    // Mettre à jour le titre de la catégorie pour les petits écrans
    const categoryName = categories[currentCategoryIndex].getAttribute('data-category');
    categoryTitle.textContent = categoryTitles[categoryName];
}

// Gérer le clic sur les catégories pour les écrans moyens et larges
categories.forEach((category, index) => {
    category.addEventListener('click', () => {
        currentCategoryIndex = index;
        updateMenuDisplay();
    });
});

// Gestion des boutons "précédent" et "suivant" pour les petits écrans
document.querySelector('.prev-category').addEventListener('click', () => {
    if (currentCategoryIndex > 0) {
        currentCategoryIndex--;
        updateMenuDisplay();
    }
});

document.querySelector('.next-category').addEventListener('click', () => {
    if (currentCategoryIndex < categories.length - 1) {
        currentCategoryIndex++;
        updateMenuDisplay();
    }
});

// Initialisation
updateMenuDisplay();



// ********************* Toggle pour le menu de téléchargement (afficher/masquer) ********************//

function toggleDownloadOptions() {
    const options = document.querySelector('.download-options');
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

// Ferme le menu déroulant si on clique en dehors
window.onclick = function (event) {
    if (!event.target.matches('.btn-download-main')) {
        const dropdowns = document.querySelector('.download-options');
        if (dropdowns.style.display === 'block') {
            dropdowns.style.display = 'none';
        }
    }
};




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
    buttons.forEach(function (button) {
        button.classList.add('inactive');
        button.classList.remove('active');
    });
}

// Capitaliser la première lettre pour lier l'id du bouton
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialiser avec "Poulet" actif
document.addEventListener('DOMContentLoaded', function () {
    changeImages('poulet');
});

