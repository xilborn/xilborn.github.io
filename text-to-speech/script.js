/*-------FUNCTIONS-------------------------------------------------------------------------------*/


/*-------DOM-------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
    old.innerHTML = tts || old.innerHTML;
    lang.innerText = navigator.language || "en-US";
});

/*-------DEFINITIONS-----------------------------------------------------------------------------*/
const home = document.getElementById("home");
const text = document.getElementById("text");
const speak = document.getElementById("btn");
const clear = document.getElementById("clear");
const old = document.getElementById("list");
const lang = document.getElementById("lang");

const tts = localStorage.getItem("tts_list");

/*-------EVENTS----------------------------------------------------------------------------------*/
home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
});

clear.addEventListener("click", (event) => {
    event.preventDefault();
    old.innerHTML = "<ul id='list'>All text already speaked : </ul>";
    localStorage.setItem("tts_list", old.innerHTML);
    text.innerHTML = "";
});

speak.addEventListener("click", (event) => {
    event.preventDefault();

    let speech = new SpeechSynthesisUtterance();

    speech.text = text.value;
    speech.lang = navigator.language || "en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);

    old.innerHTML += `<li>${text.value}</li>`;
    localStorage.setItem("tts_list", old.innerHTML);
    text.value = "";
});