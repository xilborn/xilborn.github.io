// Récupérer les éléments du formulaire
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginResult = document.getElementById("login-result");
const home = document.getElementById("home");
const fluck = document.getElementById("fluck");

const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&%$#@!?<>§^°/*-+=,;.:_^~²";

function generatePassword() {
    let password = '';

    let length = Math.floor(Math.random() * 10) + 4;

    for (let i = 0; i < length; i++) {
        password += char.charAt(Math.floor(Math.random() * char.length));
    }

    return password;
}

const pwd = generatePassword();

fluck.textContent = "Password : " + pwd;

home.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "/";
})

// Écouter l'événement de soumission du formulaire
loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêcher la soumission par défaut du formulaire
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Vérifier les informations de connexion
    if (username === "admin" && password === pwd) {
        // Connexion réussie
        window.location.href = "/password-game/global";
    } else {
        // Erreur de connexion
        loginResult.textContent = "Identifiants incorrects";
        loginResult.style.color = "red";
    }
});

// Écouter l'événement de clic sur le bouton "Mot de passe oublié?"
const forgotPasswordButton = document.getElementById("forgot-password");
forgotPasswordButton.addEventListener("click", () => {
    alert("Mot de passe oublié ? Contactez l'administrateur.");
});

// Écouter l'événement de touche entrée dans les champs de saisie
usernameInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        passwordInput.focus();
    }
});

passwordInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        loginForm.dispatchEvent(new Event("submit"));
    }
});

