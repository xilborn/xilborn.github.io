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
const score = document.getElementById("score");
const min = document.getElementById("min");
const max = document.getElementById("max");
const attempt = document.getElementById("att");
const choice = document.getElementById("price");
const submit = document.getElementById("btn");
const res = document.getElementById("res");
const home = document.getElementById("home");

const minimum = document.getElementById("minimum");
const maximum = document.getElementById("maximum");
const start = document.getElementById("start");

let sc = 100;
let att = 0;
let tofind = 0;

/*-----------------EVENTS------------------------------------------------------------------------------------------------------*/
home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
});

start.addEventListener("click", (event) => {
    event.preventDefault();

    let minn = parseInt(minimum.value);
    let maxx = parseInt(maximum.value);
    tofind = RNG(minn, maxx);

    if (minn > maxx) {
        alert("Minimum price cannot be greater than maximum price");
        return;
    }

    min.innerText = `Minimum price : ${minn}`;
    max.innerText = `Maximum price : ${maxx}`;

    document.getElementById("setup").classList.toggle("hide");
    document.getElementById("finder").classList.toggle("hide");
});

submit.addEventListener("click", (event) => {
    let c = parseInt(choice.value);

    if (c == tofind) {
        res.innerHTML = "<p>Correct !</p><p>Final score : " + sc + "</p>";

        document.getElementById("setup").classList.toggle("hide");
        document.getElementById("finder").classList.toggle("hide");

        att++;
        attempt.innerText = `Attempts : ${att}`;
    } else if (c > tofind) {
        res.innerText = "Too high !";
        sc--;
        att++;
        score.innerText = `Score : ${sc}`;
        attempt.innerText = `Attempts : ${att}`;
    } else if (c < tofind) {
        res.innerText = "Too low !";
        sc--;
        att++;
        score.innerText = `Score : ${sc}`;
        attempt.innerText = `Attempts : ${att}`;
    }
    if (sc == 0) {
        res.innerHTML = "<p>Game over !</p><p>Number : " + tofind + "</p>";

        document.getElementById("setup").classList.toggle("hide");
        document.getElementById("finder").classList.toggle("hide");
    }
});

choice.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        submit.click();
    }
});