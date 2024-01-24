/*-----------------FUNCTIONS---------------------------------------------------------------------*/
function detectURL(result) {
    if (result.startsWith("https://") || result.startsWith("http://")) {
        out.style.color = "blue";
        out.innerText = "Detected URL : " + result;
        window.open(result, "_blank");
    } else {
        out.style.color = "green";
        out.innerText = "Detected Text : " + result;
    }
}

/*-----------------DOM---------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded!");
});

/*-----------------DEFINITIONS-------------------------------------------------------------------*/
const home = document.getElementById("home");
const input = document.getElementById("file");
const scan = document.getElementById("scan");
const out = document.getElementById("result");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

const qrScanner = new QrScanner(
    video,
    result => detectURL(result),
);
let a = true

/*-----------------EVENTS------------------------------------------------------------------------*/
navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
        video.srcObject = stream;
        video.play();
        qrScanner.start();
        a = true
    })
    .catch(function (err) {
        out.innerText = "Error: " + err;
    });

video.addEventListener("click", () => { 
    if (a) {
        qrScanner.stop();
        a = false;
    } else {
        qrScanner.start();
        a = true;
    }
});

home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
});

scan.addEventListener("click", (event) => {
    event.preventDefault();

    var image = input.files[0];
    if (!image) {
        out.innerText = "No file selected.";
        return;
    }

    QrScanner.scanImage(image)
        .then((result) => detectURL(result))
        .catch((error) => out.style.color = "red", out.innerText = "No QR code detected.");
})