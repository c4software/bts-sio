<template>
  <div class="enquete">
    <div class="picker">
      <label>
        Histoire :
        <select v-model="selected" :disabled="loading">
          <option v-for="h in histoires" :key="h.id" :value="h.id">{{ h.titre }} ({{ h.date }}){{ h.mode === 'poo' ? ' · POO' : '' }}</option>
        </select>
      </label>
      <a v-if="histoire" :href="dataUrl(histoire)" :download="histoire.fichier" class="download">
        Télécharger les données (.php)
      </a>
    </div>

    <div v-if="histoire" class="brief">
      <p><strong>{{ histoire.titre }}</strong></p>
      <p>{{ histoire.brief }}</p>
      <p class="hint">
        Point de départ : {{ mode === 'poo' ? 'le rapport de police, renvoyé par' : 'le rapport de police, dans' }}
        <code>{{ mode === 'poo' ? '$ville->rapport()' : '$rapport' }}</code>.
        Quand vous tenez un nom : <code>verifier("Prénom Nom");</code>
        <button class="link" @click="depart">Insérer le code de départ</button>
      </p>
    </div>

    <div v-if="histoire" class="journal">
      <strong>Journal de bord</strong>
      <span v-for="(e, i) in histoire.empreintes" :key="i" class="etape" :class="{ ok: progres[i] }">
        {{ progres[i] ? '✔ ' + progres[i] : 'Étape ' + (i + 1) + ' : ?' }}
      </span>
      <span v-if="termine" class="fin">Enquête résolue 🎉</span>
    </div>

    <details class="schema" v-if="mode === 'poo'">
      <summary>Les classes fournies</summary>
      <ul>
        <li><code>Habitant</code> : propriétés <code>id</code>, <code>nom</code>, <code>genre</code>, <code>age</code>, <code>taille</code>, <code>cheveux</code>, <code>rue</code>, <code>numero</code>, <code>revenu</code> ; méthodes <code>prenom()</code>, <code>habite(string $rue)</code></li>
        <li><code>Vehicule</code> : <code>habitantId</code>, <code>marque</code>, <code>modele</code>, <code>plaque</code> ; méthode <code>appartientA(Habitant $h)</code></li>
        <li><code>Passage</code> : <code>habitantId</code>, <code>lieu</code>, <code>date</code> (AAAAMMJJ), <code>heure</code> (HHMM) ; méthode <code>estA(string $lieu)</code></li>
        <li><code>Ville</code> : <code>rapport()</code>, <code>habitants()</code>, <code>vehiculeDe(Habitant $h): ?Vehicule</code>, <code>temoignageDe(Habitant $h): ?string</code>, <code>passagesDe(Habitant $h): array</code></li>
        <li><code>Critere</code> (interface) : <code>accepte(Habitant $h): bool</code>, à combiner avec <code>filtrer($ville, ...$criteres)</code></li>
        <li>La variable <code>$ville</code> est déjà créée pour vous.</li>
      </ul>
    </details>
    <details class="schema" v-else>
      <summary>Les données (4 tableaux)</summary>
      <ul>
        <li><code>$habitants</code> : <code>id</code>, <code>nom</code>, <code>genre</code>, <code>age</code>, <code>taille</code>, <code>cheveux</code>, <code>rue</code>, <code>numero</code>, <code>revenu</code></li>
        <li><code>$vehicules</code> : <code>habitant_id</code>, <code>marque</code>, <code>modele</code>, <code>plaque</code></li>
        <li><code>$temoignages</code> : <code>habitant_id</code>, <code>texte</code></li>
        <li><code>$passages</code> : <code>habitant_id</code>, <code>lieu</code>, <code>date</code> (AAAAMMJJ), <code>heure</code> (HHMM)</li>
        <li>Et la variable <code>$rapport</code> (le rapport de police).</li>
      </ul>
    </details>

    <details class="schema">
      <summary>Aide-mémoire : traduire un indice en PHP</summary>
      <table class="memo" v-if="mode === 'poo'">
        <thead><tr><th>L'indice dit…</th><th>Le code</th></tr></thead>
        <tbody>
          <tr><td>la dernière maison / le plus petit numéro de la rue X</td><td>parcourez <code>$ville->habitants()</code>, gardez l'habitant au <code>numero</code> le plus grand (ou le plus petit) de la rue</td></tr>
          <tr><td>ce que dit un témoin</td><td><code>$ville->temoignageDe($temoin)</code></td></tr>
          <tr><td>cheveux roux, entre 40 et 45 ans</td><td><code>$h->cheveux === "roux" && $h->age >= 40 && $h->age <= 45</code></td></tr>
          <tr><td>conduit une Tesla, plaque qui contient ABC</td><td><code>$v = $ville->vehiculeDe($h);</code> puis <code>$v !== null && $v->marque === "Tesla" && str_contains($v->plaque, "ABC")</code></td></tr>
          <tr><td>passé 3 fois à « X » en janvier 2025</td><td>comptez dans <code>$ville->passagesDe($h)</code> les passages avec <code>$p->lieu === "X" && intdiv($p->date, 100) === 202501</code></td></tr>
          <tr><td>combiner des critères (niveau 3)</td><td><code>filtrer($ville, new MonCritere(...), new AutreCritere(...))</code></td></tr>
        </tbody>
      </table>
      <table class="memo" v-else>
        <thead><tr><th>L'indice dit…</th><th>Le code</th></tr></thead>
        <tbody>
          <tr><td>la dernière maison / le plus petit numéro de la rue X</td><td>parcourez <code>$habitants</code>, gardez l'habitant au <code>numero</code> le plus grand (ou le plus petit) de la rue</td></tr>
          <tr><td>prénommé Lucas, rue X</td><td><code>$h["rue"] === "X" && str_starts_with($h["nom"], "Lucas ")</code></td></tr>
          <tr><td>ce que dit un témoin</td><td>parcourez <code>$temoignages</code> : <code>$t["habitant_id"] === $temoin["id"]</code></td></tr>
          <tr><td>cheveux roux, entre 40 et 45 ans</td><td><code>$h["cheveux"] === "roux" && $h["age"] >= 40 && $h["age"] <= 45</code></td></tr>
          <tr><td>plaque qui commence par / finit par / contient ABC</td><td><code>str_starts_with($v["plaque"], "ABC")</code> / <code>str_ends_with(…)</code> / <code>str_contains(…)</code>, en reliant <code>$v["habitant_id"]</code> à <code>$h["id"]</code></td></tr>
          <tr><td>passé 3 fois à « X » en mai 2024</td><td>un tableau compteur : <code>$compteur[$p["habitant_id"]] = ($compteur[$p["habitant_id"]] ?? 0) + 1;</code> puis <code>($compteur[$h["id"]] ?? 0) === 3</code></td></tr>
          <tr><td>entre 19h et 20h</td><td><code>$p["heure"] >= 1900 && $p["heure"] <= 2000</code></td></tr>
          <tr><td>gagne plus de 200 000 € par an</td><td><code>$h["revenu"] > 200000</code></td></tr>
        </tbody>
      </table>
    </details>

    <div class="editor">
      <textarea
        v-model="code"
        spellcheck="false"
        rows="12"
        :placeholder="mode === 'poo' ? '<?php\n\necho $ville->rapport();' : '<?php\n\necho $rapport;'"
        @keydown.ctrl.enter.prevent="run"
        @keydown.meta.enter.prevent="run"
      ></textarea>
      <div class="actions">
        <button @click="run" :disabled="loading || running || !histoire">Exécuter (Ctrl + Entrée)</button>
        <button @click="depart" :disabled="loading || running" class="secondary">Réinitialiser le code</button>
        <span class="status">{{ status }}</span>
      </div>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="sortie !== null" class="result">
      <p class="count">Sortie du programme<span v-if="tronquee"> (affichage limité à {{ MAX_LINES }} lignes)</span> :</p>
      <pre class="sortie">{{ sortie || '(aucune sortie : avez-vous pensé à echo ?)' }}</pre>
    </div>
    <div v-if="verdict" class="verdict" :class="verdict.ok ? 'ok' : 'ko'">
      <p>{{ verdict.texte }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const BASE = '/enquete-algo/'
// php-wasm (PHP compilé en WebAssembly), chargé au premier « Exécuter ».
// Version épinglée : le loader résout son .wasm (~13 Mo, mis en cache par le navigateur) tout seul.
// Source principale : le CDN jsDelivr. Repli : la copie embarquée dans public/php-wasm/0.1.0/
// (sous-ensemble du paquet npm php-wasm@0.1.0 limité à PHP 8.3 web), utilisée si le CDN est
// injoignable (réseau filtré, panne) ou trop lent.
const PHP_WASM_URLS = [
  'https://cdn.jsdelivr.net/npm/php-wasm@0.1.0/PhpWeb.mjs',
  '/php-wasm/0.1.0/PhpWeb.mjs',
]
const PHP_WASM_TIMEOUT = 60000
const PHP_VERSION = '8.3'
const MAX_LINES = 200
const STORAGE_KEY = 'algo-enquete'
const MARQUEUR = /^\[\[ENQUETE:([0-9a-f]+|KO)\]\]$/

const histoires = ref([])
const selected = ref('')
const histoire = computed(() => histoires.value.find((h) => h.id === selected.value))
// le mode (procédural ou POO) est porté par chaque histoire : il pilote le code de départ,
// l'aide-mémoire et la description des données
const mode = computed(() => (histoire.value && histoire.value.mode) || 'procedural')
const code = ref('')
const sortie = ref(null)
const tronquee = ref(false)
const error = ref('')
const status = ref('')
const loading = ref(false)
const running = ref(false)
const verdict = ref(null)
const progres = ref([])
const termine = computed(() => histoire.value && progres.value.length && progres.value.every(Boolean))
let php = null
let donnees = ''
let stdout = ''
let stderr = ''

function dataUrl(h) {
  return BASE + h.fichier
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected: selected.value }))
    localStorage.setItem(STORAGE_KEY + ':code:' + selected.value, code.value)
  } catch (e) {}
}

