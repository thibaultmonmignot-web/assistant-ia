let modele = null;
let actif = false;

// Charger le modèle IA
async function chargerVision() {

    document.getElementById("resultat").innerHTML =
    "🧠 Chargement de la vision...";

    modele = await cocoSsd.load();

    document.getElementById("resultat").innerHTML =
    "✅ Vision prête.";

}

// Démarrer / arrêter analyse continue
function toggleVision() {

    actif = !actif;

    if (actif) {
        analyserContinu();
        document.getElementById("resultat").innerHTML =
        "👁️ Vision continue activée";
    } else {
        document.getElementById("resultat").innerHTML =
        "⛔ Vision arrêtée";
    }

}

// Boucle de vision
async function analyserContinu() {

    if (!actif) return;

    if (!modele) {
        document.getElementById("resultat").innerHTML =
        "❌ Vision non chargée";
        return;
    }

    const predictions = await modele.detect(video);

    if (predictions.length > 0) {

        let objet = predictions[0].class;

        document.getElementById("resultat").innerHTML =
        "🤖 Je vois : " + objet;

        parler("Je vois " + objet);

    }

    setTimeout(analyserContinu, 1000);

}
