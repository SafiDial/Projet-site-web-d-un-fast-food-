
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
