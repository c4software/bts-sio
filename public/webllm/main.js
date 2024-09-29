import * as webllm from "https://esm.run/@mlc-ai/web-llm";
let engine = null;
let saveSelection;

function showAnswer(initialText) {
    document.querySelector('#answerContent').innerHTML = initialText;
    document.querySelector('.answer').classList.add('visible');
    document.querySelector(".answer").classList.add('animation');
}

function stopAnimationAnswer() {
    document.querySelector(".answer").classList.remove('animation');
}

async function loadModel() {
    if (engine) {
        return engine;
    }

    showAnswer("Chargement du modèle en cours... 0%");

    // Callback function to update model loading progress
    const initProgressCallback = (initProgress) => {
        document.querySelector('#answerContent').innerHTML = initProgress.text;
    }
    const selectedModel = "Llama-3.2-3B-Instruct-q4f32_1-MLC";
    const config = {
        initProgressCallback: initProgressCallback,
        temperature: 1.0,
        top_p: 1,
    };
    engine = await webllm.CreateMLCEngine(selectedModel, config);

    return engine;
}

async function getAnswer(text) {
    const engine = await loadModel();

    showAnswer("");

    const messages = [
        { role: "system", content: "Explique le texte suivant de manière concise, en préservant les informations clés. Le texte doit rester simple et clair pour être compris par des développeurs web débutants, sans ajouter d'éléments ou de détails superflus. N'ajoute pas d'élément supplémentaire" },
        { role: "user", content: text },
    ]

    // Chunks is an AsyncGenerator object
    const chunks = await engine.chat.completions.create({
        messages,
        temperature: 1,
        stream: true,
        stream_options: { include_usage: true },
    });

    let reply = "";
    for await (const chunk of chunks) {
        if (reply == "") {
            document.querySelector('#answerContent').innerHTML = "";
        }

        reply += chunk.choices[0]?.delta.content || "";
        document.querySelector('#answerContent').innerHTML = reply;

        if (chunk.usage) {
            // console.log(chunk.usage); // only last chunk has usage
            // Retrait de la sélection et de l'animation de couleur
            stopAnimationAnswer();
            saveSelection = null;
        }
    }

    await engine.getMessage();
}

// Inject the stylesheets
document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="/webllm/style.css">`);

// Inject the answer container    
document.body.insertAdjacentHTML('beforeend', `
    <div class="answer">
        <!-- Close icon -->
        <span class="close">&times;</span>

        <h3>Reformulation</h3>

        <div id="answerContent"></div>
    </div>
    <div id="reformulateAction">Reformuler la sélection</div>
    `);

document.getElementsByClassName('close')[0].addEventListener('click', function () {
    document.querySelector('.answer').classList.remove('visible');
});

document.addEventListener('mouseup', function () {
    const selectedText = window.getSelection().toString().trim();
    const reformulateAction = document.getElementById('reformulateAction');

    if (selectedText.length > 0) {
        saveSelection = window.getSelection().getRangeAt(0).cloneRange();
        const rect = saveSelection.getBoundingClientRect();
        reformulateAction.style.top = (rect.bottom + window.scrollY + 5) + 'px';
        reformulateAction.style.left = (rect.right + window.scrollX + 5) + 'px';
        reformulateAction.style.display = 'block';
    } else {
        reformulateAction.style.display = 'none';
    }
});

document.getElementById('reformulateAction').addEventListener('click', function () {
    getAnswer(saveSelection.toString().trim());
    this.style.display = 'none'; // Cacher le bouton après action
});

document.addEventListener('scroll', function () {
    document.getElementById('reformulateAction').style.display = 'none';
});