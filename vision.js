let modele = null;
let actif = false;

let dernierObjetDit = "";
let compteur = 0;
let enTrainDeParler = false;
// Charger le modèle IA
async function chargerVision() {

    document.getElementById("resultat").innerHTML =
    "🧠 Chargement de la vision...";

    modele = await cocoSsd.load();

    document.getElementById("resultat").innerHTML =
    "✅ Vision prête.";

}

// Activer / désactiver
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

// Analyse en boucle
async function analyserContinu() {
    
    if (speechSynthesis.speaking) {
        return;
    }
    if (!actif) return;

    if (!modele) return;

    const predictions = await modele.detect(video);

    if (predictions.length > 0) {

        let objets = predictions
    .slice(0, 3)
    .map(o => o.class);

let phrase = "Je vois " + objets.join(", ");

        document.getElementById("resultat").innerHTML =
        "🤖 Je vois : " + objet;

        // 🔥 LOGIQUE ANTI-RÉPÉTITION
        if (objet !== dernierObjetDit) {

            compteur = 0;
            dernierObjetDit = objet;

        }

        compteur++;

        // 👉 Il parle seulement si l’objet est stable
        if (compteur === 2) {

           parler(phrase);
        }

    }

    setTimeout(analyserContinu, 200);

}
