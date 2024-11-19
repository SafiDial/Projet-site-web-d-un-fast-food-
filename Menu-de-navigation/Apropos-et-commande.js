// **************** la transparence au défilement la barre de navigation ********************//


document.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled"); // Applique la transparence au défilement
    } else {
        navbar.classList.remove("scrolled"); // Réinitialise à l'opacité initiale
    }
});




// **************** Pour les images dans a propos.html ********************//
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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Initialiser avec "Poulet" actif
    document.addEventListener('DOMContentLoaded', function() {
        changeImages('poulet');
    });


    // **************** Pour les commandes de la page commande.html ********************//

    

    let panier = [];
    let total = 0;

    // Ajouter un élément au panier
    function addToPanier(name, price) {
        const item = panier.find(item => item.name === name);
        if (item) {
            item.quantity++;
        } else {
            panier.push({ name, price, quantity: 1 });
        }
        total += price;
        updatePanier();
    }

    // Mettre à jour l'affichage du panier
    function updatePanier() {
        const panierElement = document.getElementById('panier');
        const totalElement = document.getElementById('total');

        if (panier.length > 0) {
            panierElement.innerHTML = '<ul>' + panier.map(item => `
                <li>
                    ${item.name} - ${item.quantity} x ${item.price.toFixed(2)} €
                    <button class="btn btn-warning btn-sm" onclick="modifyQuantity('${item.name}', ${item.quantity + 1})">+</button>
                    <button class="btn btn-warning btn-sm" onclick="modifyQuantity('${item.name}', ${item.quantity - 1})">-</button>
                    <button class="btn btn-danger btn-sm" onclick="removeFromPanier('${item.name}')">Supprimer</button>
                </li>`).join('') + '</ul>';
        } else {
            panierElement.innerHTML = '<p>Aucun article dans le panier.</p>';
        }

        // Afficher le total
        totalElement.innerHTML = `<strong>${total.toFixed(2)} €</strong>`;
    }

    // Action pour le bouton "Passer à la commande"
    document.getElementById('btnCheckout').addEventListener('click', () => {
        if (panier.length > 0) {
            alert('Commande passée ! Total: ' + total.toFixed(2) + ' €');
            panier = []; // Réinitialiser le panier
            total = 0;   // Réinitialiser le total
            updatePanier(); // Mettre à jour l'affichage du panier
        } else {
            alert('Votre panier est vide.');
        }
    });

    // Ajouter des événements sur les boutons "Ajouter au Panier"
    document.querySelectorAll('.btn-custom').forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            addToPanier(name, price);
        });
    });
