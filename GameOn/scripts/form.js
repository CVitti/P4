document.querySelector("#reserve input[type='submit']").addEventListener("click", (e) =>{
    
    // Annulation du submit lors du clic sur le bouton du formulaire
    e.preventDefault();

    // Validité par défaut du formulaire, à tester avec les différents éléments par la suite
    let valid = true;
    let radioChecked = false;

    // Récupération des input du formulaire qui nécéssitent des contrôles de saisie
    let fields = document.querySelectorAll("#reserve input[type='text'], #reserve input[type='email'], #reserve input[type='date'], #reserve input[type='number'], #reserve #checkbox1");
    let radioBtns = document.querySelectorAll("#reserve input[type='radio']");

    // Test de validité chaque input Text/Date/email/Checkbox
    // Valid = False si l'un des champs n'est pas conforme lors du retour de la fonction, sinon True
    for (const field of fields) {
        valid &= errorCheck(field);
    }

    // Test des boutons radio un par un pour vérifier qu'au moins l'un deux est coché
    
    for (const btn of radioBtns) {
        if (!radioChecked && btn.checked){
            radioChecked = true;
        }
    }

    // Valid = False si aucun bouton n'est coché lors du retour de la fonction, sinon True
    valid &= radioChecked;

    // Affichage de l'erreur si aucun bouton coché
    let spanIdLocation = document.getElementById("errorLocation");
    if(!radioChecked){
        spanIdLocation.style.display = "inline-block";
        spanIdLocation.innerHTML = "Merci de sélectionner un tournoi dans la liste ci-dessus.";
    }else{
        spanIdLocation.style.display = "none";
        spanIdLocation.innerHTML = "";
    }

    // Si tout est validé, mise en place du compte à rebours + envoi du formulaire
    if(valid){
        document.querySelector("#reserve input[type='submit']")?.setAttribute("data-error-visible", "false");
        // Nombre de secondes du compte à rebours
        let countdown = 3;

        // Le formulaire est caché et affichage de la pop-up de confirmation d'envoi du formulaire à sa place
        document.getElementById('countdown').innerHTML = `Merci de votre inscription,<br> cette page s'actualisera dans ${countdown} secondes`;
        document.getElementById("modal-body").style.display = "none";
        document.getElementById("modal-confirm").style.display = "block";

        // Envoi du formulaire en décalé
        setTimeout(function () {
            document.forms["reserve"].submit();
        }, countdown*1000);

        // Démarrage du compte à rebours, actualisé chaque seconde
        for (let i = 0; i < 3; i++) {
            setTimeout(function () {
                document.getElementById('countdown').innerHTML = `Merci de votre inscription,<br> cette page s'actualisera dans ${countdown} secondes`;
                countdown -- ;
            }, i*1000);
        }           
    }else{
        document.querySelector("#reserve input[type='submit']").setAttribute("data-error-visible", "true");
    }

});

function errorCheck(input){
    let spanId;
    // Vérification du champ Prénom
    if(input.id == "first"){
        spanId = document.getElementById("errorFirst");
        // Si valeur manquante ou trop courte alors affichage d'une erreur
        if (input.validity.valueMissing || input.validity.tooShort || input.validity.patternMismatch) {
            input.style.border = "solid 2px #e54858";
            spanId.innerHTML = `Veuillez entrer ${input.minLength} caractères ou plus pour le champ du prénom. Caractères autorisés : Lettres avec ou sans accent, tiret et espace`;  
            spanId.style.display = "inline-block";
        } else {
            input.style.border = "none";
            spanId.innerHTML = "";
            spanId.style.display = "none";
        }

        return input.checkValidity();

    }
    
    // Vérification du champ Nom
    if(input.id == "last"){
        spanId = document.getElementById("errorLast");
        // Si valeur manquante ou trop courte alors affichage d'une erreur
        if (input.validity.valueMissing || input.validity.tooShort || input.validity.patternMismatch) {
            input.style.border = "solid 2px #e54858";
            spanId.innerHTML = `Veuillez entrer ${input.minLength} caractères ou plus pour le champ du prénom. Caractères autorisés : Lettres avec ou sans accent, tiret et espace`;
            spanId.style.display = "inline-block";
        } else {
            input.style.border = "none";
            spanId.innerHTML = "";
            spanId.style.display = "none";
        }

        return input.checkValidity();

    }

    // Vérification du champ Email
    if(input.id == "email"){
        spanId = document.getElementById("errorEmail");
        // Si valeur manquante ou ne correspond pas à un email alors affichage d'une erreur
        if (input.validity.valueMissing || input.validity.typeMismatch) {
            input.style.border = "solid 2px #e54858";
            spanId.innerHTML = "L'adresse email doit être au format suivant : example@mail.com";
            spanId.style.display = "inline-block";
        } else {
            input.style.border = "none";
            spanId.innerHTML = "";
            spanId.style.display = "none";
        } 
        return input.checkValidity();
    }

    // Vérification du champ Date de naissance
    if(input.id == "birthdate"){
        spanId = document.getElementById("errorBirthdate");

        // Mise en place de date max/min pour la date de naissance
        let today = new Date();
        let dateMin = new Date("1900-01-01");
        let inputDate = new Date(input.value);
        
        // Si valeur manquante ou mal formatée alors affichage d'une erreur
        if (input.validity.valueMissing || input.validity.typeMismatch || (inputDate.getTime() > today.getTime()) || (inputDate.getTime() < dateMin.getTime())) {
            input.style.border = "solid 2px #e54858";
            spanId.innerHTML = `Vous devez renseigner une date de naissance valide entre le ${dateMin.toLocaleDateString("fr")} et aujourd'hui`;
            spanId.style.display = "inline-block";
            return false;
        } else {
            input.style.border = "none";
            spanId.innerHTML = "";
            spanId.style.display = "none";
            return true;
        }
    }

    // Vérification du champ Quantité
    if(input.id == "quantity"){
        spanId = document.getElementById("errorQuantity");
        // Si valeur manquante ou trop courte/longue ou mal formatée alors affichage d'une erreur
        if (input.validity.valueMissing || input.validity.typeMismatch || input.validity.rangeOverflow || input.validity.rangeUnderflow) {
            input.style.border = "solid 2px #e54858";
            spanId.innerHTML = "Veuillez renseigner ce champ avec un nombre entre 0 et 100.";
            spanId.style.display = "inline-block";
        } else {
            if (input.value == -0){
                input.value = 0;
            }
            input.style.border = "none";
            spanId.innerHTML = "";
            spanId.style.display = "none";
        }

        return input.checkValidity();

    }

    // Vérification de la case CGU
    if(input.id == "checkbox1"){
        spanId = document.getElementById("errorCGU");
        // Si la case n'est pas cochée alors affichage d'une erreur
        if (input.checked == false) {
            spanId.innerHTML = "Les conditions d'utilisations doivent être acceptées pour valider le formulaire.";
            spanId.style.display = "inline-block";
        } else {
            spanId.innerHTML = "";
            spanId.style.display = "none";
        }

        return input.checkValidity();
        
    }

}