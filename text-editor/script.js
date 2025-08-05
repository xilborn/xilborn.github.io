document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded!");
    document.getElementById("char").innerText = `Char ${data["char"]}, Word ${data["word"]}`;
});

const home = document.getElementById("home");
const lines = document.getElementById("lines");
const edit = document.getElementById("editor");
const files = document.getElementById("file");
const edi = document.getElementById("edit");

const dafuck = document.getElementById("dafuck");
const label = document.getElementById("file-label");
const fileinput = document.getElementById("file-input");
const input = document.getElementById("s-input");
var ko = 0;

var data = {
    nbline: 1,
    char: 0,
    word: 0,
}

home.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = "/";
});

edit.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        let p = document.createElement("p");
        data["nbline"]++;
        p.innerText = data["nbline"];
        lines.appendChild(p);
    } else if (event.keyCode === 8) {
        if (!lines.lastElementChild.classList.contains("nodel") && edit.innerText[edit.innerText.length - 1] === "\n") {
            lines.removeChild(lines.lastElementChild);
            data["nbline"]--;
        } else {
            data["char"] = edit.innerText.replace(/(\r\n|\n|\r)/gm, "").length + 1;
        }
    } else {
        data["char"] = edit.innerText.replace(/(\r\n|\n|\r)/gm, "").length + 1;
    }

    data["word"] = edit.innerText.split(" ").length;
    document.getElementById("char").innerText = `Char ${data["char"]}, Word ${data["word"]}`;
});

edit.addEventListener("input", handleInput);
edit.addEventListener("mouseup", handleInput);

function handleInput() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    const { startContainer, startOffset } = range;

    const line = getLine(startContainer, startOffset);
    const column = getColumn(startContainer, startOffset);

    document.getElementById("pos").innerText = `Line ${line}, Column ${column}`;
}
function getLine(container, offset) {
    let line = 1;
    let currentNode = container.parentNode;

    while (currentNode && currentNode !== document.body) {
        if (currentNode.nodeName === "DIV") {
        line++;
        }
        currentNode = currentNode.parentNode;
    }

    return line - 1;
}
function getColumn(container, offset) {
    const text = container.textContent || container.innerText;
    const lines = text.substr(0, offset).split("\n");

    const lastLine = lines[lines.length - 1];

    return lastLine.length;
}

fileinput.addEventListener("change", (event) => {
    if (dafuck.id === 6978) {
        let f = event.target.files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
            edit.innerText = e.target.result;
            let lineCount = e.target.result.split("\n").length;

            document.getElementById("lines").innerText = "";
            for (let i = 1; i <= lineCount; i++) {
                console.log(i);
                let p = document.createElement("p");
                p.innerText = i;
                document.getElementById("lines").appendChild(p);
            }

            window.document.title = `${f.name} - ${f.type.split("/")[1]} | ${f.size} octets`;
        };

        reader.readAsText(f);

        
        dafuck.classList.toggle("hidden");
        dafuck.classList.toggle("file");
    }
});

fileinput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13 && ko == 1) {
        var content = edit.innerText;
        var fileName = fileinput.value || "untitled.txt";

        var file = new File([content], fileName, {type: "text/plain;charset=utf-8",});
        saveAs(file);

        dafuck.classList.toggle("hidden");
        dafuck.classList.toggle("file");
        label.innerText = "Enter a file : ";
    } else if (event.keyCode === 13 && ko == 2) {
        let tofind = fileinput.value;

        edit.innerHTML = edit.innerHTML.replace(tofind, "<mark>" + tofind + "</mark>");

        setTimeout(() => {
            edit.innerHTML = edit.innerHTML.replace("<mark>" + tofind + "</mark>", tofind);
        }, 2000);

        dafuck.classList.toggle("hidden");
        dafuck.classList.toggle("file");
    } else if (event.keyCode === 13 && ko == 3) {
        let tofind = fileinput.value;
        let toreplace = input.value;

        edit.innerText = edit.innerText.replace(tofind, toreplace);
        dafuck.classList.toggle("hidden");
        dafuck.classList.toggle("search");
    }
}); input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13 && ko == 3) {
        let tofind = fileinput.value;
        let toreplace = input.value;

        edit.innerText = edit.innerText.replace(tofind, toreplace);
        dafuck.classList.toggle("hidden");
        dafuck.classList.toggle("search");
        document.getElementById("korin").classList.toggle("hidden");
    }
})

files.addEventListener("change", (event) => {
    if (files.value == 'open') {
        // on importe un fichier depuis le navigateur et on l'affiche
        dafuck.classList.toggle("hidden");
        dafuck.classList.toggle("file");
        dafuck.id = 6978;
    } else if (files.value == 'new') {
        edit.innerText = "";
        lines.innerHTML = "<p>1</p>";
        window.document.title = "New File | 0 octets";
    } else if (files.value == 'save') {
        console.log("Save");
        var content = edit.innerText;
        var fileName = window.name.split(" - ")[0] || "untitled.txt";

        var file = new File([content], fileName, {type: "text/plain;charset=utf-8",});
        saveAs(file);
    } else if (files.value == 'saveas') {
        dafuck.classList.toggle("hidden");
        dafuck.classList.toggle("file");
        dafuck.id = 4515;
        label.innerText = "Save as : ";
        fileinput.type = "text";
        ko = 1;
    }
    files.value = "edf";
});

edit.addEventListener('focusin', (event) => {
    if (edit.innerText === "Enter your text here") {
        edit.innerText = "";
    }
}); edit.addEventListener('focusout', (event) => {
    if (edit.innerText === "") {
        edit.innerText = "Enter your text here";
    }
})


edi.addEventListener("change", (event) => {
    if (edi.value == "undo") {
        // on enleve la derniere action
        edit.innerText = edit.innerText.substring(0, edit.innerText.length - 1);
    } else if (edi.value == "redo") {
        // on refait la derniere action
        edit.innerText += edit.innerText.charAt(edit.innerText.length - 1);
    } else if (edi.value == "cut") {
        // on enleve la selection
        navigator.clipboard.writeText(window.getSelection().toString());
        edit.innerText = edit.innerText.replace(window.getSelection().toString(), "");
    } else if (edi.value == "copy") {
        navigator.clipboard.writeText(window.getSelection().toString());
    } else if (edi.value == "paste") {
        navigator.clipboard.readText().then(con => {
            edit.innerText += con
        });
    } else if (edi.value == "selectall") {
        window.getSelection().selectAllChildren(edit);
    } else if (edi.value == "delete") {
        edit.innerText = edit.innerText.replace(window.getSelection().toString(), "");
    } else if (edi.value == "find") {
        dafuck.classList.toggle("hidden");
        dafuck.classList.toggle("file");
        label.innerText = "Find : ";
        fileinput.type = "text";
        ko = 2;
    } else if (edi.value == "replace") {
        dafuck.classList.toggle("hidden");
        dafuck.classList.toggle("search");

        document.getElementById("korin").classList.toggle("hidden");

        label.innerText = "Find : ";
        fileinput.type = "text";
        ko = 3;
    }
    edi.value = "edf";
});