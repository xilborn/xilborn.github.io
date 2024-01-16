/*-----------------FUNCTIONS---------------------------------------------------------------------*/
function playVideo() {
  video.play();
}

function pauseVideo() {
  video.pause();
}

function seekForward() {
  video.currentTime += 10; // Avance de 10 secondes
}

function seekBackward() {
  video.currentTime -= 10; // Recule de 10 secondes
}

function loadVideo() {
    const file = videoInput.files[0];
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;
}

/*-----------------DOM---------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded !");
});

/*-----------------DEFINITIONS-------------------------------------------------------------------*/
const video = document.getElementById("vid");
const home = document.getElementById("home");
const videoInput = document.getElementById("videoInput");

/*-----------------EVENTS------------------------------------------------------------------------*/
home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = '/';
})