// ************* La transparence au défilement de la barre de navigation ****************/
document.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (navbar && window.scrollY > 50) { // Vérification si l'élément existe
        navbar.classList.add("scrolled");
    } else if (navbar) {
        navbar.classList.remove("scrolled");
    }
});

// ************** Pour le menu burger afin de le fermer si un lien est cliqué ******************/
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Ajout d'un écouteur d'événement pour chaque lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.getElementById('offcanvasMenu'); 
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarToggler.click(); 
        }
    });
});

// ************** Fonction pour fermer le menu si l'écran est redimensionné **********************/
window.addEventListener('resize', function () {
    const offcanvas = document.getElementById('offcanvasMenu');
    const offcanvasBackdrop = document.querySelector('.offcanvas-overlay');
    if (offcanvas && window.innerWidth > 992 && offcanvas.classList.contains('show')) {
        offcanvas.classList.remove('show');
        if (offcanvasBackdrop) offcanvasBackdrop.style.display = 'none';
        offcanvas.setAttribute('aria-hidden', 'true');
    }
});

// Ajout de la classe 'offcanvas-open' lorsque le menu est ouvert
const offcanvasMenu = document.getElementById('offcanvasMenu');
if (offcanvasMenu) {
    offcanvasMenu.addEventListener('shown.bs.offcanvas', function () {
        document.body.classList.add('offcanvas-open');
    });
    
    // Retrait de la classe 'offcanvas-open' lorsque le menu est fermé
    offcanvasMenu.addEventListener('hidden.bs.offcanvas', function () {
        document.body.classList.remove('offcanvas-open');
    });
}

// ************* Menu Offcanvas et gestion de l'ouverture/fermeture + overlay ****************/
const offcanvas = document.getElementById('offcanvasMenu');
const offcanvasOverlay = document.querySelector('.offcanvas-overlay');
const btnClose = document.querySelector('.btn-close');
const btnOpen = document.querySelectorAll('[data-bs-toggle="offcanvas"]');

// Fonction pour ouvrir le menu Offcanvas
function openOffcanvas() {
    if (offcanvas) {
        offcanvas.classList.add('show');
        if (offcanvasOverlay) offcanvasOverlay.style.display = 'block';
        offcanvas.setAttribute('aria-hidden', 'false');
    }
}

// Fonction pour fermer le menu Offcanvas
function closeOffcanvas() {
    if (offcanvas) {
        offcanvas.classList.remove('show');
        if (offcanvasOverlay) offcanvasOverlay.style.display = 'none';
        offcanvas.setAttribute('aria-hidden', 'true');
    }
}

// Ouvrir le menu quand un bouton ayant [data-bs-toggle="offcanvas"] est cliqué
btnOpen.forEach(button => {
    button.addEventListener('click', openOffcanvas);
});

// Fermer le menu quand le bouton de fermeture (X) est cliqué
if (btnClose) {
    btnClose.addEventListener('click', closeOffcanvas);
}

// Fermer le menu quand l'overlay est cliqué
if (offcanvasOverlay) {
    offcanvasOverlay.addEventListener('click', closeOffcanvas);
}

// Optionnel : Fermer le menu si la touche "Échap" est pressée
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && offcanvas && offcanvas.classList.contains('show')) {
        closeOffcanvas();
    }
});

// **************** Pour les images dans a propos.html ********************//
var images = {
    poulet: [
        "../css/images/poul1.jpg",
        "../css/images/POUL2.jpg",
        "../css/images/POUL3.jpeg",
    ],
    pizza: [
        "../css/images/pizza2.jpg",
        "../css/images/pizza22.jpeg",
        "../css/images/PIZZA3.jpg"
    ],
    burger: [
        "../css/images/burger11.jpg",
        "../css/images/M9.jpg",
        "../css/images/Aceuil2.jpg"
    ]
};

