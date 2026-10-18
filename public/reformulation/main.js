// Reformulation d'une sélection avec un modèle d'IA exécuté localement dans le navigateur.
// Gemini Nano (intégré à Chrome) en priorité : Summarizer API (stable depuis Chrome 138) par défaut,
// Prompt API (LanguageModel) en secours. Sans Gemini Nano : WebLLM avec Gemma 2 (même famille que
// Gemini Nano), téléchargé une seule fois si le navigateur a WebGPU.
// L'étudiant peut ensuite « Échanger sur le sujet » : le chat
// reçoit la partie de la page visible à l'écran (avec une marge) au moment de chaque question.
// Le même chat s'ouvre sans sélection depuis le bouton de la barre du haut
// (.vitepress/theme/components/ChatNavButton.vue, événements reformulation:*).
import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'

let saveSelection;
let summarizer = null;
let webllmEngine = null; // Promise du moteur WebLLM, partagé entre reformulation et chat
let webgpuAdapter = null;
let chat = null; // { session, selection, summary, lastContext }, selection et summary à null en mode page
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
Réponds en français, sans titre, en vouvoyant le lecteur.

Voici le context de la reformulation : "<<contexte>>"
Titre de la page : "<<titre>>"`;
const chatSystemPrompt = `Tu aides des étudiants débutants en développement web à comprendre une page de cours.
Réponds en français, simplement et brièvement, sans titre, en vouvoyant l'étudiant.
Appuie-toi uniquement sur les extraits de la page qui te sont fournis. Lis-les en entier, y compris les exemples de code : si un exemple répond à la question, montre-le. Si la réponse n'y figure vraiment pas, dis-le et conseille de demander à l'enseignant.
Ne donne pas directement la solution complète d'un exercice : guide l'étudiant pas à pas.

