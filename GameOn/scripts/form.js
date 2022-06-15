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
    if(!radioChecked){
        document.getElementById("errorLocation").innerHTML = "Merci de sélectionner un tournoi dans la liste ci-dessus.";
    }else{
        document.getElementById("errorLocation").innerHTML = "";
    }

    // Si tout est validé, mise en place du compte à rebours + envoi du formulaire
    if(valid){

        // Nombre de secondes du compte à rebours
        let countdown = 3;

        // Le formulaire est caché et affichage de la pop-up de confirmation d'envoi du formulaire à sa place
        document.getElementById('countdown').innerHTML = `Merci de votre inscription,<br> cette page se fermera dans ${countdown} secondes`;
        document.getElementById("modal-body").style.display = "none";
        document.getElementById("modal-confirm").style.display = "block";

        // Envoi du formulaire en décalé
        setTimeout(function () {
            document.forms["reserve"].submit()
        }, countdown*1000);

        // Démarrage du compte à rebours, actualisé chaque seconde
        for (let i = 0; i < 3; i++) {
            setTimeout(function () {
                document.getElementById('countdown').innerHTML = `Merci de votre inscription,<br> cette page se fermera dans ${countdown} secondes`;
                countdown -- ;
            }, i*1000);
        }           
    }

});

function errorCheck(input){

    // Vérification du champ Prénom
    if(input.id == "first"){

        // Si valeur manquante ou trop courte alors affichage d'une erreur
        if (input.validity.valueMissing || input.validity.tooShort) {
            input.style.border = "solid 2px #e54858";
            document.getElementById("errorFirst").innerHTML = `Veuillez entrer ${input.minLength} caractères ou plus pour le champ du prénom.`;
        } else {
            input.style.border = "none";
            document.getElementById("errorFirst").innerHTML = "";
        }

        return input.checkValidity();

    }
    
    // Vérification du champ Nom
    if(input.id == "last"){

        // Si valeur manquante ou trop courte alors affichage d'une erreur
        if (input.validity.valueMissing || input.validity.tooShort) {
            input.style.border = "solid 2px #e54858";
            document.getElementById("errorLast").innerHTML = `Veuillez entrer ${input.minLength} caractères ou plus pour le champ du Nom.`;
        } else {
            input.style.border = "none";
            document.getElementById("errorLast").innerHTML = "";
        }

        return input.checkValidity();

    }

    // Vérification du champ Email
    if(input.id == "email"){
        
        // Mise en place d'une expression régulière pour prendre en compte les bons formats d'adresse email 
        // et rejeter les adresses du type"123@localhost" qui sont incorrectes mais prises en compte par le type email sur un input
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if (input.validity.valueMissing || input.validity.typeMismatch || !(input.value.match(mailformat))) {
            input.style.border = "solid 2px #e54858";
            document.getElementById("errorEmail").innerHTML = "L'adresse email doit être au format suivant : example@mail.com";
            return false;
        } else {
            input.style.border = "none";
            document.getElementById("errorEmail").innerHTML = "";
            return true;
        }
        // Retour true/false fait manuellement car le checkvalidity() ne prend pas en compte les erreurs corrigées par l'expression régulière 
    }

    // Vérification du champ Date de naissance
    if(input.id == "birthdate"){

        // Si valeur manquante ou mal formatée alors affichage d'une erreur
        if (input.validity.valueMissing || input.validity.typeMismatch) {
            input.style.border = "solid 2px #e54858";
            document.getElementById("errorBirthdate").innerHTML = "Vous devez renseigner une date de naissance valide : jj/mm/aaaa";
        } else {
            input.style.border = "none";
            document.getElementById("errorBirthdate").innerHTML = "";
        }

        return input.checkValidity();

    }

    // Vérification du champ Quantité
    if(input.id == "quantity"){

        // Si valeur manquante ou trop courte/longue ou mal formatée alors affichage d'une erreur
        if (input.validity.valueMissing || input.validity.typeMismatch || input.validity.tooLong || input.validity.tooShort) {
            input.style.border = "solid 2px #e54858";
            document.getElementById("errorQuantity").innerHTML = "Veuillez renseigner ce champ avec un nombre entre 0 et 100.";
        } else {
            input.style.border = "none";
            document.getElementById("errorQuantity").innerHTML = "";
        }

        return input.checkValidity();

    }

    // Vérification de la case CGU
    if(input.id == "checkbox1"){

        // Si la case n'est pas cochée alors affichage d'une erreur
        if (input.checked == false) {
            document.getElementById("errorCGU").innerHTML = "Les conditions d'utilisations doivent être acceptées pour valider le formulaire.";
        } else {
            document.getElementById("errorCGU").innerHTML = "";
        }

        return input.checkValidity();
        
    }

}