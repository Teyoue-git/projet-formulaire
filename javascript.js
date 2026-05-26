function changetaille(taille) {
    document.body.style.fontSize = taille;
    document.querySelectorAll('body, body *').forEach(el => {
        el.style.fontSize = taille;
    });
}

function changecouleur(couleur) {
    document.body.style.color = couleur;
    document.querySelectorAll('p, h1, h2, h3, li, label, .form-group').forEach(el => {
        el.style.color = couleur;
    });
}

function changestyle(police) {
    document.body.style.fontFamily = police;
    document.querySelectorAll('body, body *').forEach(el => {
        el.style.fontFamily = police;
    });
}

let tailleActuelle = 16;

function changerTaille(delta) {
    tailleActuelle = Math.min(28, Math.max(10, tailleActuelle + delta));
    document.querySelectorAll('.taille-val').forEach(el => el.textContent = tailleActuelle + ' px');
    changetaille(tailleActuelle + 'px');
}

function setDot(el, couleur) {
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    el.classList.add('active');
    changecouleur(couleur);
}

let epreuvesFoot = {
    "U17":     ["Tournoi U17", "Match amical U17"],
    "U20":     ["Coupe du Monde U20", "Match amical Senior", "Coupe continentale"],
    "Senior":  ["Match amical Senior", "Coupe continentale"],
    "Vétéran": ["Tournoi Vétéran", "Match de gala"]
};

let epreuvesNat = {
    "Junior (-18)":   ["50m nage libre", "100m dos", "200m 4 nages"],
    "Senior (18-35)": ["100m papillon", "200m brasse", "Relais 4x100m", "400m 4 nages"],
    "Master (+35)":   ["50m dos", "400m nage libre", "100m brasse"]
};

let sportActif = "";

function trierMenuJour(form, list, mois) {
    let selectJour = document.getElementById(list);
    if (!selectJour) return;
    let annee = parseInt(document.getElementById('annee-naissance').value);
    if (isNaN(annee)) annee = new Date().getFullYear();
    selectJour.innerHTML = '<option value="">--Sélectionnez un jour--</option>';
    if (!mois) return;
    let nbJours;
    if (mois === "Février") {
        nbJours = new Date(annee, 2, 0).getDate();
    } else if (["Avril","Juin","Septembre","Novembre"].includes(mois)) {
        nbJours = 30;
    } else {
        nbJours = 31;
    }
    for (let i = 1; i <= nbJours; i++) {
        selectJour.innerHTML += '<option value="' + i + '">' + i + '</option>';
    }
}

function trierMenuCate(form, list, anneeNaissance) {
    let selectCate = document.getElementById(list);
    if (!selectCate) return;
    let sport = document.getElementById('sport').value;
    let annee = parseInt(anneeNaissance);
    if (!sport || isNaN(annee)) {
        selectCate.innerHTML = "<option value=''>--Sélectionnez d'abord un sport--</option>";
        document.getElementById('epreuve').innerHTML = "<option value=''>--Sélectionnez d'abord une catégorie--</option>";
        return;
    }
    let age = new Date().getFullYear() - annee;
    let cat = "";
    if (sport === 'football') {
        if (age < 18) cat = "U17";
        else if (age < 21) cat = "U20";
        else if (age < 40) cat = "Senior";
        else cat = "Vétéran";
        sportActif = 'football';
    } else if (sport === 'natation') {
        if (age < 18) cat = "Junior (-18)";
        else if (age <= 35) cat = "Senior (18-35)";
        else cat = "Master (+35)";
        sportActif = 'natation';
    }
    selectCate.innerHTML = '<option value="' + cat + '">' + cat + '</option>';
    trierMenuSport();
}

function trierMenuSport() {
    let cat = document.getElementById('categorie').value;
    let sel = document.getElementById('epreuve');
    if (!cat) {
        sel.innerHTML = "<option value=''>--Sélectionnez d'abord une catégorie--</option>";
        return;
    }
    sel.innerHTML = "<option value=''>--Sélectionnez une épreuve--</option>";
    let liste = sportActif === 'football' ? epreuvesFoot[cat] : epreuvesNat[cat];
    if (liste) liste.forEach(e => sel.innerHTML += '<option value="' + e + '">' + e + '</option>');
}

function ajout() {
    let listeEl = document.getElementById('footballList');
    if (!listeEl) return;
    let val = prompt("Entrez le nom de la nouvelle épreuve de football :");
    if (val && val.trim()) {
        let li = document.createElement('li');
        li.textContent = val.trim();
        listeEl.appendChild(li);
        alert("Épreuve de football ajoutée !");
    }
}

