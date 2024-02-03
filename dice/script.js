/*-----------------FUNCTIONS---------------------------------------------------------------------------------------------------*/
function RNG(a, b) {
    let price = Math.floor(Math.random() * (b - a) + a);

    while (price < a || price > b || price == 0) {
        price = Math.floor(Math.random() * (b - a) + a);
    }

    return price;
}

/*-----------------DOM---------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
});

/*-----------------DEFINITIONS-------------------------------------------------------------------------------------------------*/
const home = document.getElementById("home");
const number = document.getElementById("nb");
const max = document.getElementById("nbmax");
const btn = document.getElementById("btn");
const result = document.getElementById("result");

/*-----------------EVENTS------------------------------------------------------------------------------------------------------*/
home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
});

btn.addEventListener("click", (event) => {
    event.preventDefault();

    let man = number.value;
    let maxi = max.value;
    let resultat = "";

    for (let i = 0; i < man; i++) {
        resultat += `<li>Dice ${i + 1} : ${RNG(1, maxi)}</li>`	;
    }

    result.innerHTML = resultat;
});