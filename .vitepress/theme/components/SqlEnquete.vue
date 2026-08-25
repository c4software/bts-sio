<template>
  <div class="enquete">
    <div class="picker">
      <label>
        Histoire :
        <select v-model="selected" :disabled="loading">
          <option v-for="h in histoires" :key="h.id" :value="h.id">{{ h.titre }} ({{ h.date }})</option>
        </select>
      </label>
      <a v-if="histoire" :href="dbUrl(histoire)" :download="histoire.fichier" class="download">
        Télécharger la base (.sqlite)
      </a>
    </div>

    <div v-if="histoire" class="brief">
      <p><strong>{{ histoire.titre }}</strong></p>
      <p>{{ histoire.brief }}</p>
      <p class="hint">
        Point de départ : la table <code>rapport_police</code>, type <code>{{ histoire.type }}</code>,
        ville <code>SQL Ville</code>, date <code>{{ histoire.date_sql }}</code>.
        <button class="link" @click="depart">Insérer la requête de départ</button>
      </p>
    </div>

    <div v-if="histoire" class="journal">
      <strong>Journal de bord</strong>
      <span v-for="(e, i) in histoire.empreintes" :key="i" class="etape" :class="{ ok: progres[i] }">
        {{ progres[i] ? '✔ ' + progres[i] : 'Étape ' + (i + 1) + ' : ?' }}
      </span>
      <span v-if="termine" class="fin">Enquête résolue 🎉</span>
    </div>

    <details class="schema" v-if="schema.length">
      <summary>Schéma de la base ({{ schema.length }} tables)</summary>
      <ul>
        <li v-for="t in schema" :key="t.name">
          <code>{{ t.name }}</code> : {{ t.columns.join(', ') }}
        </li>
      </ul>
    </details>

    <details class="schema">
      <summary>Aide-mémoire : traduire un indice en SQL</summary>
      <table class="memo">
        <thead><tr><th>L'indice dit…</th><th>Table</th><th>Condition</th></tr></thead>
        <tbody>
          <tr><td>la dernière maison / le plus petit numéro de la rue X</td><td><code>personne</code></td><td><code>WHERE nom_rue = 'X' ORDER BY numero_rue DESC LIMIT 1</code> (ou <code>ASC</code>)</td></tr>
          <tr><td>prénommé Lucas, rue X</td><td><code>personne</code></td><td><code>nom LIKE 'Lucas %' AND nom_rue = 'X'</code></td></tr>
          <tr><td>le revenu le plus élevé de la rue X</td><td><code>personne</code> + <code>revenu</code></td><td><code>JOIN revenu r ON r.nir = p.nir … ORDER BY r.revenu_annuel DESC LIMIT 1</code></td></tr>
          <tr><td>ce que dit un témoin</td><td><code>interrogatoire</code></td><td><code>JOIN interrogatoire i ON i.personne_id = p.id</code></td></tr>
          <tr><td>cheveux roux, entre 165 et 168 cm, 40 à 45 ans</td><td><code>permis_conduire</code></td><td><code>pc.couleur_cheveux = 'roux' AND pc.taille BETWEEN 165 AND 168</code></td></tr>
          <tr><td>plaque qui commence par / finit par / contient ABC</td><td><code>permis_conduire</code></td><td><code>pc.immatriculation LIKE 'ABC%'</code> / <code>'%ABC'</code> / <code>'%ABC%'</code></td></tr>
          <tr><td>membre « or », numéro qui commence par 48Z</td><td><code>salle_sport_membre</code></td><td><code>m.statut_abonnement = 'or' AND m.id LIKE '48Z%'</code></td></tr>
          <tr><td>passé à la salle le 9 janvier 2018 entre 18h et 19h</td><td><code>salle_sport_passage</code></td><td><code>s.date_passage = 20180109 AND s.heure_entree BETWEEN 1800 AND 1900</code></td></tr>
          <tr><td>allé 3 fois au concert X en décembre 2017</td><td><code>evenement_participation</code></td><td><code>e.nom_evenement = 'X' AND e.date BETWEEN 20171201 AND 20171231 GROUP BY p.id HAVING COUNT(*) = 3</code></td></tr>
          <tr><td>gagne plus de 200 000 € par an</td><td><code>revenu</code></td><td><code>r.revenu_annuel > 200000</code></td></tr>
        </tbody>
      </table>
    </details>

    <div class="editor">
      <textarea
        v-model="sql"
        spellcheck="false"
        rows="6"
        placeholder="SELECT * FROM rapport_police WHERE ville = 'SQL Ville' AND type = '…' AND date = …;"
        @keydown.ctrl.enter.prevent="run"
        @keydown.meta.enter.prevent="run"
      ></textarea>
      <div class="actions">
        <button @click="run" :disabled="!db || loading">Exécuter (Ctrl + Entrée)</button>
        <button @click="reset" :disabled="loading" class="secondary">Réinitialiser la base</button>
        <span class="status">{{ status }}</span>
      </div>
    </div>


    <div v-if="error" class="error">{{ error }}</div>

    <div v-for="(r, i) in results" :key="i" class="result">
      <p class="count">{{ r.values.length }} ligne{{ r.values.length > 1 ? 's' : '' }}<span v-if="r.truncated"> (affichage limité à {{ MAX_ROWS }})</span></p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th v-for="c in r.columns" :key="c">{{ c }}</th></tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in r.values" :key="ri">
              <td v-for="(v, ci) in row" :key="ci">{{ v === null ? 'NULL' : v }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p v-if="db && !results.length && !error && ran" class="count">La requête n'a renvoyé aucune ligne.</p>
    <div v-if="verdict" class="verdict" :class="verdict.ok ? 'ok' : 'ko'">
      <p>{{ verdict.texte }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const BASE = '/sqlite/enquete/'
const SQLJS = '/sqlite/sqljs/'
const MAX_ROWS = 200
const STORAGE_KEY = 'sql-enquete'

const histoires = ref([])
const selected = ref('')
const histoire = computed(() => histoires.value.find((h) => h.id === selected.value))
const sql = ref('')
const results = ref([])
const error = ref('')
const status = ref('')
const loading = ref(false)
const ran = ref(false)
const schema = ref([])
const verdict = ref(null)
const progres = ref([])
const termine = computed(() => histoire.value && progres.value.length && progres.value.every(Boolean))
let SQL = null
let db = ref(null)

function dbUrl(h) {
  return BASE + h.fichier
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (window.initSqlJs) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.onload = resolve
    s.onerror = () => reject(new Error('Impossible de charger sql.js'))
    document.head.appendChild(s)
  })
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected: selected.value, sql: sql.value }))
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