Titre de la page : "<<titre>>"`;

// Zone visible envoyée au chat : l'écran plus une demi-hauteur d'écran au-dessus et en dessous
const VISIBLE_MARGIN_RATIO = 0.5;
const GEMINI_CONTEXT_CHARS = 8000; // ~2 000 tokens, la session Gemini Nano en accepte ~9 000 au total
const WEBLLM_CONTEXT_CHARS = 4000; // Gemma 2 dans WebLLM : 4 096 tokens au total
const ANSWER_RESERVE_TOKENS = 1000;

// Repli WebLLM (version figée) : Gemma 2 2B, en f32 si la carte graphique ne gère pas les shaders f16
const WEBLLM_URL = "https://esm.run/@mlc-ai/web-llm@0.2.85";
const WEBLLM_MODEL_F16 = "gemma-2-2b-it-q4f16_1-MLC";
const WEBLLM_MODEL_F32 = "gemma-2-2b-it-q4f32_1-MLC";
const WEBLLM_CONTEXT_WINDOW = 4096;
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

// null si le navigateur n'a pas WebGPU (ou pas de carte graphique utilisable)
function getWebGpuAdapter() {
    webgpuAdapter ??= 'gpu' in navigator ? navigator.gpu.requestAdapter().catch(() => null) : Promise.resolve(null);

    return webgpuAdapter;
}

async function canChatAnywhere() {
    return await canChat() || !!(await getWebGpuAdapter());
}

// Charge Gemma 2 avec WebLLM (après accord de l'étudiant si le modèle n'est pas encore en cache), null si refusé
function loadWebLLM(onProgress) {
    webllmEngine ??= (async () => {
        const webllm = await import(WEBLLM_URL);
        const adapter = await getWebGpuAdapter();
        const model = adapter.features.has('shader-f16') ? WEBLLM_MODEL_F16 : WEBLLM_MODEL_F32;

        if (!await webllm.hasModelInCache(model)) {
            const accepted = confirm("Gemini Nano n'est pas disponible dans ce navigateur. Voulez-vous télécharger le modèle Gemma 2 (~1,9 Go, une seule fois. Le modèle sera stocké dans le cache du navigateur.) ?");
            if (!accepted) {
                return null;
            }
        }

        return webllm.CreateMLCEngine(model, {
            initProgressCallback: (report) => onProgress(`Chargement du modèle Gemma 2... ${Math.round(report.progress * 100)}%`),
        });
    })();

    // Refus ou échec : on pourra redemander plus tard
    webllmEngine.then(engine => engine || (webllmEngine = null), () => (webllmEngine = null));

    return webllmEngine;
}

// Approximation (WebLLM n'expose pas de compteur) : ~3 caractères par token en français
function estimateTokens(text) {
    return Math.ceil(text.length / 3);
}

// Session WebLLM qui imite celle de la Prompt API : promptStreaming(), mesure du contexte, destroy()
function createWebLLMSession(engine, initialPrompts) {
    // Gemma n'a pas de rôle « system » : les consignes sont placées en tête du premier message
    const [system, ...history] = initialPrompts;
    const messages = history.map(message => ({ ...message }));
    let instructions = system.content;
    let generating = false;
    if (messages.length > 0) {
        messages[0].content = `${instructions}\n\n${messages[0].content}`;
        instructions = null;
    }

    return {
        contextWindow: WEBLLM_CONTEXT_WINDOW,
        get contextUsage() {
            return estimateTokens((instructions || '') + messages.map(message => message.content).join(''));
        },
        measureContextUsage: async (prompt) => estimateTokens(prompt),
        async *promptStreaming(prompt) {
            messages.push({ role: "user", content: instructions ? `${instructions}\n\n${prompt}` : prompt });
            let reply = "";
            generating = true;
            try {
                const chunks = await engine.chat.completions.create({ messages, stream: true, temperature: 0.3 });
                for await (const chunk of chunks) {
                    const delta = chunk.choices[0]?.delta.content || "";
                    reply += delta;
                    yield delta;
                }
            } catch (error) {
                messages.pop(); // garder l'alternance user / assistant attendue par Gemma
                throw error;
            } finally {
                generating = false;
            }
            instructions = null;
            messages.push({ role: "assistant", content: reply });
        },
        // Le moteur est partagé : on n'interrompt que la génération de cette session
        destroy() {
            if (generating) {
                engine.interruptGenerate();
            }
        },
    };
}

// Crée un résumeur (Summarizer API) ou une session (Prompt API ou WebLLM), null si aucun modèle n'est utilisable
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

    if (await getWebGpuAdapter()) {
        const engine = await loadWebLLM(text => showAnswer(text));
        const content = systemPrompt.replace("<<contexte>>", closestParagraph).replace("<<titre>>", document.title);

        return engine && createWebLLMSession(engine, [{ role: "system", content }]);
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
        showAnswer("Le modèle d'IA n'a pas pu être chargé dans ce navigateur.");
        stopAnimationAnswer();
        return;
    }

    if (!model) {
        showAnswer(await getWebGpuAdapter() ? "Téléchargement du modèle annulé." : "Aucun modèle d'IA local n'est disponible dans ce navigateur.");
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

        if (await canChatAnywhere()) {
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

        // La session (Prompt API ou WebLLM) embarque le contexte de la sélection : on ne la réutilise pas
        if (model !== summarizer) {
            model.destroy();
        }
    }
}

// Bas de la partie lisible de la page : sur mobile, le chat est un tiroir qui en masque le bas
function readableBottom() {
    const panel = document.querySelector('.answer.chat.visible');
    const top = panel ? panel.getBoundingClientRect().top : window.innerHeight;

    return top > window.innerHeight / 3 ? top : window.innerHeight;
}

// Blocs de texte de la page actuellement affichés (les <details> fermés sont ignorés : pas de solution envoyée)
function visibleBlocks() {
    const root = document.querySelector('.vp-doc') || document.querySelector('main') || document.body;
    const bottom = readableBottom();
    const margin = bottom * VISIBLE_MARGIN_RATIO;

    return [...root.querySelectorAll(BLOCK_SELECTOR)]
        .filter(el => !el.parentElement.closest(BLOCK_SELECTOR) && !el.closest('.answer'))
        .filter(el => el.checkVisibility ? el.checkVisibility() : el.offsetParent !== null)
        .filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.bottom > -margin && rect.top < bottom + margin;
        });
}

// Titre de la section en cours de lecture : le dernier titre passé au-dessus du tiers de l'écran
function currentHeading() {
    const root = document.querySelector('.vp-doc') || document.body;
    let current = null;
    for (const heading of root.querySelectorAll('h1, h2, h3')) {
        if (heading.getBoundingClientRect().top > readableBottom() / 3) {
            break;
        }
        current = heading;
    }

    return (current || root.querySelector('h1, h2, h3'))?.innerText.replace(/[\u200B#]/g, '').trim() || document.title;
}

// Texte de la zone visible, en gardant d'abord les blocs les plus proches du centre de l'écran
function visibleContext(maxChars) {
    const center = readableBottom() / 2;
    const distance = el => {
        const rect = el.getBoundingClientRect();
        return Math.abs((rect.top + rect.bottom) / 2 - center);
    };

    const blocks = visibleBlocks();
    const kept = new Set();
    let size = 0;
    for (const el of [...blocks].sort((a, b) => distance(a) - distance(b))) {
        const length = el.innerText.length;
        if (size + length > maxChars && kept.size > 0) {
            break;
        }
        kept.add(el);
        size += length;
    }

    const text = blocks.filter(el => kept.has(el)).map(el => el.innerText.trim()).join('\n\n');

    return `Section : ${currentHeading()}\n\n${text.substring(0, maxChars)}`;
}

function updateChatContextLabel() {
    if (document.querySelector('.answer').classList.contains('chat')) {
        document.getElementById('chatContext').textContent = `Contexte : « ${currentHeading()} »`;
    }
}

// Session Gemini Nano si possible, sinon WebLLM (null si l'étudiant refuse le téléchargement)
async function createChatSession(conversation, onProgress) {
    let content = chatSystemPrompt.replace("<<titre>>", document.title);
    const initialPrompts = [];

    // Chat ouvert depuis une reformulation : la sélection et son résumé servent de point de départ
    if (conversation.selection) {
        content += `\nPassage sélectionné par l'étudiant : "${conversation.selection.substring(0, 2000)}"`;
        initialPrompts.push(
            { role: "user", content: "Reformule ce passage." },
            { role: "assistant", content: conversation.summary },
        );
    }

    conversation.lastContext = null;

    if (await canChat()) {
        conversation.maxContextChars = GEMINI_CONTEXT_CHARS;

        return LanguageModel.create({
            ...languageOptions,
            initialPrompts: [{ role: "system", content }, ...initialPrompts],
        });
    }

    const engine = await loadWebLLM(onProgress);
    conversation.maxContextChars = WEBLLM_CONTEXT_CHARS;

    return engine && createWebLLMSession(engine, [{ role: "system", content }, ...initialPrompts]);
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

