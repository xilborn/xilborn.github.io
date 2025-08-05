document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
})

const output = document.getElementById("text");
const btn = document.getElementById("btn");
const home = document.getElementById("home");
const length = document.getElementById("length");
const nb = document.getElementById("nb");

home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
})

btn.addEventListener("click", (event) => {
    event.preventDefault();
    let p = '';
    for (let i = 0; i < nb.value; i++) {
        p += generatePseudo(length.value) + '\r';
    }
    output.innerText = p;

})

function generatePseudo(length) {
    var vowels = ["a", "e", "i", "o", "u"];
    var consonants = [
        "b",
        "c",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "m",
        "n",
        "p",
        "q",
        "r",
        "s",
        "t",
        "v",
        "w",
        "x",
        "y",
        "z",
    ];
    var pseudo = "";
    var useVowel = Math.random() < 0.5;

    while (pseudo.length < length) {
        var randomArray = useVowel ? vowels : consonants;
        var randomIndex = Math.floor(Math.random() * randomArray.length);
        pseudo += randomArray[randomIndex];
        useVowel = !useVowel;
    }

    return pseudo;
}

