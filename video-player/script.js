/*-----------------FUNCTIONS---------------------------------------------------------------------*/
function playVideo() {
    video.play();
}

function fullScreen() {
	video.requestFullscreen();
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

	video.addEventListener("loadedmetadata", () => {
		progress.max = video.duration;
		progress.value = video.currentTime;
		progress.style.width = video.width + "px";
	});
}

function uh() {
	if (video.paused) {
		playVideo();
		btn.innerText = "Pause";
	} else {
		pauseVideo();
		btn.innerText = "Play";
	}
}

/*-----------------DOM---------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded !");
});

/*-----------------DEFINITIONS-------------------------------------------------------------------*/
const video = document.getElementById("vid");
const home = document.getElementById("home");
const videoInput = document.getElementById("videoInput");
const btn = document.getElementById("btn");
const progress = document.getElementById("progressBar");

/*-----------------EVENTS------------------------------------------------------------------------*/
home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = '/';
});

video.addEventListener("timeupdate", () => {
	progress.value = video.currentTime;
});