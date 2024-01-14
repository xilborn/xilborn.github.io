/*-----------------FUNCTIONS---------------------------------------------------------------------*/

/*-----------------DOM---------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
});

/*-----------------DEFINITIONS-------------------------------------------------------------------*/
const home = document.getElementById("home");
const report = document.getElementById("report");
const list = document.getElementById("messages");
const text = document.getElementById("input");
const send = document.getElementById("send");

/*-----------------EVENTS------------------------------------------------------------------------*/
home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
});

report.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "https://github.com/Xilborn/xilborn.github.io/issues/new";
});

send.addEventListener("click", (event) => {
    event.preventDefault();

    
})