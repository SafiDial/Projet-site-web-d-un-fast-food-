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

//******************Fonction de filtrage des images************************

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button[data-filter]');
    const items = document.querySelectorAll('.filter');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            items.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
