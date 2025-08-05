/*-----------------FUNCTIONS---------------------------------------------------------------------*/

/*-----------------DOM---------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");});

/*-----------------DEFINITIONS-------------------------------------------------------------------*/

const out_text = document.getElementById("result");
const copy = document.getElementById("copy");
const clear = document.getElementById("clear");
const download = document.getElementById("download");
const trans = document.getElementById("trans");
const some_text = document.getElementById("some_text");

const recognition = new webkitSpeechRecognition();
const audioContext = new AudioContext();

/*-----------------EVENTS-----------------------------------------------------------------------*/

download.addEventListener("click", () => {
    let text = out_text.value;
    const blob = new Blob([text], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

copy.addEventListener("click", () => {
    let text = out_text.value;
    navigator.clipboard.writeText(text);
});

clear.addEventListener("click", () => {
    out_text.value = "";
});

trans.addEventListener("click", () => {
    out_text.value = "";

    recognition.lang = navigator.language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    some_text.innerText = "Listening...";

    recognition.onresult = function(event) {
        some_text.innerText = "";
        const transcript = event.results[0][0].transcript;
        out_text.value = transcript;
    }
});