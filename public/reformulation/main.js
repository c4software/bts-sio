// Reformulation d'une sélection avec Gemini Nano, le modèle intégré à Chrome.
// Prompt API (LanguageModel) si elle est disponible, sinon Summarizer API (stable depuis Chrome 138).
import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'

let saveSelection;
let summarizer = null;
const md = markdownIt()
const languageOptions = {
    expectedInputs: [{ type: "text", languages: ["fr"] }],
    expectedOutputs: [{ type: "text", languages: ["fr"] }],
};
const summarizerOptions = {
    type: "key-points",
    format: "markdown",
    length: "short",
    expectedInputLanguages: ["fr"],
    expectedContextLanguages: ["fr"],
    outputLanguage: "fr",
    sharedContext: "Cours de développement web pour des développeurs web débutants. Le résumé doit être simple et clair, sans modifier le sens ni ajouter d'éléments.",
};
const systemPrompt = `Explique le texte suivant de manière concise, en conservant les informations clés.
Le texte doit être simple et clair pour des développeurs web débutants. Ne modifie pas le sens, ne déforme pas les faits, et n'ajoute aucun élément supplémentaire.
Réponds en français, sans titre.

Voici le context de la reformulation : "<<contexte>>"
Titre de la page : "<<titre>>"`;

function showAnswer(initialText) {
    document.querySelector('#answerContent').innerHTML = initialText;
    document.querySelector('.answer').classList.add('visible');
    document.querySelector(".answer").classList.add('animation');
}

function stopAnimationAnswer() {
    document.querySelector(".answer").classList.remove('animation');
}

// Suivi du chargement du modèle (téléchargé par Chrome une seule fois, pour tous les sites)
function monitor(m) {
    m.addEventListener('downloadprogress', (e) => {
        document.querySelector('#answerContent').innerHTML = `Chargement du modèle Gemini Nano... ${Math.round(e.loaded * 100)}%`;
    });
}

function hasPromptApi() {
    return 'LanguageModel' in self;
}

function hasSummarizerApi() {
    return 'Summarizer' in self;
}

// Crée une session (Prompt API) ou un résumeur (Summarizer API), null si le modèle n'est pas utilisable
async function createModel(closestParagraph) {
    if (hasPromptApi() && await LanguageModel.availability(languageOptions) !== "unavailable") {
        showAnswer("Chargement du modèle en cours...");
        const content = systemPrompt.replace("<<contexte>>", closestParagraph).replace("<<titre>>", document.title);

        return LanguageModel.create({
            ...languageOptions,
            initialPrompts: [{ role: "system", content }],
            monitor,
        });
    }

    if (hasSummarizerApi() && await Summarizer.availability(summarizerOptions) !== "unavailable") {
        if (!summarizer) {
            showAnswer("Chargement du modèle en cours...");
            summarizer = await Summarizer.create({ ...summarizerOptions, monitor });
        }

        return summarizer;
    }

    return null;
}

async function getAnswer(text, closestParagraph) {
    let model;
    try {
        model = await createModel(closestParagraph);
    } catch (error) {
        console.error(error);
    }

    if (!model) {
        showAnswer("Gemini Nano n'est pas disponible dans ce navigateur (Chrome récent sur ordinateur requis).");
        stopAnimationAnswer();
        return;
    }

    showAnswer("");

    // Chaque chunk est une réponse partielle (delta) à ajouter au texte déjà reçu
    const chunks = model === summarizer
        ? model.summarizeStreaming(text, { context: `Titre de la page : ${document.title}. Contexte : ${closestParagraph}` })
        : model.promptStreaming(text);

    let reply = "";
    try {
        for await (const chunk of chunks) {
            reply += chunk;
            document.querySelector('#answerContent').innerHTML = md.render(reply);
        }
    } catch (error) {
        console.error(error);
        document.querySelector('#answerContent').innerHTML = "La reformulation a échoué, réessayez avec une sélection plus courte.";
    } finally {
        // Retrait de la sélection et de l'animation de couleur
        stopAnimationAnswer();
        saveSelection = null;

        // La session Prompt API embarque le contexte de la sélection : on ne la réutilise pas
        if (model !== summarizer) {
            model.destroy();
        }
    }
}

if (hasPromptApi() || hasSummarizerApi()) {
    // Inject the stylesheets
    document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="/reformulation/style.css">`);

    // Inject the answer container
    document.body.insertAdjacentHTML('beforeend', `
    <div class="answer">
        <!-- Close icon -->
        <span class="close">&times;</span>

        <h3>Reformulation</h3>

        <div id="answerContent"></div>

        <p class="answerContentInfo">La reformulation (IA, Gemini Nano exécuté localement par Chrome) peut faire des erreurs. Envisagez de vérifier les informations.</p>
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
        // Get closest p around the selection
        let closestParagraph = "";
        try {
            closestParagraph = saveSelection.startContainer.parentElement.innerText || "";
        } catch (error) {
            closestParagraph = "";
        }

        if (closestParagraph.length > 200) {
            closestParagraph = closestParagraph.substring(0, 200) + "...";
        }

        if (saveSelection) {
            getAnswer(saveSelection.toString().trim(), closestParagraph);
        }

        this.style.display = 'none'; // Cacher le bouton après action
    });

    document.addEventListener('scroll', function () {
        document.getElementById('reformulateAction').style.display = 'none';
    });
}
