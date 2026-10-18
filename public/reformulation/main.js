// Reformulation d'une sélection avec Gemini Nano, le modèle intégré à Chrome.
// Summarizer API (stable depuis Chrome 138) par défaut, Prompt API (LanguageModel) en secours.
// Si la Prompt API est disponible, l'étudiant peut ensuite « Échanger sur le sujet » : le chat
// reçoit la partie de la page visible à l'écran (avec une marge) au moment de chaque question.
import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'

let saveSelection;
let summarizer = null;
let chat = null; // { session, selection, summary, lastContext }
let busy = false;
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
const chatSystemPrompt = `Tu aides des étudiants débutants en développement web à comprendre une page de cours.
Réponds en français, simplement et brièvement, sans titre.
Appuie-toi uniquement sur les extraits de la page qui te sont fournis. Si la réponse n'y figure pas, dis-le et conseille de demander à l'enseignant.
Ne donne pas directement la solution complète d'un exercice : guide l'étudiant pas à pas.

Titre de la page : "<<titre>>"
Passage sélectionné par l'étudiant : "<<selection>>"`;

// Zone visible envoyée au chat : l'écran plus une demi-hauteur d'écran au-dessus et en dessous
const VISIBLE_MARGIN_RATIO = 0.5;
const MAX_CONTEXT_CHARS = 8000; // ~2 000 tokens, la session Gemini Nano en accepte ~9 000 au total
const ANSWER_RESERVE_TOKENS = 1000;
const BLOCK_SELECTOR = 'h1, h2, h3, h4, p, li, pre, table, blockquote, summary';

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

async function canChat() {
    return hasPromptApi() && await LanguageModel.availability(languageOptions) !== "unavailable";
}

// Crée un résumeur (Summarizer API) ou une session (Prompt API), null si le modèle n'est pas utilisable
async function createModel(closestParagraph) {
    if (hasSummarizerApi() && await Summarizer.availability(summarizerOptions) !== "unavailable") {
        if (!summarizer) {
            showAnswer("Chargement du modèle en cours...");
            summarizer = await Summarizer.create({ ...summarizerOptions, monitor });
        }

        return summarizer;
    }

    if (await canChat()) {
        showAnswer("Chargement du modèle en cours...");
        const content = systemPrompt.replace("<<contexte>>", closestParagraph).replace("<<titre>>", document.title);

        return LanguageModel.create({
            ...languageOptions,
            initialPrompts: [{ role: "system", content }],
            monitor,
        });
    }

    return null;
}

async function getAnswer(text, closestParagraph) {
    exitChat();

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

        if (await canChat()) {
            chat = { session: null, selection: text, summary: reply, lastContext: null };
            document.getElementById('chatStart').style.display = 'block';
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

// Blocs de texte de la page actuellement affichés (les <details> fermés sont ignorés : pas de solution envoyée)
function visibleBlocks() {
    const root = document.querySelector('.vp-doc') || document.querySelector('main') || document.body;
    const margin = window.innerHeight * VISIBLE_MARGIN_RATIO;

    return [...root.querySelectorAll(BLOCK_SELECTOR)]
        .filter(el => !el.parentElement.closest(BLOCK_SELECTOR) && !el.closest('.answer'))
        .filter(el => el.checkVisibility ? el.checkVisibility() : el.offsetParent !== null)
        .filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.bottom > -margin && rect.top < window.innerHeight + margin;
        });
}

