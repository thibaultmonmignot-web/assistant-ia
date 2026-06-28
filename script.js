const video = document.getElementById("video");
const canvas = document.getElementById("photo");
const ctx = canvas.getContext("2d");

async function ouvrirCamera() {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: false
        });

        video.srcObject = stream;

        document.getElementById("resultat").innerHTML =
        "📷 Caméra ouverte.";

    } catch (e) {

        document.getElementById("resultat").innerHTML =
        "❌ Impossible d'ouvrir la caméra.";

    }

}

function prendrePhoto() {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video,0,0);

    canvas.style.display="block";

    document.getElementById("resultat").innerHTML =
    "📸 Photo prise !";

}
function ecouter() {

    if (!("webkitSpeechRecognition" in window)) {

        document.getElementById("resultat").innerHTML =
        "❌ La reconnaissance vocale n'est pas disponible sur ce navigateur.";

        return;
    }

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    document.getElementById("resultat").innerHTML =
    "🎤 J'écoute...";

   recognition.onresult = function(event){

    const texte = event.results[0][0].transcript.toLowerCase();

    document.getElementById("resultat").innerHTML =
    "🗣️ Tu as dit : <b>" + texte + "</b>";

    if(texte.includes("ouvre la caméra")){

        ouvrirCamera();

    }

    else if(texte.includes("prends une photo")){

        prendrePhoto();

    }

    else if(texte.includes("bonjour")){

        document.getElementById("resultat").innerHTML =
        "🤖 Bonjour Thibault ! Heureux de te revoir.";

        parler("Bonjour Thibault ! Heureux de te revoir.");

    }
// ----- Mémoire du prénom -----

else if (texte.startsWith("mon prénom est ")) {

    const prenom = texte.replace("mon prénom est ", "");

    enregistrer("prenom", prenom);

    const reponse = "Très bien. Je retiens que votre prénom est " + prenom + ".";

    document.getElementById("resultat").innerHTML = "🤖 " + reponse;

    parler(reponse);

}

else if (texte.includes("quel est mon prénom")) {

    const prenom = lire("prenom");

    if (prenom) {

        const reponse = "Votre prénom est " + prenom + ".";

        document.getElementById("resultat").innerHTML = "🤖 " + reponse;

        parler(reponse);

    } else {

        const reponse = "Je ne connais pas encore votre prénom.";

        document.getElementById("resultat").innerHTML = "🤖 " + reponse;

        parler(reponse);

    }

}
}

    recognition.onerror = function() {

        document.getElementById("resultat").innerHTML =
        "❌ Je n'ai pas compris.";

    };

    recognition.start();

}
function parler(texte){

    const voix = new SpeechSynthesisUtterance(texte);

    voix.lang = "fr-FR";

    speechSynthesis.speak(voix);

}
