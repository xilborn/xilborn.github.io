document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
    min.checked = true;
    num.checked = true;
})

const btn = document.getElementById("btn");
const home = document.getElementById("home");
const maj = document.getElementById("maj");
const min = document.getElementById("min");
const num = document.getElementById("num");
const length = document.getElementById("length");
const sym = document.getElementById("sym");
const output = document.getElementById("password");
const copy = document.getElementById("copy");


const maj_list = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const min_list = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const num_list = ['0','1','2','3','4','5','6','7','8','9'];
const sym_list = ['!','@','#','$','%','^','&','*','(',')','_','+','-','/','?','<','>','|','{','}','[',']','`','~',';',':','.',',','\'','\"'];


home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
})

btn.addEventListener("click", (event) => {
    event.preventDefault();

    let m = maj.checked;
    let m2 = min.checked;
    let n = num.checked;
    let s = sym.checked;

    let len = length.value;

    if (len == null || len <= 0 || len == "") {
        output.innerText = "Please enter a valid length";
    }
    if (!n && !m && !m2 && !s) {
        output.innerText = "Please select at least one character type";
    }

    let list = [];
    if (n) {
        list.push(num_list);
    }
    if (m) {
        list.push(maj_list);
    }
    if (m2) {
        list.push(min_list);
    }
    if (s) {
        list.push(sym_list);
    }

    // on génère un mot de passe aleatoire
    let password = '';
    for (let i = 0;password.length < len; i++) {
        let random = Math.floor(Math.random() * list.length);
        password += list[random][Math.floor(Math.random() * list[random].length)];
    }
    output.innerHTML = `Generated password : <b>${password}</b>`;

})

copy.addEventListener("click", (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(output.innerText.split(":")[1].trim());
})