function loadProgres() {
  progres.value = histoire.value ? histoire.value.empreintes.map(() => null) : []
  try {
    const p = JSON.parse(localStorage.getItem(STORAGE_KEY + ':' + selected.value) || 'null')
    if (Array.isArray(p) && p.length === progres.value.length) progres.value = p
  } catch (e) {}
}

function saveProgres() {
  try {
    localStorage.setItem(STORAGE_KEY + ':' + selected.value, JSON.stringify(progres.value))
  } catch (e) {}
}

async function loadDonnees() {
  if (!histoire.value) return
  loading.value = true
  error.value = ''
  sortie.value = null
  status.value = 'Chargement des données…'
  try {
    donnees = await fetch(dataUrl(histoire.value)).then((r) => {
      if (!r.ok) throw new Error('Données introuvables : ' + r.status)
      return r.text()
    })
    status.value = 'Données chargées, à vous de jouer.'
  } catch (e) {
    error.value = e.message
    status.value = ''
  } finally {
    loading.value = false
  }
}

// Essaie chaque source dans l'ordre (CDN puis copie locale). On passe à la suivante si
// l'import échoue, dépasse le délai, ou si le module chargé n'est pas exploitable (CDN qui
// a changé, export manquant, wasm qui ne démarre pas) : on attend que PHP soit réellement prêt.
function avecDelai(promesse, ms) {
  return Promise.race([
    promesse,
    new Promise((_, reject) => setTimeout(() => reject(new Error('délai dépassé')), ms)),
  ])
}

