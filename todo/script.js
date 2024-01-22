/*-----------------FUNCTIONS---------------------------------------------------------------------*/
function getTodos() {
    fetch("/todo.md").then((response) => {
        let text = response.text().then((text) => {
            let all = text.split("## TODO LIST :");

            let todos = all[1].split(/(\r\n|\n|\r)/gm);

            for (let t in todos) {
                let li = document.createElement("li");

                // si t est vide ou juste un saut de ligne on ne fait rien
                if (todos[t] == "" || todos[t] == "\n" || todos[t] == "\r" || todos[t] == "\r\n") {
                } else {
                    if (todos[t].includes("[x]")) {
                        let texte = todos[t].replace("- [x]", "");
                        li.innerHTML = `<input type='checkbox' class='chek' disabled checked /><label for='chek'></label> <span id='text'>${texte.split("Finished")[0]}</span>  <span class='date'>Finished${texte.split("Finished")[1]}</span>`;
                        todo.appendChild(li);
                    } else {
                        let texte = todos[t].replace("- [ ]", "");
                        li.innerHTML = `<input type='checkbox' class='chek' disabled /><label for='chek'></label> <span id='text'>${texte}</span>`;
                        todo.appendChild(li);
                    }
                }
            }
        });
    });
}
function getTofixs() {
    fetch("/todo.md").then((response) => {
        let text = response.text().then((text) => {
            let all = text.split("## TODO LIST :");

            let todos = all[0].split(/(\r\n|\n|\r)/gm);

            for (let t in todos) {
            let li = document.createElement("li");

            // si t est vide ou juste un saut de ligne on ne fait rien
            if (
                todos[t] == "" ||
                todos[t] == "\n" ||
                todos[t] == "\r" ||
                todos[t] == "\r\n" ||
                todos[t] == "# TO FIX :"
            ) {} else {
                if (todos[t].includes("[x]")) {
                    let texte = todos[t].replace("- [x]", "");
                    li.innerHTML = `<input type='checkbox' class='chek' disabled checked /><label for='chek'></label> <span id='text'>${texte.split("Finished")[0]}</span>  <span class='date'>Finished${texte.split("Finished")[1]}</span>`;
                    tofix.appendChild(li);
                } else {
                    let texte = todos[t].replace("- [ ]", "");
                    li.innerHTML = `<input type='checkbox' class='chek' disabled /><label for='chek'></label> <span id='text'>${texte}</span>`;
                    tofix.appendChild(li);
                }
            }
            }
        });
    });
}

/*-----------------DOM---------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded!");

    getTodos();
    getTofixs();
});

/*-----------------DEFINITIONS-------------------------------------------------------------------*/
const home = document.getElementById("home");
const tofix = document.getElementById("tofix");
const todo = document.getElementById("todo");

/*-----------------EVENTS------------------------------------------------------------------------*/
home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
});