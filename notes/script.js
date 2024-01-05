document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
    util.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key != "couter" && key != "password" && key != "username" && key != "completed" && key != "active" ) {
            let li = document.createElement("li");
            li.innerHTML = localStorage.getItem(key).split("|")[1];
            noteList.appendChild(li);
            let checkbox = li.querySelector("input[type='checkbox']");
            let a = localStorage.getItem(key).split("|")[0];
            if (a == "1") {
                checkbox.checked = true;
                li.classList.add("checked");
            }

            li.addEventListener("click", (event) => {
                event.stopPropagation();
                li.classList.toggle("checked");
                let checkbox = li.querySelector(
                    "input[type='checkbox']"
                );
                if (event.target != checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                if (checkbox.checked) {
                    completed += 1;
                    localStorage.setItem("completed", completed);
                    active -= 1;
                    localStorage.setItem("active", active);
                    localStorage.setItem(key, `1|${li.innerHTML}`);
                } else {
                    completed -= 1;
                    localStorage.setItem("completed", completed);
                    active += 1;
                    localStorage.setItem("active", active);
                    localStorage.setItem(key, `0|${li.innerHTML}`);
                }
                util.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;
            });
            li.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                dele.classList.toggle("hidden");
                dele.style.top = li.offsetTop + "px";
                dele.style.left = event.clientX + "px";

                del.addEventListener('click', (event) => {
                    event.preventDefault();
                    li.remove();
                    localStorage.removeItem(key);
                    couter -= 1;
                    localStorage.setItem("couter", couter);
                    if (checkbox.checked) {
                        completed -= 1;
                        localStorage.setItem("completed", completed);
                    } else {
                        active -= 1;
                        localStorage.setItem("active", active);
                    }
                    util.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;
                    dele.classList.toggle("hidden");
                })
            });
        }
    }
});

let couter = parseInt(localStorage.getItem("couter")) || 0;
let active = parseInt(localStorage.getItem("active")) || 0;
let completed = parseInt(localStorage.getItem("completed")) || 0;

const btn = document.getElementById("btn");
const input = document.getElementById("note");
const form = document.getElementById("note-form");
const noteList = document.getElementById("notes");
const clear = document.getElementById("clear");
const util = document.getElementById("util");
const del = document.getElementById("deleter");
const dele = document.getElementById("delete_div");
const home = document.getElementById("home");

btn.addEventListener("click", (event) => {
    if (input.value) {
        couter += 1;
        event.preventDefault();
        event.stopPropagation();
        value = input.value;
        input.value = "";

        const li = document.createElement("li");
        let d = new Date();
        let date = d.toUTCString();
        li.innerHTML = `<input type="checkbox" class="check" /> ${value}<span class="date">${date}</span>`;
        noteList.appendChild(li);
        localStorage.setItem("couter", couter);
        localStorage.setItem(couter, "0|" + li.innerHTML);
        localStorage.setItem("active", active += 1);

        li.addEventListener("click", (event) => {
            event.stopPropagation();
            li.classList.toggle("checked");
            let checkbox = li.querySelector("input[type='checkbox']");
            if (event.target != (checkbox)) {
                checkbox.checked = !checkbox.checked;
            }
            if (checkbox.checked) {
                completed += 1;
                localStorage.setItem("completed", completed);
                active -= 1;
                localStorage.setItem("active", active);
                localStorage.setItem(couter, `1|${li.innerHTML}`);
            } else {
                completed -= 1;
                localStorage.setItem("completed", completed);
                active += 1;
                localStorage.setItem("active", active);
                localStorage.setItem(couter, `0|${li.innerHTML}`);
            }
            util.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;
        });
        li.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            dele.classList.toggle("hidden");
            dele.style.top = li.offsetTop + "px";
            dele.style.left = event.clientX + "px";

            del.addEventListener("click", (event) => {
                event.preventDefault();
                let checkbox = li.querySelector("input[type='checkbox']");
                li.remove();
                localStorage.removeItem(couter);
                couter -= 1;
                localStorage.setItem("couter", couter);
                if (checkbox.checked) {
                    completed -= 1;
                    localStorage.setItem("completed", completed);
                } else {
                    active -= 1;
                    localStorage.setItem("active", active);
                }
                util.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;
                dele.classList.toggle("hidden");
            });
        });
        util.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;
    }
});

input.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && input.value) {
        btn.click();
    }
});

clear.addEventListener("click", (event) => {
    event.preventDefault();
    noteList.innerHTML = "";

    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key != "couter") {
            localStorage.removeItem(key);
        }
    }
    localStorage.setItem("couter", 0);
    localStorage.setItem("active", 0);
    localStorage.setItem("completed", 0);
    couter = 0;
    completed = 0;
    active = 0;
    util.innerText = `Tasks : ${couter} | Completed : ${completed} | Active : ${active}`;
});

document.addEventListener("click", function (event) {
    const target = event.target;
    if (!del.contains(target) && !dele.contains(target)) {
    dele.classList.add("hidden");
    }
});

home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
})