function ajouts() {
    let listeEl = document.getElementById('natationList');
    if (!listeEl) return;
    let val = prompt("Entrez le nom de la nouvelle épreuve de natation :");
    if (val && val.trim()) {
        let li = document.createElement('li');
        li.textContent = val.trim();
        listeEl.appendChild(li);
        alert("Épreuve de natation ajoutée !");
    }
}
function getxy() {
    let searchWord = document.getElementById('searchWord').value.toLowerCase();
    let searchResult = document.getElementById('searchResult');
        if (!searchWord.trim()) {
            searchResult.style.display = 'none';
            alert("Veuillez entrer un mot à rechercher !");
            return;
        }
        let bodyText = document.body.innerText.toLowerCase();
        let occurrences = 0;
        let pos = -1;
        let positions = [];
            
        while ((pos = bodyText.indexOf(searchWord, pos + 1)) !== -1) {
            occurrences++;
            positions.push(pos);
        }
            
        if (occurrences > 0) {
            searchResult.style.display = 'block';
            searchResult.innerHTML = ` Le mot "${searchWord}" a été trouvé ${occurrences} fois dans la page.<br>
                                          <small>Il apparaît à ${occurrences} endroit(s) différent(s).</small>`;
            searchResult.style.backgroundColor = '#d4edda';
        } else {
            searchResult.style.display = 'block';
            searchResult.innerHTML = ` Le mot "${searchWord}" n'a pas été trouvé dans la page.`;
            searchResult.style.backgroundColor = 'rgb(116, 126, 21)';
        }
}

function validateForm() {
    let nom      = document.getElementById('nom').value.trim();
    let prenom   = document.getElementById('prenom').value.trim();
    let annee    = parseInt(document.getElementById('annee-naissance').value);
    let mois     = document.getElementById('mois').value;
    let jour     = document.getElementById('jour').value;
    let sport    = document.getElementById('sport').value;
    let categorie= document.getElementById('categorie').value;
    let epreuve  = document.getElementById('epreuve').value;

    if (!nom)                          { alert("Veuillez entrer votre nom !");                    return false; }
    if (!prenom)                       { alert("Veuillez entrer votre prénom !");                 return false; }
    if (!annee || isNaN(annee))        { alert("Veuillez entrer une année valide !");             return false; }
    if (!mois)                         { alert("Veuillez sélectionner votre mois !");            return false; }
    if (!jour)                         { alert("Veuillez sélectionner votre jour !");            return false; }
    if (!sport)                        { alert("Veuillez sélectionner un sport !");              return false; }
    if (!categorie)                    { alert("Veuillez sélectionner une catégorie !");         return false; }
    if (!epreuve)                      { alert("Veuillez sélectionner une épreuve !");           return false; }

    let age = new Date().getFullYear() - annee;
    if (age < 12) { alert("Vous devez avoir au moins 12 ans !"); return false; }

    if (sport === 'football') {
        if (age < 18 && categorie !== "U17")           { alert("Moins de 18 ans → catégorie U17.");      return false; }
        if (age >= 18 && age < 21 && categorie !== "U20")  { alert("18-20 ans → catégorie U20.");        return false; }
        if (age >= 21 && age < 40 && categorie !== "Senior"){ alert("21-39 ans → catégorie Senior.");    return false; }
        if (age >= 40 && categorie !== "Vétéran")      { alert("40 ans et + → catégorie Vétéran.");      return false; }
    } else if (sport === 'natation') {
        if (age < 18 && categorie !== "Junior (-18)")       { alert("Moins de 18 ans → Junior (-18)."); return false; }
        if (age >= 18 && age <= 35 && categorie !== "Senior (18-35)") { alert("18-35 ans → Senior (18-35)."); return false; }
        if (age > 35 && categorie !== "Master (+35)")       { alert("Plus de 35 ans → Master (+35)."); return false; }
    }

    alert("INSCRIPTION VALIDÉE !\n\n" +
          "Nom : " + nom + " " + prenom + "\n" +
          "Date : " + jour + "/" + mois + "/" + annee + "\n" +
          "Âge : " + age + " ans\n" +
          "Sport : " + sport + "\n" +
          "Catégorie : " + categorie + "\n" +
          "Épreuve : " + epreuve + "\n\n" +
          "Merci pour votre inscription aux Championnats du Monde 2026 !");

    if (confirm("Réinitialiser le formulaire pour une nouvelle inscription ?")) {
        resetForm();
    }
    return false;
}

function resetForm() {
    const form = document.getElementById('sportForm');
    if (form) form.reset();
    document.getElementById('categorie').innerHTML = "<option value=''>--Sélectionnez d'abord un sport--</option>";
    document.getElementById('jour').innerHTML      = "<option value=''>--Sélectionnez d'abord un mois--</option>";
    document.getElementById('epreuve').innerHTML   = "<option value=''>--Sélectionnez d'abord une catégorie--</option>";
    alert("Formulaire réinitialisé !");
}

document.addEventListener('DOMContentLoaded', function () {
    const anneeInput = document.getElementById('annee-naissance');
    if (anneeInput) {
        anneeInput.addEventListener('change', function () {
            const moisSelect = document.getElementById('mois');
            if (moisSelect && moisSelect.value) trierMenuJour(null, 'jour', moisSelect.value);
            const sportSelect = document.getElementById('sport');
            if (sportSelect && sportSelect.value) trierMenuCate(null, 'categorie', anneeInput.value);
        });
    }
});