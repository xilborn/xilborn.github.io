/*-------FUNCTIONS-----------------------------------------------------------*/
function liclick(event, li) {
    let checkbox = li.querySelector("input[type='checkbox']");

    li.classList.toggle("checked");
    li.classList.toggle("ischeck");

    if (event.target != checkbox) {
        checkbox.checked = !checkbox.checked;
    }

    if (checkbox.checked) {
        active -= 1;
        completed += 1;

        localStorage.setItem("active", active);
        localStorage.setItem("completed", completed);

        info.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;
    } else {
        completed -= 1;
        active += 1;

        localStorage.setItem("completed", completed);
        localStorage.setItem("active", active);

        info.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;
    }

    localStorage.setItem("nlist", noteList.innerHTML);
}
function lirclick(event, li) {
    event.stopPropagation();
    event.preventDefault();

    delete_div.classList.toggle("hidden");
    delete_div.style.top = li.offsetTop + "px";
    delete_div.style.left = event.clientX + "px";

    deleter.addEventListener("click", (event) => del(event, li));
}
function del(event, li) {
    event.preventDefault();

    noteList.removeChild(li);

    couter--;

    if (li.classList.contains("checked")) {
        completed--;
    } else {
        active--;
    }

    localStorage.setItem("couter", couter);
    localStorage.setItem("active", active);
    localStorage.setItem("completed", completed);
    localStorage.setItem("nlist", noteList.innerHTML);

    info.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;

    delete_div.classList.toggle("hidden");
}

/*-------DOM-----------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");

    noteList.innerHTML = localStorage.getItem("nlist") || "";

    for (let a = 0; a < noteList.children.length; a++) {
        if (noteList.children[a].classList.contains("ischeck")) {
        let li = noteList.children[a];

        let checkbox = li.querySelector("input[type='checkbox']");

        checkbox.checked = true;
        }
    }

    noteList.addEventListener("click", (event) => {
        const li = event.target.closest("li");
        if (li) {
            liclick(event, li);
        }
    });
    noteList.addEventListener("contextmenu", (event) => {
        const li = event.target.closest("li");
        if (li) {
            lirclick(event, li);
        }
    })

    info.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;
});

/*-------DEFINITIONS---------------------------------------------------------*/
const home = document.getElementById("home");                   // DO
const noteList = document.getElementById("notes");              // DO
const info = document.getElementById("util");                   // DO
const clear = document.getElementById("clear");                 // DO
const note = document.getElementById("note");                   // DO
const btn = document.getElementById("btn");                     // DO
const deleter = document.getElementById("deleter");             
const delete_div = document.getElementById("delete_div");       

let couter = parseInt(localStorage.getItem("couter")) || 0;
let active = parseInt(localStorage.getItem("active")) || 0;
let completed = parseInt(localStorage.getItem("completed")) || 0;

/*-------EVENTS--------------------------------------------------------------*/
// If user submit a new notes, they are added to the list
btn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (note.value) {
        couter += 1;
        active += 1;

        let date = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        let li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" class="check" /> <span id="text"></span> <span class="date">${date}</span>`;
        li.querySelector('span#text').innerText = note.value;

        noteList.appendChild(li);
        info.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;

        localStorage.setItem("couter", couter);
        localStorage.setItem("active", active);
        localStorage.setItem("nlist", noteList.innerHTML);

        note.value = "";
    }
});
//  If user clicks on clear button, all tasks are cleared and all counters are set to 0
clear.addEventListener("click", (event) => {
    event.preventDefault();

    couter = 0;
    active = 0;
    completed = 0;

    localStorage.setItem("couter", couter);
    localStorage.setItem("active", active);
    localStorage.setItem("completed", completed);
    localStorage.setItem("nlist", "");

    info.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;

    noteList.innerHTML = "";
    note.value = "";
});
// If user clicks on home button they go back to index
home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
});
// If user unfocus "delete_div" (= the 'delete' button), the div is hidden
document.addEventListener("click", (event) => {
    if (!delete_div.contains(event.target) && !deleter.contains(event.target)) {
        delete_div.classList.add("hidden");
    }
})