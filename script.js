const inputText = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI (word) {
    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none"
        infoTextEl.innerText = `Searching the meaning of "${word}"`

        const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(apiURL)
        .then((res)=> res.json())

        if(result.title){
            meaningContainerEl.style.display = "block"
            infoTextEl.style.display = "none";
            titleEl.innerText = word;
            meaningEl.innerText = result.title;
            audioEl.style.display = "none";
        }
        else{
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block"
            audioEl.style.display = "inline-flex"
            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;
        }
    } catch (error) {
        infoTextEl.innerText = `Error happend, try again later`
    }
}
inputText.addEventListener("keyup", (event) =>{
    if(event.target.value && event.key === "Enter"){
        fetchAPI(event.target.value)
    }
})