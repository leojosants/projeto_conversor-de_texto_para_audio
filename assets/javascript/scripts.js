// Seleção de elementos
const domElements = {
    downloadTextButton: document.querySelector('[data-id="download-text-button"]'),
    voiceSelection: document.querySelector('[data-id="voice-selection"]'),
    listenButton: document.querySelector('[data-id="listen-button"]'),
    fileUplaod: document.querySelector('[data-id="file-upload"]'),
    clearField: document.querySelector('[data-id="clear-field"]'),
    textInput: document.querySelector('[data-id="text-input"]'),
};

// Iniciar a API de vozes
const speaks = new SpeechSynthesisUtterance();

let availableVoices = [];

// preencher o select
const updateValues = () => {
    availableVoices = window.speechSynthesis.getVoices();

    speaks.voice = availableVoices[0];

    availableVoices.forEach(
        (voice, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = voice.name;
            domElements.voiceSelection.appendChild(option);
        }
    );
};

const events = {
    change: 'change',
    click: 'click',
}

window.speechSynthesis.onvoiceschanged = updateValues;

// Executar o texto como voz
domElements.voiceSelection.addEventListener(events.change,
    () => {
        speaks.voice = availableVoices[domElements.voiceSelection.value];
    }
);

domElements.listenButton.addEventListener(events.click,
    () => {
        if (domElements.textInput.value.length === 0) {
            alert('Adicione um texto no campo "Digite alguma coisa..."');
            return;
        }
        speaks.text = domElements.textInput.value;
        window.speechSynthesis.speak(speaks);
    }
);

// baixar texto em arquivo
domElements.downloadTextButton.addEventListener(events.click,
    () => {
        if (domElements.textInput.value.length === 0) {
            alert('Adicione um texto no campo "Digite alguma coisa..."');
            return;
        }

        const text = domElements.textInput.value;

        const blob = new Blob(
            [text],
            { type: "text/plain" }
        );

        const url = URL.createObjectURL(blob);
        const tag_a = document.createElement("a");

        tag_a.href = url;
        tag_a.download = "texto.txt";
        tag_a.click();
        URL.revokeObjectURL(url);
    }
);

// Enviando o arquivo para ser lido
domElements.fileUplaod.addEventListener(events.change,
    (event) => {
        const target = event.target;
        const file = target.files[0];

        if (file) {
            const fileReader = new FileReader();

            fileReader.onload = (event) => {
                domElements.textInput.value = event.target.result;
            };

            fileReader.readAsText(file);
        }
    }
);

domElements.clearField.addEventListener(events.click,
    () => {
        if (domElements.textInput.value.length === 0) {
            alert('Adicione um texto no campo "Digite alguma coisa..."');
            return;
        }
        domElements.textInput.value = '';
    }
);