// Titre de la section en cours de lecture : le dernier titre passé au-dessus du tiers de l'écran
function currentHeading() {
    const root = document.querySelector('.vp-doc') || document.body;
    let current = null;
    for (const heading of root.querySelectorAll('h1, h2, h3')) {
        if (heading.getBoundingClientRect().top > window.innerHeight / 3) {
            break;
        }
        current = heading;
    }

    return (current || root.querySelector('h1, h2, h3'))?.innerText.replace(/\s*#\s*$/, '').trim() || document.title;
}

// Texte de la zone visible, en gardant d'abord les blocs les plus proches du centre de l'écran
function visibleContext() {
    const center = window.innerHeight / 2;
    const distance = el => {
        const rect = el.getBoundingClientRect();
        return Math.abs((rect.top + rect.bottom) / 2 - center);
    };

    const blocks = visibleBlocks();
    const kept = new Set();
    let size = 0;
    for (const el of [...blocks].sort((a, b) => distance(a) - distance(b))) {
        const length = el.innerText.length;
        if (size + length > MAX_CONTEXT_CHARS && kept.size > 0) {
            break;
        }
        kept.add(el);
        size += length;
    }

    const text = blocks.filter(el => kept.has(el)).map(el => el.innerText.trim()).join('\n\n');

    return `Section : ${currentHeading()}\n\n${text.substring(0, MAX_CONTEXT_CHARS)}`;
}

function updateChatContextLabel() {
    if (document.querySelector('.answer').classList.contains('chat')) {
        document.getElementById('chatContext').textContent = `Contexte : « ${currentHeading()} »`;
    }
}

function createChatSession() {
    const content = chatSystemPrompt
        .replace("<<titre>>", document.title)
        .replace("<<selection>>", chat.selection.substring(0, 2000));

    chat.lastContext = null;

    return LanguageModel.create({
        ...languageOptions,
        initialPrompts: [
            { role: "system", content },
            { role: "user", content: "Reformule ce passage." },
            { role: "assistant", content: chat.summary },
        ],
    });
}

// Les noms ont changé entre les versions de Chrome (inputQuota → contextWindow, etc.)
async function remainingTokensAfter(session, prompt) {
    const measure = session.measureContextUsage ? session.measureContextUsage(prompt) : session.measureInputUsage(prompt);
    const quota = session.contextWindow ?? session.inputQuota;
    const used = session.contextUsage ?? session.inputUsage;

    return quota - used - await measure;
}

function addMessage(role, html) {
    const message = document.createElement('div');
    message.className = `chatMessage ${role}`;
    message.innerHTML = html;
    document.getElementById('chatMessages').appendChild(message);
    message.scrollIntoView({ block: 'end' });

    return message;
}

async function startChat() {
    document.getElementById('chatStart').style.display = 'none';
    document.querySelector('.answer').classList.add('chat');
    document.querySelector('.answer > h3').textContent = 'Échanger sur le sujet';
    updateChatContextLabel();

    try {
        chat.session = await createChatSession();
        document.getElementById('chatInput').focus();
    } catch (error) {
        console.error(error);
        addMessage('info', "Impossible de démarrer l'échange avec Gemini Nano.");
    }
}

function exitChat() {
    chat?.session?.destroy();
    chat = null;
    busy = false;
    document.querySelector('.answer').classList.remove('chat');
    document.querySelector('.answer > h3').textContent = 'Reformulation';
    document.getElementById('chatStart').style.display = 'none';
    document.getElementById('chatMessages').innerHTML = '';
}

async function sendQuestion(question) {
    if (busy || !chat?.session) {
        return;
    }
    busy = true;

    const input = document.getElementById('chatInput');
    input.disabled = true;
    addMessage('user', md.renderInline(question.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c])));
    const answer = addMessage('assistant', '…');
    document.querySelector('.answer').classList.add('animation');

    try {
        // La zone visible n'est renvoyée que si l'étudiant a fait défiler la page depuis la dernière question
        const context = visibleContext();
        const buildPrompt = () => context === chat.lastContext
            ? question
            : `Partie de la page actuellement à l'écran :\n"""\n${context}\n"""\n\nQuestion : ${question}`;

        // Mémoire du modèle presque pleine : on repart d'une session neuve (sélection et résumé conservés)
        if (await remainingTokensAfter(chat.session, buildPrompt()) < ANSWER_RESERVE_TOKENS) {
            chat.session.destroy();
            chat.session = await createChatSession();
            addMessage('info', "La conversation était trop longue : le modèle a oublié les échanges précédents.");
            document.getElementById('chatMessages').appendChild(answer);
        }

        const prompt = buildPrompt();
        chat.lastContext = context;

        let reply = "";
        for await (const chunk of chat.session.promptStreaming(prompt)) {
            reply += chunk;
            answer.innerHTML = md.render(reply);
            answer.scrollIntoView({ block: 'end' });
        }
    } catch (error) {
        console.error(error);
        answer.textContent = "La réponse a échoué, reformulez votre question plus brièvement.";
    } finally {
        stopAnimationAnswer();
        busy = false;
        input.disabled = false;
        input.focus();
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

        <div id="chatThread">
            <div id="answerContent"></div>
            <div id="chatMessages"></div>
        </div>

        <button id="chatStart" type="button">💬 Échanger sur le sujet</button>

        <form id="chatForm">
            <p id="chatContext"></p>
            <textarea id="chatInput" rows="2" placeholder="Votre question sur la partie affichée à l'écran…"></textarea>
            <button type="submit">Envoyer</button>
        </form>

        <p class="answerContentInfo">La reformulation (IA, Gemini Nano exécuté localement par Chrome) peut faire des erreurs. Envisagez de vérifier les informations.</p>
    </div>
    <div id="reformulateAction">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 5.6L5 7l1.4-2.5L5 2l2.5 1.4L10 2L8.6 4.5L10 7zm12 9.8L22 14l-1.4 2.5L22 19l-2.5-1.4L17 19l1.4-2.5L17 14zM22 2l-1.4 2.5L22 7l-2.5-1.4L17 7l1.4-2.5L17 2l2.5 1.4zm-8.66 10.78l2.44-2.44l-2.12-2.12l-2.44 2.44zm1.03-5.49l2.34 2.34c.39.37.39 1.02 0 1.41L5.04 22.71c-.39.39-1.04.39-1.41 0l-2.34-2.34c-.39-.37-.39-1.02 0-1.41L12.96 7.29c.39-.39 1.04-.39 1.41 0"/></svg>
    </div>
    `);

    document.getElementsByClassName('close')[0].addEventListener('click', function () {
        exitChat();
        document.querySelector('.answer').classList.remove('visible');
    });

    document.getElementById('chatStart').addEventListener('click', startChat);

    document.getElementById('chatForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const input = document.getElementById('chatInput');
        const question = input.value.trim();
        if (question) {
            input.value = '';
            sendQuestion(question);
        }
    });

    // Entrée pour envoyer, Maj + Entrée pour aller à la ligne
    document.getElementById('chatInput').addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            document.getElementById('chatForm').requestSubmit();
        }
    });

    document.addEventListener('mouseup', function (event) {
        const reformulateAction = document.getElementById('reformulateAction');

        // Pas de bouton de reformulation pour une sélection faite dans le panneau lui-même
        if (event.target.closest?.('.answer, #reformulateAction')) {
            return;
        }

        const selectedText = window.getSelection().toString().trim();

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

    let scrollScheduled = false;
    document.addEventListener('scroll', function () {
        document.getElementById('reformulateAction').style.display = 'none';

        // Mise à jour de l'indicateur de contexte au plus une fois par image
        if (!scrollScheduled) {
            scrollScheduled = true;
            requestAnimationFrame(() => {
                scrollScheduled = false;
                updateChatContextLabel();
            });
        }
    });
}
