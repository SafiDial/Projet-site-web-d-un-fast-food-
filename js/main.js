// ************* La transparence au défilement de la barre de navigation ****************/
document.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ************** Pour le menu burger afin de le fermer si un lien est cliqué ******************/
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Ajout d'un écouteur d'événement pour chaque lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Si le menu est ouvert, on le ferme
        const navbarCollapse = document.getElementById('offcanvasMenu'); 
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click(); 
        }
    });
});

// ************** Fonction pour fermer le menu si l'écran est redimensionné **********************/
window.addEventListener('resize', function () {
    const offcanvas = document.getElementById('offcanvasMenu');
    const offcanvasBackdrop = document.querySelector('.offcanvas-overlay');
    // Si la fenêtre est plus grande que 992px (taille de bureau) et que le menu est ouvert
    if (window.innerWidth > 992 && offcanvas.classList.contains('show')) {
        // Ferme le menu
        offcanvas.classList.remove('show');
        offcanvasBackdrop.style.display = 'none'; 
        offcanvas.setAttribute('aria-hidden', 'true');
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

// ************* Menu Offcanvas et gestion de l'ouverture/fermeture + overlay ****************/

// Récupérer les éléments nécessaires
const offcanvas = document.getElementById('offcanvasMenu');
const offcanvasOverlay = document.querySelector('.offcanvas-overlay');
const btnClose = document.querySelector('.btn-close');
const btnOpen = document.querySelectorAll('[data-bs-toggle="offcanvas"]'); 

// Fonction pour ouvrir le menu Offcanvas
function openOffcanvas() {
    offcanvas.classList.add('show'); 
    offcanvasOverlay.style.display = 'block'; 
    offcanvas.setAttribute('aria-hidden', 'false'); 
}

// Fonction pour fermer le menu Offcanvas
function closeOffcanvas() {
    offcanvas.classList.remove('show'); // Cacher le menu
    offcanvasOverlay.style.display = 'none'; // Cacher l'overlay
    offcanvas.setAttribute('aria-hidden', 'true'); // Rendre le menu inaccessible
}

// Ouvrir le menu quand un bouton ayant [data-bs-toggle="offcanvas"] est cliqué
btnOpen.forEach(button => {
    button.addEventListener('click', openOffcanvas);
});

// Fermer le menu quand le bouton de fermeture (X) est cliqué
btnClose.addEventListener('click', closeOffcanvas);

// Fermer le menu quand l'overlay est cliqué
offcanvasOverlay.addEventListener('click', closeOffcanvas);

// Optionnel : Fermer le menu si la touche "Échap" est pressée
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && offcanvas.classList.contains('show')) {
        closeOffcanvas();
    }
});


// **************** Menu affichage en fonction de la catégorie cliquée ********************//



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

    // Met à jour les catégories actives
    categories.forEach((category, index) => {
        if (index === currentCategoryIndex) {
            category.classList.add('active');
        } else {
            category.classList.remove('active');
        }
    });

    // Met à jour le titre de la catégorie pour les petits écrans
    const categoryName = categories[currentCategoryIndex].getAttribute('data-category');
    categoryTitle.textContent = categoryTitles[categoryName];
}

// Géres le clic sur les catégories pour les écrans moyens et larges
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



// **************** Toggle pour le menu de téléchargement (afficher/masquer) ********************//

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

//****************** Sélectionner la section centrale pour l'affichage des_horraires masques **************/

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


//*********************** scrypt pour les avis **************************************** */

document.addEventListener('DOMContentLoaded', () => {
    let note = 0;

    // Gestion des étoiles (survol, clic)
    const etoiles = document.querySelectorAll('.avisUtilisateurs_etoile');
    etoiles.forEach((etoile) => {
        etoile.addEventListener('mouseover', () => {
            const valeur = etoile.getAttribute('data-note');
            mettreAJourEtoiles(valeur); // Met à jour les étoiles au survol
        });

        etoile.addEventListener('mouseout', () => {
            mettreAJourEtoiles(note); // Reme l'état basé sur la note actuelle
        });

        etoile.addEventListener('click', () => {
            note = etoile.getAttribute('data-note');
            mettreAJourEtoiles(note); // Fixe la note
        });
    });

    function mettreAJourEtoiles(valeur) {
        etoiles.forEach((etoile) => {
            if (etoile.getAttribute('data-note') <= valeur) {
                etoile.classList.add('filled'); // Ajoute la classe pour étoile pleine
            } else {
                etoile.classList.remove('filled'); // Supprime la classe pour étoile vide
            }
        });
    }

    // Gestion de l'envoi du formulaire
    const formulaireAvis = document.getElementById('avisUtilisateurs_form');
    formulaireAvis.addEventListener('submit', (e) => {
        e.preventDefault();

        const nom = document.getElementById('avisUtilisateurs_nom').value;
        const commentaire = document.getElementById('avisUtilisateurs_commentaire').value;

        if (!nom || note === 0) {
            alert('Veuillez fournir un nom et une note.');
            return;
        }
        // Crée un objet d'avis
        const avis = {
            nom,
            note,
            commentaire: commentaire || 'Aucun commentaire.'
        };

        // Récupére les avis existants dans le localStorage
        let avisListe = JSON.parse(localStorage.getItem('avisUtilisateurs')) || [];
        avisListe.unshift(avis); // l'avis au début de la liste
        localStorage.setItem('avisUtilisateurs', JSON.stringify(avisListe));

        // Réinitialiser le formulaire
        formulaireAvis.reset();
        note = 0;
        mettreAJourEtoiles(0); // Réinitialiser les étoiles

        chargerAvis(); // Mettre à jour le carrousel
    });

    // Charge les avis dans le carrousel
    function chargerAvis() {
        const avisListe = JSON.parse(localStorage.getItem('avisUtilisateurs')) || [];
        const carouselInner = document.getElementById('avisUtilisateurs_carouselCommentaires');
        carouselInner.innerHTML = ''; // pour_Vide le contenu actuel

        if (avisListe.length === 0) {
            carouselInner.innerHTML = `
                <div class="carousel-item active">
                    <div class="avisUtilisateurs_comment-box">
                        <p class="lead">Aucun avis pour le moment.</p>
                    </div>
                </div>`;
            return;
        }

        avisListe.forEach((avis, index) => {
            const item = document.createElement('div');
            item.classList.add('carousel-item');
            if (index === 0) item.classList.add('active'); // Le premier élément est actif

            item.innerHTML = `
                <div class="avisUtilisateurs_comment-box">
                    <h5>${avis.nom}</h5>
                    <div class="avisUtilisateurs_etoiles">
                        ${'★'.repeat(avis.note)}${'☆'.repeat(5 - avis.note)}
                    </div>
                    <p>${avis.commentaire}</p>
                </div>`;

            carouselInner.appendChild(item);
        });
    }

    // Charge les avis au démarrage
    chargerAvis();
});

// **************** Pour les images dans a propos.html ********************//