async function importPhpWeb() {
  let lastError = null
  for (const url of PHP_WASM_URLS) {
    try {
      const mod = await avecDelai(import(/* @vite-ignore */ url), PHP_WASM_TIMEOUT)
      if (!mod || typeof mod.PhpWeb !== 'function') throw new Error('module inattendu (export PhpWeb absent)')
      const instance = new mod.PhpWeb({ version: PHP_VERSION })
      // `binary` est résolue quand le .wasm est téléchargé et instancié
      await avecDelai(instance.binary, PHP_WASM_TIMEOUT * 2)
      return instance
    } catch (e) {
      lastError = e
      console.warn('php-wasm : échec du chargement depuis ' + url + ', essai de la source suivante', e)
      status.value = 'CDN indisponible, chargement de PHP depuis le site…'
    }
  }
  throw new Error('Impossible de charger PHP : ' + (lastError && lastError.message))
}

async function loadPhp() {
  if (php) return
  status.value = 'Chargement de PHP (environ 13 Mo, une seule fois)…'
  php = await importPhpWeb()
  php.addEventListener('output', (e) => { stdout += e.detail })
  php.addEventListener('error', (e) => { stderr += e.detail })
}

async function run() {
  if (!histoire.value || running.value) return
  running.value = true
  error.value = ''
  verdict.value = null
  saveState()
  try {
    await loadPhp()
    status.value = 'Exécution…'
    stdout = ''
    stderr = ''
    await php.refresh()
    // Les données (et verifier()) d'abord, le code de l'étudiant ensuite : exactement comme
    // un fichier donnees.php suivi d'un require en local.
    await php.run(donnees + '\n?>\n' + code.value)
    traiterSortie()
    status.value = ''
  } catch (e) {
    error.value = 'PHP n\'a pas pu être chargé ou exécuté : ' + e.message
    status.value = ''
    php = null
  } finally {
    running.value = false
  }
}

