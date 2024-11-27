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
    // Vérifie si l'article existe déjà dans le panier
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

            // Affichage de l'article avec sa quantité et le prix
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

    // Mettre à jour l'affichage du panier
    afficherPanier();
}

// Fonction pour supprimer un article du panier
function supprimerArticle(index) {
    // Supprimer l'article à l'index spécifié
    panier.splice(index, 1);

    // Mettre à jour l'affichage du panier
    afficherPanier();
}

// Ajouter des écouteurs d'événements pour chaque bouton "Ajouter au Panier"
const buttons = document.querySelectorAll(".btn-custom");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        ajouterAuPanier(name, price);
    });
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










