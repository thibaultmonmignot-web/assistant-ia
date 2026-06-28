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

    recognition.onresult = function(event) {

        const texte = event.results[0][0].transcript;

        document.getElementById("resultat").innerHTML =
        "🗣️ Tu as dit : <br><br><b>" + texte + "</b>";

    };

    recognition.onerror = function() {

        document.getElementById("resultat").innerHTML =
        "❌ Je n'ai pas compris.";

    };
    
    recognition.start();

}
