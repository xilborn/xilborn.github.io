document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded!');
})

const calc = document.getElementById('btn');        // DO
const result = document.getElementById('result');
const home = document.getElementById('home');       // DO
const imc = document.getElementById('imc');         // DO
const status = document.getElementById('status');

home.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = "/";
})

calc.addEventListener('click', (event) => {
    event.preventDefault();

    const h = document.getElementById("height").value;
    const w = document.getElementById("weight").value;

    console.log("Height : " + h + " Weight : " + w);

    if (h && w) {
        imc.innerText = `Your BMI : ${w / (h * h)}`;
        status.innerText = `Status : ${w / (h * h) < 18.5 ? "Underweight" : w / (h * h) < 24.9 ? "Normal" : w / (h * h) < 29.9 ? "Overweight" : "Obese"}`
    } else {
        imc.innerText = "Please enter values";
    }
})