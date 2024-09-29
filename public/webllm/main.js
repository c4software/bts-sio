import * as webllm from "https://esm.run/@mlc-ai/web-llm";
import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'

let engine = null;
let saveSelection;
const md = markdownIt()
const selectedModel = "Llama-3.2-3B-Instruct-q4f32_1-MLC";
const systemPrompt = "Explique le texte suivant de manière concise, en préservant les informations clés. Le texte doit rester simple et clair pour être compris par des développeurs web débutants, sans ajouter d'éléments ou de détails superflus. N'ajoute pas d'élément supplémentaire";

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

    const hasModelInCache = await webllm.hasModelInCache(selectedModel);

    if (!hasModelInCache) {
        const result = confirm("Voulez-vous télécharger le modèle de reformulation ? (~1.8 Go)");

        if (!result) {
            return;
        }
    }

    showAnswer("Chargement du modèle en cours... 0%");

    // Callback function to update model loading progress
    const initProgressCallback = (initProgress) => {
        document.querySelector('#answerContent').innerHTML = initProgress.text;
    }
    const config = {
        initProgressCallback: initProgressCallback,
        temperature: 0.3,
        top_p: 0.3,
    };
    engine = await webllm.CreateMLCEngine(selectedModel, config);

    return engine;
}

async function getAnswer(text) {
    const engine = await loadModel();

    if (!engine) {
        return;
    }

    showAnswer("");

    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
    ]

    // Chunks sont les réponses partielles
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
        document.querySelector('#answerContent').innerHTML = md.render(reply);

        if (chunk.usage) {
            // console.log(chunk.usage); // only last chunk has usage
            // Retrait de la sélection et de l'animation de couleur
            stopAnimationAnswer();
            saveSelection = null;
            reply = "";
        }
    }

    await engine.getMessage();
}

if (navigator.gpu) {
    // Inject the stylesheets
    document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="/webllm/style.css">`);

    // Inject the answer container    
    document.body.insertAdjacentHTML('beforeend', `
    <div class="answer">
        <!-- Close icon -->
        <span class="close">&times;</span>

        <h3>Reformulation</h3>

        <div id="answerContent"></div>

        <p class="answerContentInfo">La reformulation (IA) peut faire des erreurs. Envisagez de vérifier les informations.</p>
    </div>
    <div id="reformulateAction">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 5.6L5 7l1.4-2.5L5 2l2.5 1.4L10 2L8.6 4.5L10 7zm12 9.8L22 14l-1.4 2.5L22 19l-2.5-1.4L17 19l1.4-2.5L17 14zM22 2l-1.4 2.5L22 7l-2.5-1.4L17 7l1.4-2.5L17 2l2.5 1.4zm-8.66 10.78l2.44-2.44l-2.12-2.12l-2.44 2.44zm1.03-5.49l2.34 2.34c.39.37.39 1.02 0 1.41L5.04 22.71c-.39.39-1.04.39-1.41 0l-2.34-2.34c-.39-.37-.39-1.02 0-1.41L12.96 7.29c.39-.39 1.04-.39 1.41 0"/></svg>
    </div>
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
}