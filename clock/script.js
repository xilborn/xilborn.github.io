document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
    date.innerHTML = `<b>Date</b> : ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
    time.innerHTML = `<b>Hour</b> : ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    utc.innerText = `UTC : ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}`
});

const time = document.getElementById("time");
const date = document.getElementById("date");
const home = document.getElementById("home");
const utc = document.getElementById("UTC");

const sw_out = document.getElementById("sw_out");
const sw_reset = document.getElementById("reset");
const start_stop = document.getElementById("start-stop");

const t_time = document.getElementById("t_time");
const t_out = document.getElementById("t_out");
const t_reset = document.getElementById("t_reset");
const t_ss = document.getElementById("t_start-stop");

setInterval(() => {
    time.innerHTML = `<b>Hour</b> : ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    utc.innerText = `UTC : ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}`;
}, 1000);

home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
});

start_stop.addEventListener("click", (event) => {
    event.preventDefault();
    if (start_stop.innerText == "Start") {
        start_stop.innerText = "Stop";
        sw_out.innerText = "0:0:0";
        // on créer un chronometre
        let h = 0, m = 0, s = 0;
        interval = setInterval(() => {
            s += 1;
            if (s == 60) {
                s = 0;
                m += 1;
            }
            if (m == 60) {
                m = 0;
                h += 1;
            }
            sw_out.innerText = `${h}:${m}:${s}`;
        }, 1000);
    } else {
        start_stop.innerText = "Start";
        clearInterval(interval);
    }
})

function getTime() {
    // Récupérer la valeur de l'input
    var timeInput = t_time.value;

    // Valider le format de la valeur
    var timeRegex = /^(\d{1,2})\s*:\s*(\d{1,2})\s*:\s*(\d{1,2})$/;
    var match = timeInput.match(timeRegex);

    if (match) {
        var hours = parseInt(match[1]);
        var minutes = parseInt(match[2]);
        var seconds = parseInt(match[3]);

        // Faire quelque chose avec les valeurs du temps
        return data = [hours, minutes, seconds];
    }
}

t_ss.addEventListener("click", (event) => {
    event.preventDefault();
    let data = getTime();
    t_out.innerText = `${data[0]}:${data[1]}:${data[2]}`;
    t_time.value = '';

    if (t_ss.innerText == "Start") {
        t_ss.innerText = "Stop";
        // on créer un chronometre
        let h = data[0], m = data[1], s = data[2];
        interval = setInterval(() => {
                s -= 1;
            if (s == 0 || s == -1) {
                s = 0;
                m -= 1;
            }
            if (m == 0) {
                m = 0;
                h -= 1;
            }
            t_out.innerText = `${h}:${m}:${s}`;
            if (t_out.innerText == "0:0:0") {
                clearInterval(interval);
                // Vérifier si le navigateur prend en charge les notifications
                if ("Notification" in window) {
                    // Demander la permission de montrer des notifications
                    Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        // Créer et afficher une notification
                        var notification = new Notification(
                        "Xilborn Clock > Timer",
                        {
                            body: "Timer is over !",
                        }
                        );
                    }
                    });
                }
            }
        }, 1000);
    } else {
        t_ss.innerText = "Start";
        t_out.innerText = "0:0:0";
        clearInterval(interval);
    }
})

t_reset.addEventListener("click", (event) => {
    event.preventDefault();
    t_out.innerText = "0:0:0";
    t_time.value = '';
    t_ss.innerText = "Start";
    clearInterval(interval);
})

sw_reset.addEventListener("click", (event) => {
    event.preventDefault();
    sw_out.innerText = "0:0:0";
    clearInterval(interval);
})