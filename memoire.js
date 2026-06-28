// =========================
// Mémoire de Toban AI
// =========================

function enregistrer(cle, valeur){

    localStorage.setItem(cle, valeur);

}

function lire(cle){

    return localStorage.getItem(cle);

}

function oublier(cle){

    localStorage.removeItem(cle);

}
