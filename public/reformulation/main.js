// Reformulation d'une sélection avec un modèle d'IA exécuté localement dans le navigateur.
// Modèle IA au choix de l'étudiant (sélecteur du chat) : Gemini Nano intégré à Chrome (Prompt API)
// par défaut, ou Gemma 2 / Qwen3 de taille équivalente via WebLLM (téléchargés une seule fois, WebGPU requis).
// Le résumé Chrome utilise la Summarizer API (stable depuis Chrome 138).
// L'étudiant choisit entre « Reformulation IA » (prompt, Prompt API ou Gemma) et « Résumé Chrome » (Summarizer).
// Il peut ensuite « Échanger sur le sujet » : le chat
// reçoit la partie de la page visible à l'écran (avec une marge) au moment de chaque question.
// Le même chat s'ouvre sans sélection depuis le bouton de la barre du haut
// (.vitepress/theme/components/ChatNavButton.vue, événements reformulation:*).
import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'

let saveSelection;
let summarizer = null;
let webllm = null; // module WebLLM, importé seulement si besoin
let webllmEngine = null; // moteur WebLLM, partagé entre reformulation et chat
let webllmModel = null; // identifiant du modèle chargé dans le moteur
let webllmLoading = null; // chargements enchaînés : un seul modèle à la fois en mémoire
let webgpuAdapter = null;
let chat = null; // { session, selection, summary, lastContext }, selection et summary à null en mode page
let busy = false;
let lastRequest = null; // dernière sélection reformulée, rejouée quand l'étudiant change de mode
let requestId = 0; // seule la dernière reformulation demandée écrit dans le panneau
// Les modèles reviennent souvent à la ligne sans ligne vide : breaks pour garder ces retours
const md = markdownIt({ breaks: true })
const MODE_STORAGE_KEY = 'reformulation-mode';
const MODEL_STORAGE_KEY = 'reformulation-model';
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
const WEBLLM_CONTEXT_CHARS = 4000; // modèles WebLLM : 4 096 tokens au total
const ANSWER_RESERVE_TOKENS = 1000;

// Modèles proposés pour la reformulation IA et le chat. Les modèles WebLLM (version figée) ont une taille
// proche de Gemini Nano ; variante f32 si la carte graphique ne gère pas les shaders f16.
const WEBLLM_URL = "https://esm.run/@mlc-ai/web-llm@0.2.85";
const WEBLLM_CONTEXT_WINDOW = 4096;
const AI_MODELS = {
    gemini: { label: "Gemini Nano (intégré à Chrome)" },
    gemma: {
        label: "Gemma 2 2B",
        size: "~1,9 Go",
        f16: "gemma-2-2b-it-q4f16_1-MLC",
        f32: "gemma-2-2b-it-q4f32_1-MLC",
        systemRole: false, // Gemma n'a pas de rôle « system »
    },
    qwen: {
        label: "Qwen3 1.7B",
        size: "~2 Go",
        f16: "Qwen3-1.7B-q4f16_1-MLC",
        f32: "Qwen3-1.7B-q4f32_1-MLC",
        systemRole: true,
        options: { extra_body: { enable_thinking: false } }, // pas de raisonnement affiché avant la réponse
    },
};
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

async function canSummarize() {
    return hasSummarizerApi() && await Summarizer.availability(summarizerOptions) !== "unavailable";
}

async function getSummarizer() {
    if (!summarizer) {
        showAnswer("Chargement du modèle en cours...");
        summarizer = await Summarizer.create({ ...summarizerOptions, monitor });
    }

    return summarizer;
}

// Mode choisi par l'étudiant ; par défaut la reformulation IA seulement si elle ne demande pas de téléchargement
async function getReformulationMode() {
    try {
        const saved = localStorage.getItem(MODE_STORAGE_KEY);
        if (saved === 'prompt' || saved === 'summarizer') {
            return saved;
        }
    } catch (error) {
        // stockage indisponible (navigation privée...) : mode par défaut
    }

    return await canChat() || !await canSummarize() ? 'prompt' : 'summarizer';
}

