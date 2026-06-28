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
