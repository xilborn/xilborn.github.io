document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
});

const home = document.getElementById("home");
const typee = document.getElementById("random-type");
const min = document.getElementById("min");
const max = document.getElementById("max");
const generate = document.getElementById("generate");
const gen = document.getElementById("gen");
const output = document.getElementById("random-number");

home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
});

generate.addEventListener("click", (event) => {
    event.preventDefault();

    let minimum = min.value;
    let maximum = max.value;
    let type = typee.value;
    let number = [];

    if ((minimum == null || maximum == null || minimum == "" || maximum == "") && !(type == 'bin' || type == 'hex')) {
        output.innerHTML = "Please enter both minimum and maximum values";
    } else {
        if (minimum > maximum) {
            output.innerHTML = "Minimum cannot be greater than maximum";
        }
        if (gen.value == null || gen.value == "") {
            gen.value = 1;
        }
        if ((maximum == '' || maximum == null) && type == 'hex') {
            maximum = 1;
            max.value = 1;
        }

        // on génère un nombre aleatoire compris entre minimum et maximum
        if (type == 'int') {
            for (let g = 0; g < parseInt(gen.value); g += 1) {
                a = Math.floor(Math.random() * (maximum - minimum + 2) + minimum);
                while (a === 0) {
                    a = Math.floor(Math.random() * (maximum - minimum + 2) + minimum);
                }
                number.push(a);
            }
        } else if (type == 'float') {
            for (let g = 0; g < parseInt(gen.value); g += 1) {
                maximum = parseFloat(maximum);
                minimum = parseFloat(minimum);
                a = Math.random() * (maximum - minimum) + minimum;
                while (a === 0) {
                    a = Math.random() * (maximum - minimum) + minimum;
                }
                number.push(a);
            }
        } else if (type == 'bin') {
            for (let g = 0; g < parseInt(gen.value); g += 1) {
                let a = '';
                for (let i = 0; i < 8; i += 1) {
                    let nb = Math.random();

                    if (nb >= 0.5) {
                        a += '1';
                    } else {
                        a += '0';
                    }
                }
                number.push(a);
        }
        } else if (type == 'hex') {
            for (let g = 0; g < parseInt(gen.value); g += 1) {
                let a = '';

                // on génère un nombre aleatoire hexadecimal
                for (let i =0; i < max.value; i += 1) {
                    a += Math.floor(Math.random() * 16).toString(16);
                }
                number.push(a);
            }
        } else if (type == 'oct') {
            for (let g = 0; g < parseInt(gen.value); g += 1) {
                let a = "";

                // on génère un nombre aleatoire hexadecimal
                a += Math.floor(Math.random() * (maximum - minimum + 1) + minimum).toString(8);
                while (a > 7) {
                    a = Math.floor(Math.random() * (maximum - minimum + 1) + minimum).toString(8);
                }
                number.push(a);
            }
        }
    n_str = number.join(' ; ');
    output.innerHTML = `Number : <b>${n_str}</b>`
    }
});

typee.addEventListener("change", (event) => {
    if (typee.value == 'bin') {
        max.disabled = true;
        min.disabled = true;
    } else if (typee.value == 'hex') {
        min.disabled = true;
        max.placeholder = 'Enter length of a number (ex : 8 => 4a50bd87)';
    } else {
        max.disabled = false;
        min.disabled = false;
    }
})