function saveReformulationMode(mode) {
    try {
        localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch (error) {
        // tant pis, le choix ne sera pas mémorisé
    }
}

// Le sélecteur n'a de sens que si les deux modes sont possibles
async function updateModeButtons(mode) {
    const modes = document.getElementById('reformulationModes');
    modes.style.display = await canSummarize() && await canChatAnywhere() ? 'flex' : 'none';
    for (const button of modes.querySelectorAll('button')) {
        button.classList.toggle('active', button.dataset.mode === mode);
    }
}

// null si le navigateur n'a pas WebGPU (ou pas de carte graphique utilisable)
function getWebGpuAdapter() {
    webgpuAdapter ??= 'gpu' in navigator ? navigator.gpu.requestAdapter().catch(() => null) : Promise.resolve(null);

    return webgpuAdapter;
}

async function canChatAnywhere() {
    return await canChat() || !!(await getWebGpuAdapter());
}

async function isModelAvailable(key) {
    return key === 'gemini' ? canChat() : !!(await getWebGpuAdapter());
}

// Modèle choisi par l'étudiant s'il est utilisable, sinon Gemini Nano, sinon Gemma ; null si aucun
async function getAiModel() {
    let saved = null;
    try {
        saved = localStorage.getItem(MODEL_STORAGE_KEY);
    } catch (error) {
        // stockage indisponible : modèle par défaut
    }

    for (const key of [saved, 'gemini', 'gemma']) {
        if (AI_MODELS[key] && await isModelAvailable(key)) {
            return key;
        }
    }

    return null;
}

function saveAiModel(key) {
    try {
        localStorage.setItem(MODEL_STORAGE_KEY, key);
    } catch (error) {
        // tant pis, le choix ne sera pas mémorisé
    }
}

async function updateModelSelect() {
    const select = document.getElementById('modelSelect');
    for (const option of select.options) {
        option.disabled = !await isModelAvailable(option.value);
    }
    select.value = await getAiModel();
    await updateDeleteButton();
}

// Variantes (f16 / f32) d'un modèle WebLLM présentes dans le cache du navigateur
async function cachedVariants(key) {
    const choice = AI_MODELS[key];
    if (!choice?.f16 || !await getWebGpuAdapter()) {
        return [];
    }

    webllm ??= await import(WEBLLM_URL);
    const variants = [];
    for (const model of [choice.f16, choice.f32]) {
        if (await webllm.hasModelInCache(model)) {
            variants.push(model);
        }
    }

    return variants;
}

// La poubelle ne sert que pour un modèle WebLLM déjà téléchargé (Gemini Nano est géré par Chrome)
async function updateDeleteButton() {
    const key = document.getElementById('modelSelect').value;
    const button = document.getElementById('modelDelete');

    if (key === 'gemini') {
        button.disabled = true;
        button.title = "Gemini Nano est géré par Chrome : il ne peut pas être supprimé depuis cette page.";
        return;
    }

    const cached = (await cachedVariants(key)).length > 0;
    button.disabled = !cached;
    button.title = cached ? `Supprimer le modèle ${AI_MODELS[key].label} téléchargé` : "Ce modèle n'est pas téléchargé.";
}

async function deleteSelectedModel() {
    const key = document.getElementById('modelSelect').value;
    const choice = AI_MODELS[key];
    const variants = await cachedVariants(key);
    if (variants.length === 0 || busy) {
        return;
    }

    if (!confirm(`Supprimer le modèle ${choice.label} (${choice.size}) du cache du navigateur ? Il faudra le télécharger à nouveau pour l'utiliser.`)) {
        return;
    }

    // Le modèle doit d'abord quitter la mémoire (attente d'un éventuel chargement en cours)
    await (webllmLoading || Promise.resolve()).catch(() => null);
    if (webllmEngine && variants.includes(webllmModel)) {
        if (chat?.session) {
            chat.session.destroy();
            chat.session = null;
        }
        await webllmEngine.unload();
        webllmModel = null;
    }

    for (const model of variants) {
        await webllm.deleteModelAllInfoInCache(model);
    }

    // Retour sur Gemini Nano s'il est disponible, sinon le modèle sera retéléchargé à la prochaine question
    if (await canChat()) {
        saveAiModel('gemini');
        await updateModelSelect();
        if (chat) {
            addMessage('info', `Modèle ${choice.label} supprimé. Retour sur Gemini Nano : la conversation repart de zéro.`);
            await createConversationSession(chat);
        }
    } else {
        await updateDeleteButton();
        if (chat) {
            addMessage('info', `Modèle ${choice.label} supprimé. Il vous sera proposé de le télécharger à la prochaine question.`);
        }
    }
}

// Charge un modèle WebLLM (après accord de l'étudiant s'il n'est pas encore en cache), null si refusé.
// Un seul modèle en mémoire : changer de modèle remplace le précédent dans le moteur.
function loadWebLLM(key, onProgress) {
    const choice = AI_MODELS[key];
    const previous = webllmLoading || Promise.resolve();

    webllmLoading = previous.catch(() => null).then(async () => {
        webllm ??= await import(WEBLLM_URL);
        const adapter = await getWebGpuAdapter();
        const model = adapter.features.has('shader-f16') ? choice.f16 : choice.f32;

        if (webllmEngine && webllmModel === model) {
            return webllmEngine;
        }

        if (!await webllm.hasModelInCache(model)) {
            const accepted = confirm(`Voulez-vous télécharger le modèle ${choice.label} (${choice.size}, une seule fois. Le modèle sera stocké dans le cache du navigateur.) ?`);
            if (!accepted) {
                return null;
            }
        }

        const initProgressCallback = (report) => onProgress(`Chargement du modèle ${choice.label}... ${Math.round(report.progress * 100)}%`);
        webllmModel = null;
        if (webllmEngine) {
            webllmEngine.setInitProgressCallback(initProgressCallback);
            await webllmEngine.reload(model);
        } else {
            webllmEngine = await webllm.CreateMLCEngine(model, { initProgressCallback });
        }
        webllmModel = model;

        return webllmEngine;
    });

    return webllmLoading;
}

// Session Gemini Nano (Prompt API) ou WebLLM selon le modèle, null si l'étudiant refuse le téléchargement
async function createAiSession(key, initialPrompts, onProgress) {
    if (!key) {
        return null;
    }

    if (key === 'gemini') {
        return LanguageModel.create({
            ...languageOptions,
            initialPrompts,
            monitor: m => m.addEventListener('downloadprogress', (e) => onProgress(`Chargement du modèle Gemini Nano... ${Math.round(e.loaded * 100)}%`)),
        });
    }

    const engine = await loadWebLLM(key, onProgress);

    return engine && createWebLLMSession(engine, AI_MODELS[key], initialPrompts);
}

// Approximation (WebLLM n'expose pas de compteur) : ~3 caractères par token en français
function estimateTokens(text) {
    return Math.ceil(text.length / 3);
}

// Session WebLLM qui imite celle de la Prompt API : promptStreaming(), mesure du contexte, destroy()
function createWebLLMSession(engine, choice, initialPrompts) {
    const [system, ...history] = initialPrompts;
    const messages = history.map(message => ({ ...message }));
    let instructions = system.content;
    let generating = false;

    // Modèle sans rôle « system » (Gemma) : les consignes sont placées en tête du premier message
    if (choice.systemRole) {
        messages.unshift({ role: "system", content: instructions });
        instructions = null;
    } else if (messages.length > 0) {
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
                const chunks = await engine.chat.completions.create({ messages, stream: true, temperature: 0.3, ...choice.options });
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

// Crée un résumeur (Summarizer API) ou une session (Prompt API ou WebLLM) selon le mode,
// avec repli sur l'autre mode s'il est le seul possible ; null si aucun modèle n'est utilisable
async function createModel(closestParagraph, mode) {
    if (mode === 'summarizer' && await canSummarize()) {
        return getSummarizer();
    }

    const key = await getAiModel();
    if (key) {
        showAnswer("Chargement du modèle en cours...");
        const content = systemPrompt.replace("<<contexte>>", closestParagraph).replace("<<titre>>", document.title);

        return createAiSession(key, [{ role: "system", content }], text => showAnswer(text));
    }

    if (await canSummarize()) {
        return getSummarizer();
    }

    return null;
}

async function getAnswer(text, closestParagraph) {
    exitChat();
    const id = ++requestId;
    lastRequest = { text, closestParagraph };
    const mode = await getReformulationMode();
    await updateModeButtons(mode);

    let model;
    try {
        model = await createModel(closestParagraph, mode);
    } catch (error) {
        console.error(error);
        showAnswer("Le modèle d'IA n'a pas pu être chargé dans ce navigateur.");
        stopAnimationAnswer();
        return;
    }

    // Une autre reformulation a été demandée entre-temps (changement de mode, nouvelle sélection)
    if (id !== requestId) {
        if (model && model !== summarizer) {
            model.destroy();
        }
        return;
    }

    if (!model) {
        const message = await getWebGpuAdapter() ? "Téléchargement du modèle annulé." : "Aucun modèle d'IA local n'est disponible dans ce navigateur.";
        showAnswer(await canSummarize() ? `${message} Vous pouvez choisir « Résumé Chrome ».` : message);
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
            if (id !== requestId) {
                return; // remplacée par une reformulation plus récente
            }
            reply += chunk;
            document.querySelector('#answerContent').innerHTML = md.render(reply);
        }

        if (await canChatAnywhere()) {
            chat = { session: null, selection: text, summary: reply, lastContext: null };
            document.getElementById('chatStart').style.display = 'block';
        }
    } catch (error) {
        console.error(error);
        if (id === requestId) {
            document.querySelector('#answerContent').innerHTML = "La reformulation a échoué, réessayez avec une sélection plus courte.";
        }
    } finally {
        // Retrait de la sélection et de l'animation de couleur
        if (id === requestId) {
            stopAnimationAnswer();
        }
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

// Session avec le modèle choisi (null si l'étudiant refuse le téléchargement)
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

    const key = await getAiModel();
    conversation.maxContextChars = key === 'gemini' ? GEMINI_CONTEXT_CHARS : WEBLLM_CONTEXT_CHARS;

    return createAiSession(key, [{ role: "system", content }, ...initialPrompts], onProgress);
}

// Les noms ont changé entre les versions de Chrome (inputQuota → contextWindow, etc.)
async function remainingTokensAfter(session, prompt) {
    const measure = session.measureContextUsage ? session.measureContextUsage(prompt) : session.measureInputUsage(prompt);
    const quota = session.contextWindow ?? session.inputQuota;
    const used = session.contextUsage ?? session.inputUsage;

    return quota - used - await measure;
}

function escapeHtml(text) {
    return text.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);
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
    // Panneau ancré à droite : sur grand écran, le contenu de la page se décale pour rester lisible
    document.documentElement.classList.add('reformulation-docked');
    document.querySelector('.answer > h3').textContent = chat.selection ? 'Échanger sur le sujet' : 'Échanger sur la page';

    // Chat ouvert depuis une reformulation : le passage sélectionné et sa reformulation ouvrent la discussion
    if (chat.selection) {
        document.querySelector('#answerContent').innerHTML = `
            <blockquote class="chatSelection"><p class="chatSelectionTitle">Passage sélectionné</p><p>${escapeHtml(chat.selection)}</p></blockquote>
            <div class="chatMessage assistant">${md.render(chat.summary)}</div>`;
    }

    updateModelSelect();
    updateChatContextLabel();
    document.getElementById('chatInput').focus();

    if (createNow) {
        await createConversationSession(chat);
    }
}

// Crée la session de la conversation (au démarrage du chat ou après un changement de modèle)
async function createConversationSession(conversation) {
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

// Nouveau modèle choisi : la conversation repart de zéro (la sélection et sa reformulation sont gardées)
async function changeChatModel(key) {
    saveAiModel(key);
    if (!chat || busy) {
        return;
    }

    chat.session?.destroy();
    chat.session = null;
    addMessage('info', `Modèle : ${AI_MODELS[key].label}. La conversation repart de zéro.`);
    await createConversationSession(chat);
    await updateDeleteButton(); // le modèle vient peut-être d'être téléchargé
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
    document.documentElement.classList.remove('reformulation-docked');
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
    addMessage('user', md.renderInline(escapeHtml(question)));
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

        <div id="reformulationModes" role="group" aria-label="Type de reformulation">
            <button type="button" data-mode="prompt">Reformulation IA</button>
            <button type="button" data-mode="summarizer">Résumé Chrome</button>
        </div>

        <div id="chatThread">
            <div id="answerContent"></div>
            <div id="chatMessages"></div>
        </div>

        <button id="chatStart" type="button">💬 Échanger sur le sujet</button>

        <form id="chatForm">
            <div id="modelChoice">
                <label for="modelSelect">Modèle</label>
                <select id="modelSelect">
                    ${Object.entries(AI_MODELS).map(([key, model]) => `<option value="${key}">${model.label}${model.size ? ` (${model.size})` : ''}</option>`).join('')}
                </select>
                <button type="button" id="modelDelete" aria-label="Supprimer le modèle téléchargé" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z"/></svg>
                </button>
            </div>
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
    document.getElementById('modelSelect').addEventListener('change', function () {
        updateDeleteButton();
        changeChatModel(this.value);
    });
    document.getElementById('modelDelete').addEventListener('click', deleteSelectedModel);

    // Changement de mode : on rejoue la dernière sélection avec l'autre modèle
    for (const button of document.querySelectorAll('#reformulationModes button')) {
        button.addEventListener('click', function () {
            saveReformulationMode(this.dataset.mode);
            if (lastRequest) {
                getAnswer(lastRequest.text, lastRequest.closestParagraph);
            }
        });
    }

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
