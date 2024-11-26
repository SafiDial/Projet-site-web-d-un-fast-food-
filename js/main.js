// **************** La transparence au défilement de la barre de navigation ********************

document.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled"); 
    } else {
        navbar.classList.remove("scrolled"); 
    }
});

// **************** Pour le menu burger afin de le fermer si un lien est cliqué ********************

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Ajout d'un écouteur d'événement pour chaque lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Si le menu est ouvert, on le ferme
        const navbarCollapse = document.getElementById('offcanvasMenu'); // ici c l'ID du menu
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click(); // Cela déclenche la fermeture du menu
        }
    });
});

// ************************* Fonction pour fermer le menu si l'écran est redimensionné ******************
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

// Ajout de la classe 'offcanvas-open' lorsque le menu est ouvert
document.getElementById('offcanvasMenu').addEventListener('shown.bs.offcanvas', function () {
    document.body.classList.add('offcanvas-open');
});

// Retrait de la classe 'offcanvas-open' lorsque le menu est fermé
document.getElementById('offcanvasMenu').addEventListener('hidden.bs.offcanvas', function () {
    document.body.classList.remove('offcanvas-open');
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

//****************************************** Sélectionner la section centrale pour l'affichage des_horraires masques *************
function toggleSection(divElement) {
    var center = divElement;
    var left = document.querySelector('.horaires.left');
    var right = document.querySelector('.horaires.right');

    // Vérifie si la section centrale est déjà ouverte
    var isOpen = center.classList.contains('open');

    // Si ouverte, on ferme tout
    if (isOpen) {
        center.classList.remove('open');
        left.classList.remove('open');
        right.classList.remove('open');
    } 
    // Si fermée, on ouvre la section centrale et les autres
    else {
        center.classList.add('open');
        left.classList.add('open');
        right.classList.add('open');
    }
}











document.addEventListener('DOMContentLoaded', () => {
    let rating = 0;
    let currentIndex = 0; // Index de l'avis actuel

    // Charger les avis depuis localStorage
    loadReviews();

    // Gestion du survol et de la sélection des étoiles
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const value = star.getAttribute('data-value');
            updateStars(value); // Mettre à jour les étoiles pendant le survol
        });

        star.addEventListener('click', () => {
            rating = star.getAttribute('data-value');
            updateStars(rating); // Fixer la notation après un clic
        });

        star.addEventListener('mouseout', () => {
            // Remettre les étoiles à leur état d'origine si l'utilisateur ne clique pas
            updateStars(rating); 
        });
    });

    // Met à jour les étoiles pour refléter la notation actuelle
    function updateStars(value) {
        stars.forEach(star => {
            const icon = star.querySelector('i');
            if (star.getAttribute('data-value') <= value) {
                icon.classList.remove('far');  // Enlever la classe 'far' pour une étoile vide
                icon.classList.add('fas');  // Ajouter la classe 'fas' pour une étoile pleine (orange)
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    }

    // Soumission du formulaire
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        if (rating === 0 || !name || !comment) {
            alert('Veuillez remplir tous les champs correctement.');
            return;
        }

        // Créer un objet d'avis
        const review = {
            name: name,
            rating: rating,
            comment: comment
        };

        // Récupérer les avis existants depuis localStorage
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

        // Ajouter le nouvel avis au début du tableau (pour que le plus récent soit en première position)
        reviews.unshift(review); 

        // Sauvegarder les avis dans localStorage
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Réinitialiser le formulaire après l'envoi
        reviewForm.reset();
        updateStars(0); // Réinitialiser les étoiles
        rating = 0; // Réinitialiser l'évaluation
        
        // Afficher l'avis ajouté
        loadReviews();
    });

    // Fonction pour afficher un seul avis
    function displayReview(index) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const carousel = document.getElementById('carousel');

        if (reviews.length === 0) {
            carousel.innerHTML = "<div class='review'><h3>Pas d'avis pour le moment</h3></div>";
        } else {
            const review = reviews[index];

            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');

            const reviewName = document.createElement('h4');
            reviewName.textContent = review.name;

            const reviewRating = document.createElement('p');
            reviewRating.classList.add('rating');
            reviewRating.innerHTML = 'Évaluation: ' + '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

            const reviewComment = document.createElement('p');
            reviewComment.textContent = review.comment;

            reviewElement.appendChild(reviewName);
            reviewElement.appendChild(reviewRating);
            reviewElement.appendChild(reviewComment);

            carousel.innerHTML = ''; // Clear previous reviews
            carousel.appendChild(reviewElement);
        }
    }

    // Fonction pour charger les avis
    function loadReviews() {
        displayReview(currentIndex);
    }

    // Navigation dans le carrousel
    const prevButton = document.getElementById('prevReview');
    const nextButton = document.getElementById('nextReview');

    prevButton.addEventListener('click', () => {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        if (reviews.length > 0 && currentIndex > 0) {
            currentIndex--;
            displayReview(currentIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        if (reviews.length > 0 && currentIndex < reviews.length - 1) {
            currentIndex++;
            displayReview(currentIndex);
        }
    });
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