async function sha256(texte) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texte))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}


async function loadDb() {
  if (!histoire.value) return
  loading.value = true
  error.value = ''
  results.value = []
  ran.value = false
  status.value = 'Chargement de la base…'
  try {
    if (!SQL) {
      await loadScript(SQLJS + 'sql-wasm.js')
      SQL = await window.initSqlJs({ locateFile: (f) => SQLJS + f })
    }
    const buf = await fetch(dbUrl(histoire.value)).then((r) => {
      if (!r.ok) throw new Error('Base introuvable : ' + r.status)
      return r.arrayBuffer()
    })
    if (db.value) db.value.close()
    db.value = new SQL.Database(new Uint8Array(buf))
    const tables = db.value.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    schema.value = tables.length
      ? tables[0].values.map(([name]) => ({
          name,
          columns: db.value.exec(`PRAGMA table_info(${name})`)[0].values.map((c) => c[1]),
        }))
      : []
    status.value = 'Base chargée, à vous de jouer.'
  } catch (e) {
    error.value = e.message
    status.value = ''
  } finally {
    loading.value = false
  }
}

function run() {
  if (!db.value || !sql.value.trim()) return
  error.value = ''
  results.value = []
  ran.value = true
  saveState()
  try {
    const out = db.value.exec(sql.value)
    results.value = out.map((r) => ({
      columns: r.columns,
      values: r.values.slice(0, MAX_ROWS),
      truncated: r.values.length > MAX_ROWS,
    }))
    status.value = ''
    verifierAccusation()
  } catch (e) {
    error.value = e.message
  }
}

// Le cœur du jeu : l'INSERT dans solution. On repère le nom accusé pour tenir le journal de bord.
async function verifierAccusation() {
  const m = sql.value.match(/INSERT\s+INTO\s+solution\s+VALUES\s*\(\s*1\s*,\s*'((?:[^']|'')*)'\s*\)/i)
  if (!m || !histoire.value) return
  const nom = m[1].replace(/''/g, "'").trim()
  const h = await sha256(nom.toLowerCase())
  const idx = histoire.value.empreintes.indexOf(h)
  const out = db.value.exec('SELECT valeur FROM solution')
  const texte = out.length ? out[0].values[0][0] : ''
  if (idx >= 0) {
    progres.value[idx] = nom
    saveProgres()
  }
  verdict.value = { texte, ok: idx >= 0 }
}

function reset() {
  loadDb()
}

function depart() {
  const h = histoire.value
  sql.value = `SELECT * FROM rapport_police\nWHERE ville = 'SQL Ville' AND type = '${h.type}' AND date = ${h.date_sql};`
  run()
}

watch(selected, () => {
  saveState()
  verdict.value = null
  loadProgres()
  loadDb()
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
  if (saved && saved.sql) sql.value = saved.sql
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
.table-wrap {
  overflow-x: auto;
  max-height: 24rem;
  overflow-y: auto;
}
.result table {
  font-size: 0.85em;
  margin: 0;
}
.result th,
.result td {
  white-space: nowrap;
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
