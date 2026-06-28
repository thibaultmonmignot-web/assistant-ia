// =========================
// Vision de Toban AI
// =========================

let modele = null;

async function chargerVision() {

    document.getElementById("resultat").innerHTML =
    "🧠 Chargement de la vision...";

    modele = await cocoSsd.load();

    document.getElementById("resultat").innerHTML =
    "✅ Vision prête.";

}

async function analyserImage() {

    if (!modele) {

        document.getElementById("resultat").innerHTML =
        "❌ Vision non chargée.";

        return;

    }

    const predictions = await modele.detect(video);

    if(predictions.length===0){

        document.getElementById("resultat").innerHTML =
        "🤖 Je ne reconnais aucun objet.";

        return;

    }

    let texte="🤖 Je vois :<br><br>";

    predictions.forEach(objet=>{

        texte+=objet.class+"<br>";

    });

    document.getElementById("resultat").innerHTML=texte;
  
}
