/*-----------------FUNCTIONS---------------------------------------------------------------------*/
function downloadQRCode() {
    const canvas = document.querySelector("#qrcode > img");
    let u = canvas.src;

    fetch(u)
        .then((response) => response.blob())
        .then((blob) => {
            let a = document.createElement("a");
            let url = URL.createObjectURL(blob);
            a.href = url;
            a.download = "QRCode.png";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error("Error downloading QR code:", error));
}

/*-----------------DOM---------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
});

/*-----------------DEFINITIONS-------------------------------------------------------------------*/
const home = document.getElementById("home");
const url = document.getElementById("url");
const size = document.getElementById("size");
const btn = document.getElementById("generate");
const out = document.getElementById("qrcode");
const dl = document.getElementById("download");

/*-----------------EVENTS------------------------------------------------------------------------*/
home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
});

btn.addEventListener("click", (event) => {
    event.preventDefault();

    const u = url.value;
    const s = size.value;

    out.innerHTML = "";

    qrcode = new QRCode(document.getElementById("qrcode"), {
        text: u,
        width: s,
        height: s,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H,
    });
});

dl.addEventListener("click", (event) => { 
    event.preventDefault();
    downloadQRCode();
});