// createNow à false : la session sera créée à la première question (utile juste après un changement de page)
async function startChat(createNow = true) {
    document.getElementById('chatStart').style.display = 'none';
    document.querySelector('.answer').classList.add('chat', 'visible');
    document.querySelector('.answer > h3').textContent = chat.selection ? 'Échanger sur le sujet' : 'Échanger sur la page';
    updateChatContextLabel();
    document.getElementById('chatInput').focus();

    if (!createNow) {
        return;
    }

    const conversation = chat;
    const progress = addMessage('info', "Chargement du modèle...");
    try {
        const session = await createChatSession(conversation, text => (progress.textContent = text));
        progress.remove();

        if (!session) {
            addMessage('info', "Téléchargement du modèle annulé : l'échange n'est pas possible sans modèle.");
            return;
        }

        // Panneau fermé, page changée ou question déjà envoyée pendant la création : session inutile
        if (chat !== conversation || conversation.session) {
            session.destroy();
            return;
        }
        conversation.session = session;
    } catch (error) {
        console.error(error);
        progress.textContent = "Impossible de démarrer l'échange : le modèle d'IA n'a pas pu être chargé.";
    }
}

// Chat sans sélection, ouvert depuis la barre du haut
function startPageChat(createNow = true) {
    exitChat();
    stopAnimationAnswer();
    chat = { session: null, selection: null, summary: null, lastContext: null };
    document.querySelector('#answerContent').innerHTML = "<p class=\"chatMessage info\">Posez vos questions sur la partie de la page affichée à l'écran : le contexte suit votre lecture.</p>";
    startChat(createNow);
}

