document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
    list.innerHTML = localStorage.getItem('rlist') || list.innerHTML;
})

const home = document.getElementById("home");
const name = document.getElementById("rappel");
const when = document.getElementById("date");
const list = document.getElementById("list");
const add = document.getElementById("btn");
const clear = document.getElementById("clear");

home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
})

function GetSeconds(str) {
    let dateString = str;
    let dateParts = dateString.split(" ");
    let date = dateParts[0];
    let time = dateParts[1];

    let year = parseInt(date.substring(0, 4));
    let month = parseInt(date.substring(5, 7));
    let day = parseInt(date.substring(8, 10));

    let hour = parseInt(time.substring(0, 2));
    let minute = parseInt(time.substring(3, 5));
    let second = 0;

    let dateObj = new Date(year, month - 1, day, hour, minute, second);
    let seconds = dateObj.getTime() / 1000;

    return seconds;
}
function notif(str) {
    if ("Notification" in window) {
        // Demander la permission de montrer des notifications
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
            // Créer et afficher une notification
            var notification = new Notification("Xilborn Rappel", {
                body: "Your rappel :\r\n" + str,
            });
            }
        });
    }
}

setInterval(() => {
    let l = localStorage.getItem("rlist");
    let alles = [];
    l = l.replace(/<li>/g, "");
    l = l.replace("All rappel : ", "");
    alles = l.split("</li>");

    for (let p = 0; p < alles.length - 1; p++) {
        let second = parseInt(GetSeconds(alles[p].split(" : ")[0]));
        let currentSecond = Math.floor(new Date().getTime() / 1000);

        if (second === currentSecond) {
            notif(alles[p].split(" : ")[1]);
        }
    }
}, 10);

add.addEventListener("click", (event) => {
    event.preventDefault();
    let at = '';
    at += when.value.split('T')[0]
    at += " " + when.value.split("T")[1];
    list.innerHTML += `<li>${at} : ${name.value}</li>`;
    localStorage.setItem("rlist", list.innerHTML);
})

clear.addEventListener("click", (event) => {
    event.preventDefault();
    list.innerHTML = "All rappel : ";
    localStorage.setItem("rlist", list.innerHTML);
})