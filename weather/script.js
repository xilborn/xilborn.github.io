document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?q=london&appid=8732003d0f1c5dcc7ff3647968ad3713`
        )
        .then((response) => {
            if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            document.getElementById("info").innerHTML = '';
            info.innerHTML = `<b>${error}</b>`;
        });
})

const home = document.getElementById("home");
const btn = document.getElementById("btn");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const wind = document.getElementById("wind");
const uv = document.getElementById("uv");
const info = document.getElementById("error");

function GetWeather(city) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Remplacez 'YOUR_API_KEY' par votre clé d'API
        var apiKey = "8732003d0f1c5dcc7ff3647968ad3713";
        var where = city || `${latitude},${longitude}`;
        var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?q=${where}&appid=${apiKey}`;

        // Appel à l'API OpenWeatherMap pour obtenir les informations météorologiques
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                return data
            });
    });
}

home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
})

btn.addEventListener("click", (event) => {
    event.preventDefault();

    let c = city.value;
    let data = GetWeather(c);

    console.log(data);
})