function closePanel() {
    exitChat();
    document.querySelector('.answer').classList.remove('visible');
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
    if (busy || !chat) {
        return;
    }
    busy = true;
    const conversation = chat;

    const input = document.getElementById('chatInput');
    input.disabled = true;
    addMessage('user', md.renderInline(question.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c])));
    const answer = addMessage('assistant', '…');
    document.querySelector('.answer').classList.add('animation');

    try {
        // Session pas encore prête (ou effacée par un changement de page)
        conversation.session ??= await createChatSession(conversation, text => (answer.textContent = text));
        if (!conversation.session) {
            answer.textContent = "Téléchargement du modèle annulé : l'échange n'est pas possible sans modèle.";
            return;
        }

        // La zone visible n'est renvoyée que si l'étudiant a fait défiler la page depuis la dernière question
        const context = visibleContext(conversation.maxContextChars);
        const buildPrompt = () => context === conversation.lastContext
            ? question
            : `Partie de la page actuellement à l'écran :\n"""\n${context}\n"""\n\nQuestion : ${question}`;

        // Mémoire du modèle presque pleine : on repart d'une session neuve (sélection et résumé conservés)
        if (await remainingTokensAfter(conversation.session, buildPrompt()) < ANSWER_RESERVE_TOKENS) {
            conversation.session.destroy();
            conversation.session = await createChatSession(conversation, text => (answer.textContent = text));
            addMessage('info', "La conversation était trop longue : le modèle a oublié les échanges précédents.");
            document.getElementById('chatMessages').appendChild(answer);
        }

        const prompt = buildPrompt();
        conversation.lastContext = context;

        let reply = "";
        for await (const chunk of conversation.session.promptStreaming(prompt)) {
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

if (hasPromptApi() || hasSummarizerApi() || await getWebGpuAdapter()) {
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

        <p class="answerContentInfo">La reformulation (IA exécutée localement dans votre navigateur) peut faire des erreurs. Envisagez de vérifier les informations.</p>
    </div>
    <div id="reformulateAction">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.5 5.6L5 7l1.4-2.5L5 2l2.5 1.4L10 2L8.6 4.5L10 7zm12 9.8L22 14l-1.4 2.5L22 19l-2.5-1.4L17 19l1.4-2.5L17 14zM22 2l-1.4 2.5L22 7l-2.5-1.4L17 7l1.4-2.5L17 2l2.5 1.4zm-8.66 10.78l2.44-2.44l-2.12-2.12l-2.44 2.44zm1.03-5.49l2.34 2.34c.39.37.39 1.02 0 1.41L5.04 22.71c-.39.39-1.04.39-1.41 0l-2.34-2.34c-.39-.37-.39-1.02 0-1.41L12.96 7.29c.39-.39 1.04-.39 1.41 0"/></svg>
    </div>
    `);

    document.getElementsByClassName('close')[0].addEventListener('click', closePanel);

    window.addEventListener('reformulation:toggle-chat', function () {
        const panel = document.querySelector('.answer');
        if (panel.classList.contains('visible') && panel.classList.contains('chat')) {
            closePanel();
        } else {
            startPageChat();
        }
    });

    // Navigation vers une autre page du site : la conversation repart de zéro, sur la nouvelle page
    window.addEventListener('reformulation:page-change', function () {
        if (chat && document.querySelector('.answer').classList.contains('chat')) {
            startPageChat(false);
            addMessage('info', "Nouvelle page : la conversation repart de zéro.");
            setTimeout(updateChatContextLabel, 500);
        }
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

    function updateReformulateAction() {
        const reformulateAction = document.getElementById('reformulateAction');
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        // Pas de bouton de reformulation pour une sélection faite dans le panneau lui-même
        if (selection.anchorNode?.parentElement?.closest('.answer')) {
            return;
        }

        if (selectedText.length > 0) {
            saveSelection = selection.getRangeAt(0).cloneRange();
            const rect = saveSelection.getBoundingClientRect();
            // Le bouton reste dans la largeur de l'écran (pas de défilement horizontal sur mobile)
            const maxLeft = document.documentElement.clientWidth - 50;
            reformulateAction.style.top = (rect.bottom + window.scrollY + 5) + 'px';
            reformulateAction.style.left = (Math.min(rect.right + 5, maxLeft) + window.scrollX) + 'px';
            reformulateAction.style.display = 'block';
        } else {
            reformulateAction.style.display = 'none';
        }
    }

    document.addEventListener('mouseup', function (event) {
        if (!event.target.closest?.('.answer, #reformulateAction')) {
            updateReformulateAction();
        }
    });

    // Sélection au doigt (écrans tactiles) : pas de mouseup, on attend la fin de la sélection
    let selectionTimer;
    document.addEventListener('selectionchange', function () {
        clearTimeout(selectionTimer);
        selectionTimer = setTimeout(updateReformulateAction, 400);
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