// Fonction pour changer les images
function changeImages(type) {
    var selectedImages = images[type]; // Obtenir les images correspondantes
    var image1 = document.getElementById('image1');
    var image2 = document.getElementById('image2');
    var image3 = document.getElementById('image3');

    if (image1 && image2 && image3) {
        image1.src = selectedImages[0];
        image2.src = selectedImages[1];
        image3.src = selectedImages[2];
    }

    // Réinitialiser les classes des boutons
    resetButtons();

    // Activer le bouton correspondant
    var selectedButton = document.getElementById('btn' + capitalizeFirstLetter(type));
    if (selectedButton) {
        selectedButton.classList.add('active');
        selectedButton.classList.remove('inactive');
    }
}

// Réinitialiser les boutons
function resetButtons() {
    var buttons = document.querySelectorAll('.food-button');
    buttons.forEach(function (button) {
        button.classList.add('inactive');
        button.classList.remove('active');
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialiser avec "Poulet" actif
document.addEventListener('DOMContentLoaded', function () {
    changeImages('poulet');
});

// **************** Pour les commandes de la page commande.html ********************//

// Tableau pour stocker les articles du panier
let panier = [];

// Fonction pour ajouter un article au panier
function ajouterAuPanier(name, price) {
    const articleExist = panier.find(item => item.name === name);

    if (articleExist) {
        // Si l'article existe, augmenter la quantité
        articleExist.quantity++;
    } else {
        // Si l'article n'existe pas, l'ajouter avec une quantité de 1
        const article = { name, price, quantity: 1 };
        panier.push(article);
    }

    afficherPanier();
}

// Fonction pour afficher les articles dans le panier et le total
function afficherPanier() {
    const panierContent = document.getElementById("panier-content");

    // Vider le contenu actuel
    panierContent.innerHTML = '';

    if (panier.length === 0) {
        panierContent.innerHTML = '<p>Aucun article dans le panier.</p>';
    } else {
        // Créer une liste d'articles
        panier.forEach((article, index) => {
            const articleElement = document.createElement("div");
            articleElement.classList.add("panier-item");

            articleElement.innerHTML = `
                <p>${article.name} - ${article.price.toFixed(2)} € x ${article.quantity}</p>
                <button onclick="modifierQuantite(${index}, -1)">-</button>
                <button onclick="modifierQuantite(${index}, 1)">+</button>
                <button onclick="supprimerArticle(${index})">Supprimer</button>
            `;
            panierContent.appendChild(articleElement);
        });
    }

    // Mettre à jour le total
    const total = panier.reduce((sum, article) => sum + article.price * article.quantity, 0);
    document.getElementById("total").textContent = total.toFixed(2);
}

// Fonction pour modifier la quantité d'un article dans le panier
function modifierQuantite(index, changement) {
    const article = panier[index];

    // Ajuster la quantité
    article.quantity += changement;

    // Si la quantité devient inférieure à 1, retirer l'article du panier
    if (article.quantity < 1) {
        panier.splice(index, 1);
    }

    afficherPanier();
}

// Fonction pour supprimer un article du panier
function supprimerArticle(index) {
    panier.splice(index, 1);
    afficherPanier();
}

// Ajouter des écouteurs d'événements pour chaque bouton "Ajouter au Panier"
document.body.addEventListener('click', function(event) {
    if (event.target && event.target.matches('.btn-custom')) {
        const name = event.target.getAttribute("data-name");
        const price = parseFloat(event.target.getAttribute("data-price"));
        ajouterAuPanier(name, price);
    }
});

// Fonction pour gérer l'action du bouton "Passer à la commande"
document.getElementById("btnCheckout").addEventListener("click", () => {
    if (panier.length === 0) {
        alert("Votre panier est vide. Ajoutez des articles avant de passer à la commande.");
    } else {
        alert("Commande passée avec succès!");
        // Réinitialiser le panier
        panier = [];
        afficherPanier();
    }
});














