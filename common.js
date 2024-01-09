document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
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
        localStorage.setItem("rlist", localStorage.getItem("rlist").replace("<li>" + alles[p] + "</li>", ""));
        }
    }
}, 10);