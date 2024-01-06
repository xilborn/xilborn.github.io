document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded!');
})

const home = document.getElementById('home');               // DO
const from = document.getElementById('left-lang');          // DO
const to = document.getElementById('right-lang');           // DO
const input = document.getElementById('left-text');         // DO
const output = document.getElementById('right-text');       // DO
const paste = document.getElementById('paste');             // DO
const copy = document.getElementById('copy');               // DO
const translate = document.getElementById('translate');     // DO
const clear = document.getElementById('clear');             // DO

home.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = "/";
});

clear.addEventListener('click', (event) => {
    event.preventDefault();
    input.value = '';
    output.value = '';
    from.value = 'auto';
    to.value = 'en';
})

// Assume a function `translateText` to send a request to the Google Translate API
function translateText(text, sourceLang, targetLang, callback) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(text)}`;
    // refais l'url (nom: url2) mais avec DeepL API
    const url2 = `https://api-free.deepl.com/v2/translate?auth_key=4c8c8c4f-6f7a-7b6d-9a5c-7f6b5f6b5f6b&text=${encodeURI(text)}&target_lang=${targetLang}&source_lang=${sourceLang}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            callback(data);
        })
        .catch(error => console.error('Error with Google Translate API:', error));
}

// Usage in the event listener
translate.addEventListener('click', (event) => {
    event.preventDefault();
    const textToTranslate = input.value;
    const sourceLanguage = from.value;
    const targetLanguage = to.value;

    translateText(textToTranslate, sourceLanguage, targetLanguage, (translatedData) => {
        output.value = translatedData[0][0][0];
    });
});

input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        translate.click();
    }
})

paste.addEventListener('click', (event) => {
    event.preventDefault();
    input.value = input.value + navigator.clipboard.readText();
})

copy.addEventListener('click', (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(output.value);
})