// verifier() imprime un marqueur [[ENQUETE:<empreinte sha-256>]] : on coche le journal de bord
// en le comparant aux empreintes d'index.json, et on retire ces lignes de l'affichage.
function traiterSortie() {
  const lignes = stdout.split('\n')
  const affichees = []
  let dernierVerdict = null
  for (let i = 0; i < lignes.length; i++) {
    const m = lignes[i].match(MARQUEUR)
    if (!m) {
      affichees.push(lignes[i])
      continue
    }
    const texte = (lignes[i + 1] || '').trim()
    i++
    if (m[1] === 'KO') {
      dernierVerdict = { texte, ok: false }
      continue
    }
    const idx = histoire.value.empreintes.indexOf(m[1])
    if (idx >= 0) {
      progres.value[idx] = 'Étape ' + (idx + 1)
      saveProgres()
    }
    dernierVerdict = { texte, ok: idx >= 0 }
  }
  verdict.value = dernierVerdict
  tronquee.value = affichees.length > MAX_LINES
  sortie.value = affichees.slice(0, MAX_LINES).join('\n').replace(/\n+$/, '')
  if (stderr.trim()) error.value = stderr.trim()
}

function depart() {
  code.value = mode.value === 'poo'
    ? '<?php\n\necho $ville->rapport();\n'
    : '<?php\n\necho $rapport;\n'
}

watch(selected, (nouveau, ancien) => {
  // Le code de l'histoire quittée est sauvegardé sous SA clé, avant de charger celui de la nouvelle.
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected: nouveau }))
    if (ancien) localStorage.setItem(STORAGE_KEY + ':code:' + ancien, code.value)
  } catch (e) {}
  verdict.value = null
  sortie.value = null
  error.value = ''
  loadProgres()
  let saved = null
  try {
    saved = localStorage.getItem(STORAGE_KEY + ':code:' + selected.value)
  } catch (e) {}
  code.value = saved || ''
  loadDonnees()
})

onMounted(async () => {
  try {
    histoires.value = await fetch(BASE + 'index.json').then((r) => r.json())
  } catch (e) {
    error.value = 'Impossible de charger la liste des histoires.'
    return
  }
  let saved = null
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch (e) {}
  if (saved && histoires.value.some((h) => h.id === saved.selected)) {
    selected.value = saved.selected
  } else if (histoires.value.length) {
    selected.value = histoires.value[0].id
  }
})
</script>

<style scoped>
.enquete {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  background: var(--vp-c-bg-soft);
}
.picker {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}
.picker select {
  margin-left: 0.5rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.brief {
  margin-top: 1rem;
}
.brief p {
  margin: 0.3rem 0;
}
.hint,
.count {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}
.schema {
  margin: 0.8rem 0;
  font-size: 0.9em;
}
.schema summary {
  cursor: pointer;
}
.schema ul {
  margin: 0.5rem 0 0 1rem;
  padding: 0;
}
.editor textarea {
  width: 100%;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  resize: vertical;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.5rem;
}
.actions button {
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
  cursor: pointer;
}
.actions button.secondary {
  background: transparent;
  color: var(--vp-c-brand-1);
}
.actions button:disabled {
  opacity: 0.5;
  cursor: default;
}
.status {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}
.error {
  margin-top: 0.8rem;
  padding: 0.6rem;
  border-radius: 4px;
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.85em;
  white-space: pre-wrap;
}
.result {
  margin-top: 0.8rem;
}
.sortie {
  margin: 0;
  padding: 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 0.85em;
  max-height: 24rem;
  overflow: auto;
  white-space: pre-wrap;
}
.download {
  font-size: 0.9em;
}
.journal {
  margin: 0.8rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.9em;
}
.etape {
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  border: 1px dashed var(--vp-c-divider);
  color: var(--vp-c-text-2);
}
.etape.ok {
  border-style: solid;
  border-color: var(--vp-c-success-1);
  color: var(--vp-c-success-1);
}
.fin {
  font-weight: 600;
  color: var(--vp-c-success-1);
}
.memo {
  font-size: 0.85em;
  margin: 0.5rem 0;
}
.memo td,
.memo th {
  white-space: normal;
}
.verdict {
  margin-top: 0.6rem;
  padding: 0.7rem 0.9rem;
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-danger-1);
  background: var(--vp-c-danger-soft);
}
.verdict.ok {
  border-left-color: var(--vp-c-success-1);
  background: var(--vp-c-success-soft);
}
.verdict p {
  margin: 0.4rem 0 0;
  font-weight: 600;
}
button.link {
  background: none;
  border: none;
  padding: 0;
  margin-left: 0.4rem;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
}
</style>
