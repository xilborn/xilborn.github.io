document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
})

const color_div = document.getElementById("color");
const home = document.getElementById("home");
const gen = document.getElementById("btn");
const nb = document.getElementById("hm");
const type = document.getElementById("type");
const clear = document.getElementById("clear");
const info = document.getElementById("infoo");

home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
})

gen.addEventListener("click", (event) => {
    event.preventDefault();
    color_div.innerHTML = "";
    for (let m = 0; m < nb.value; m++) {
        let li = document.createElement("li");
        if (type.value == 'hex') {
            let hex = "#";
            for (let i = 0; i < 6; i++) {
                hex += Math.floor(Math.random() * 16).toString(16);
            }
            li.innerText = hex;
            li.style.backgroundColor = hex;
        } else if (type.value == 'rgb') {
            let rgb = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            li.innerText = rgb;
            li.style.backgroundColor = rgb;
        } else if (type.value == 'hsl') {
            let hsl = `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 100)}%, ${Math.floor(Math.random() * 100)}%)`;
            li.innerText = hsl;
            li.style.backgroundColor = hsl;
        } else if (type.value == 'rgba') {
            let rgba = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            li.innerText = rgba;
            li.style.backgroundColor = rgba;

            
        } else if (type.value == 'hwb') {
            let hwb = `hwb(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 100)}%, ${Math.floor(Math.random() * 100)}%)`;
            li.innerText = hwb;
            li.style.backgroundColor = hwb;
        } else if (type.value == 'cmyk') {
            let cmyk = `cmyk(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`;
            li.innerText = cmyk;
            li.style.backgroundColor = cmyk;
        }

        li.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            navigator.clipboard.writeText(li.innerText);

            info.style.position = "absolute";
            info.classList.toggle("hidden");
            info.innerText = `Copied ${li.innerText} to clipboard`;

            
            // après 2s on remet la classe hidden
            setTimeout(() => {
                info.classList.toggle("hidden");
            }, 2000);
        })

        color_div.appendChild(li);
    }
})

clear.addEventListener("click", (event) => {
    event.preventDefault();
    color_div.innerHTML = "";
})