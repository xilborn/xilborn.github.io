document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
    device_div.innerText = `Device : ${navigator.platform} \rBrowser : ${getBrowserName()}`;
    mouse_div.innerText = `Mouse position : ${window.screenX}, ${window.screenY}`
    Localisation();
    position_div.innerText = `Position of Window : ${window.screenX} x ${window.screenY}`;
    size_div.innerText = `Inner Size : ${window.innerWidth}px * ${window.innerHeight}px \rOuter Size : ${window.outerWidth}px * ${window.outerHeight}px`;
    lang_div.innerText = `Language : ${navigator.language}`;
    con_div.innerText = `Connexion type : ${navigator.connection.effectiveType}`;
    timezone_div.innerText = `Timezone : ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    theme_div.innerText = `Theme : ${window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"}`;
    pub_div.innerText = `Publicity : ${navigator.doNotTrack === "1" ? "No" : "Yes"}`;
});

const home = document.getElementById("home");                       // DO
const size_div = document.getElementById("size");                   // DO
const device_div = document.getElementById("device");               // DO
const position_div = document.getElementById("position");           // DO
const location_div = document.getElementById("location");           // DO
const mouse_div = document.getElementById("mouse");                 // DO
const lang_div = document.getElementById("langage");                // DO
const con_div = document.getElementById("con");                     // DO
const timezone_div = document.getElementById("timezone");           // DO
const theme_div = document.getElementById("theme");                 // DO
const pub_div = document.getElementById("pub");                     // DO

home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
});

function getBrowserName() {
    var userAgentData = navigator.userAgentData;

    if (userAgentData && userAgentData.brands) {
        var browser = userAgentData.brands.find(function (brand) {
        return (
            brand.brand === "Google Chrome" ||
            brand.brand === "Microsoft Edge" ||
            brand.brand === "Opera" ||
            brand.brand === "Firefox" ||
            brand.brand === "Safari"
        );
        });

        if (browser) {
        return browser.brand;
        }
    }

    return "Unknown";
}
function Localisation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            location_div.innerText = `Latitude : ${latitude} \rLongitude : ${longitude}`;
            },
            function (error) {
            console.log(
                "Erreur lors de la récupération de la localisation : " +
                error.message
            );
            location_div.innerText = "Erreur lors de la sélection de la localisation";
            }
        );
        } else {
        location_div.innerText = "Localisation non disponible pour ce navigateur";
    }
}

setInterval(() => {
    size_div.innerText = `Inner Size : ${window.innerWidth}px * ${window.innerHeight}px \rOuter Size : ${window.outerWidth}px * ${window.outerHeight}px`;
    position_div.innerText = `Position of Window : ${window.screenX} x ${window.screenY}`;
}, 1000);

document.addEventListener("mousemove", (event) => {
    mouse_div.innerText = `Mouse Position : x=${event.clientX}, y=${event.clientY}`;
})