<template>
  <div class="sqli" :class="'sqli-' + type">
    <!-- ============================================ NIVEAU 1 : formulaire de login -->
    <template v-if="type === 'login'">
      <p class="intro">
        Un formulaire de connexion, comme il en existe des milliers. Derrière, cette requête
        est construite <strong>en collant</strong> vos saisies :
      </p>
      <div class="mode">
        <label><input type="radio" value="vulnerable" v-model="mode" /> Version vulnérable (concaténation)</label>
        <label><input type="radio" value="prepared" v-model="mode" /> Version corrigée (requête préparée)</label>
      </div>
      <div class="form">
        <label>Identifiant <input v-model="login" spellcheck="false" placeholder="ex. jdupont" /></label>
        <label>Mot de passe <input v-model="motDePasse" spellcheck="false" placeholder="son mot de passe" /></label>
        <button @click="runLogin" :disabled="loading">Se connecter</button>
      </div>
      <div class="exemples" v-if="mode === 'vulnerable'">
        Essayez une injection :
        <button class="link" @click="login = &quot;' OR '1'='1' --&quot;; motDePasse = ''">
          identifiant = <code>' OR '1'='1' --</code>
        </button>
      </div>
    </template>

    <!-- ============================================ NIVEAU 3 : épreuves -->
    <template v-else-if="type === 'defis'">
      <div class="picker">
        <label>
          Épreuve :
          <select v-model="defiId" :disabled="loading">
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
          <label><input type="radio" value="vulnerable" v-model="mode" /> Formulaire vulnérable</label>
          <label><input type="radio" value="prepared" v-model="mode" /> Le même en requête préparée</label>
        </div>
        <div class="form">
          <label v-for="champ in defi.champs" :key="champ.name">
            {{ champ.label }}
            <input v-model="saisies[champ.name]" spellcheck="false" :placeholder="champ.placeholder" />
          </label>
          <button @click="runDefi" :disabled="loading">Envoyer</button>
          <button class="secondary" @click="montrerSolution" :disabled="loading">Coup de pouce</button>
        </div>
      </div>
    </template>

    <!-- ============================================ NIVEAU 2 : bac à sable libre -->
    <template v-else>
      <p class="intro">
        Une base d'exemple (<code>utilisateurs</code>, <code>produits</code>, <code>paiements</code>) sur laquelle
        vous pouvez écrire ce que vous voulez. Rien n'est envoyé sur un serveur, tout tourne dans votre navigateur.
      </p>
      <details class="schema" v-if="schema.length">
        <summary>Schéma de la base ({{ schema.length }} tables)</summary>
        <ul>
          <li v-for="t in schema" :key="t.name"><code>{{ t.name }}</code> : {{ t.columns.join(', ') }}</li>
        </ul>
      </details>
      <div class="editor">
        <textarea
          v-model="sql"
          spellcheck="false"
          rows="5"
          placeholder="SELECT * FROM produits;"
          @keydown.ctrl.enter.prevent="runEditor"
          @keydown.meta.enter.prevent="runEditor"
        ></textarea>
        <div class="actions">
          <button @click="runEditor" :disabled="loading">Exécuter (Ctrl + Entrée)</button>
          <button class="secondary" @click="reinit" :disabled="loading">Réinitialiser la base</button>
          <span class="status">{{ status }}</span>
        </div>
      </div>
    </template>

    <!-- ============================================ affichage commun -->
    <div v-if="requete" class="requete">
      <span class="requete-label">Requête envoyée à la base :</span>
      <pre>{{ requete }}</pre>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="verdict" class="verdict" :class="verdict.ok ? 'ok' : 'ko'">
      <p>{{ verdict.texte }}</p>
    </div>

    <div v-for="(r, i) in results" :key="i" class="result">
      <p class="count">
        {{ r.values.length }} ligne{{ r.values.length > 1 ? 's' : '' }}<span v-if="r.truncated"> (affichage limité à {{ MAX_ROWS }})</span>
      </p>
      <div class="table-wrap">
        <table>
          <thead><tr><th v-for="c in r.columns" :key="c">{{ c }}</th></tr></thead>
          <tbody>
            <tr v-for="(row, ri) in r.values" :key="ri">
              <td v-for="(v, ci) in row" :key="ci">{{ v === null ? 'NULL' : v }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p v-if="ran && !results.length && !error" class="count">La requête n'a renvoyé aucune ligne.</p>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  // 'login' : formulaire vulnérable + bascule préparée ; 'editor' : bac à sable libre ; 'defis' : épreuves
  type: { type: String, default: 'login' },
})

const SQLJS = '/sqlite/sqljs/'
const MAX_ROWS = 200
const STORAGE_KEY = 'sql-injection'

// --- schémas des bases en mémoire (aucun fichier .sqlite : tout est reconstruit à la volée)
const COMPTES = `
CREATE TABLE utilisateurs (id INTEGER PRIMARY KEY, login TEXT, mot_de_passe TEXT, role TEXT);
INSERT INTO utilisateurs VALUES
 (1, 'admin',   'Tr0ub4dour&3', 'admin'),
 (2, 'jdupont', 'azerty123',    'membre'),
 (3, 'mmartin', 'soleil2024',   'membre'),
 (4, 'invite',  'invite',       'invite');
`
const CATALOGUE = `
CREATE TABLE produits (id INTEGER PRIMARY KEY, nom TEXT, prix REAL);
INSERT INTO produits VALUES
 (1, 'Clavier mécanique', 79.90),
 (2, 'Souris sans fil',   24.50),
 (3, 'Écran 27 pouces',  199.00),
 (4, 'Casque audio',      59.00);
`
const PAIEMENTS = `
CREATE TABLE paiements (id INTEGER PRIMARY KEY, utilisateur TEXT, carte TEXT, montant REAL);
INSERT INTO paiements VALUES
 (1, 'jdupont', '4539-1234-5678-9010', 199.00),
 (2, 'mmartin', '4916-9999-8888-7777',  59.00);
`
// pour l'épreuve « à l'aveugle » : l'admin cache un code de secours à 4 chiffres
const COMPTES_SECRET = `
CREATE TABLE utilisateurs (id INTEGER PRIMARY KEY, login TEXT, mot_de_passe TEXT, role TEXT, code_secours TEXT);
INSERT INTO utilisateurs VALUES
 (1, 'admin',   'Tr0ub4dour&3', 'admin',  '4082'),
 (2, 'jdupont', 'azerty123',    'membre', '1573'),
 (3, 'mmartin', 'soleil2024',   'membre', '6640'),
 (4, 'invite',  'invite',       'invite', '0000');
`

// --- les épreuves du niveau 3 (contenu pédagogique écrit à la main)
const DEFIS = [
  {
    id: 'login',
    titre: 'Contournement de connexion',
    scenario: 'Un formulaire de connexion classique. La requête colle vos saisies sans les protéger.',
    objectif: "Connectez-vous en tant qu'« admin » sans connaître son mot de passe.",
    schema: COMPTES,
    champs: [
      { name: 'login', label: 'Identifiant', placeholder: "admin' --" },
      { name: 'mdp', label: 'Mot de passe', placeholder: '(laissez vide)' },
    ],
    requete: (s) => `SELECT * FROM utilisateurs\nWHERE login = '${s.login || ''}' AND mot_de_passe = '${s.mdp || ''}'`,
    prepare: {
      sql: 'SELECT * FROM utilisateurs\nWHERE login = ? AND mot_de_passe = ?',
      params: (s) => [s.login || '', s.mdp || ''],
    },
    // Réussi seulement par injection : le vrai mot de passe de l'admin (visible dans le bac à sable) ne compte pas.
    resolu: (db, rows, s) => rows.some((r) => r.role === 'admin') && s.mdp !== 'Tr0ub4dour&3',
    succes: 'Vous êtes connecté en tant qu\'administrateur. La condition sur le mot de passe a été neutralisée par votre injection.',
    indice: "Fermez la première apostrophe et commentez le reste : dans l'identifiant, tapez `admin' --` (le `--` transforme la fin de la requête en commentaire, le mot de passe n'est plus vérifié).",
  },
  {
    id: 'numerique',
    titre: 'Injection numérique',
    scenario: "Une page « fiche produit » reçoit un identifiant numérique dans l'URL et l'insère tel quel (sans apostrophes, c'est un nombre).",
    objectif: 'Faites afficher la totalité des produits d\'un seul coup.',
    schema: CATALOGUE,
    champs: [{ name: 'id', label: 'Identifiant du produit', placeholder: '1 OR 1=1' }],
    requete: (s) => `SELECT id, nom, prix FROM produits\nWHERE id = ${s.id || ''}`,
    prepare: {
      sql: 'SELECT id, nom, prix FROM produits\nWHERE id = ?',
      params: (s) => [s.id || ''],
    },
    resolu: (db, rows) => rows.length >= 4,
    succes: 'Toute la table est sortie. Comme la valeur n\'est pas entre apostrophes, une condition toujours vraie suffit.',
    indice: 'La valeur est un nombre, sans apostrophes à fermer. Ajoutez simplement une condition toujours vraie : `1 OR 1=1`.',
  },
  {
    id: 'union',
    titre: 'Exfiltration par UNION',
    scenario: 'Un moteur de recherche de produits. La requête renvoie deux colonnes (nom, prix) et colle votre recherche dans un LIKE.',
    objectif: "Faites apparaître un identifiant et un mot de passe de la table « utilisateurs » dans les résultats.",
    schema: COMPTES + CATALOGUE,
    champs: [{ name: 'q', label: 'Recherche', placeholder: "' UNION SELECT login, mot_de_passe FROM utilisateurs --" }],
    requete: (s) => `SELECT nom, prix FROM produits\nWHERE nom LIKE '%${s.q || ''}%'`,
    prepare: {
      sql: 'SELECT nom, prix FROM produits\nWHERE nom LIKE ?',
      params: (s) => ['%' + (s.q || '') + '%'],
    },
    resolu: (db, rows) => rows.some((r) => Object.values(r).includes('Tr0ub4dour&3')),
    succes: 'Les identifiants ont fuité ! Un UNION SELECT recolle les colonnes d\'une autre table dans le même résultat.',
    indice: "La requête attend deux colonnes. Fermez la chaîne et ajoutez le vôtre : `' UNION SELECT login, mot_de_passe FROM utilisateurs --`.",
  },
  {
    id: 'empilee',
    titre: 'Requête empilée (modification)',
    scenario: "Un formulaire de recherche exécuté sans précaution : plusieurs requêtes séparées par « ; » sont enchaînées.",
    objectif: 'Faites passer le compte « invite » (rôle invite) au rôle « admin ».',
    schema: COMPTES,
    champs: [{ name: 'q', label: 'Recherche', placeholder: "x'; UPDATE ..." }],
    requete: (s) => `SELECT * FROM utilisateurs\nWHERE login = '${s.q || ''}'`,
    prepare: {
      sql: 'SELECT * FROM utilisateurs\nWHERE login = ?',
      params: (s) => [s.q || ''],
    },
    resolu: (db) => {
      try {
        const r = db.exec("SELECT role FROM utilisateurs WHERE login = 'invite'")
        return r.length > 0 && r[0].values[0][0] === 'admin'
      } catch (e) {
        return false
      }
    },
    succes: 'Le compte « invite » est devenu administrateur : une requête empilée peut modifier la base, pas seulement la lire.',
    indice: "Terminez la première requête et enchaînez la vôtre : `x'; UPDATE utilisateurs SET role='admin' WHERE login='invite'; --`.",
  },
  {
    id: 'aveugle',
    titre: "Injection à l'aveugle",
    aveugle: true,
    scenario: "Cette page ne montre plus aucune donnée : elle répond seulement « Compte trouvé » ou « Compte inconnu ». L'admin protège un code de secours à 4 chiffres. La requête reste vulnérable.",
    objectif: "Retrouvez le code de secours (4 chiffres) de l'admin en ne posant que des questions oui/non, puis saisissez-le.",
    schema: COMPTES_SECRET,
    champs: [
      { name: 'q', label: 'Champ vulnérable (votre question oui/non)', placeholder: "admin' AND substr(code_secours,1,1)='4' --" },
      { name: 'code', label: 'Le code que vous avez trouvé', placeholder: '4 chiffres' },
    ],
    requete: (s) => `SELECT id FROM utilisateurs\nWHERE login = '${s.q || ''}'`,
    prepare: {
      sql: 'SELECT id FROM utilisateurs\nWHERE login = ?',
      params: (s) => [s.q || ''],
    },
    resolu: (db, rows, s) => (s.code || '').trim() === '4082',
    succes: 'Bravo, vous avez reconstitué le code chiffre par chiffre, sans jamais l\'afficher à l\'écran : c\'est toute la force (et le danger) de l\'injection à l\'aveugle.',
    indice: "La page répond seulement oui/non, alors transformez chaque chiffre en question. `substr(code_secours, 1, 1)` isole le 1er chiffre : testez `admin' AND substr(code_secours,1,1)='4' --`. « Compte trouvé » = le 1er chiffre est 4. Sinon essayez 0, 1, 2… Recommencez avec la position 2 (`substr(code_secours,2,1)`), puis 3 et 4. Astuce : `substr(...) < '5'` coupe la recherche en deux (le chiffre est-il petit ou grand ?).",
  },
]

let SQL = null
let sqlPromise = null
const loading = ref(false)
const error = ref('')
const status = ref('')
const ran = ref(false)
const results = ref([])
const requete = ref('')
const verdict = ref(null)

// login
const mode = ref('vulnerable')
const login = ref('')
const motDePasse = ref('')

// editor
const sql = ref('')
const schema = ref([])
let editorDb = null

// defis
const defiId = ref(DEFIS[0].id)
const defi = computed(() => DEFIS.find((d) => d.id === defiId.value))
const saisies = ref({})
const resolus = ref({})

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

async function getSql() {
  if (SQL) return SQL
  if (!sqlPromise) {
    sqlPromise = (async () => {
      await loadScript(SQLJS + 'sql-wasm.js')
      return window.initSqlJs({ locateFile: (f) => SQLJS + f })
    })()
  }
  SQL = await sqlPromise
  return SQL
}

function freshDb(sqlInstance, schemaSql) {
  const db = new sqlInstance.Database()
  db.run(schemaSql)
  return db
}

// convertit la sortie de db.exec() en résultats affichables (tronqués)
function versResultats(out) {
  return out.map((r) => ({
    columns: r.columns,
    values: r.values.slice(0, MAX_ROWS),
    truncated: r.values.length > MAX_ROWS,
  }))
}

// transforme le premier jeu de résultats en tableau d'objets {colonne: valeur}
function enObjets(out) {
  if (!out.length) return []
  const { columns, values } = out[0]
  return values.map((row) => Object.fromEntries(columns.map((c, i) => [c, row[i]])))
}

async function runLogin() {
  loading.value = true
  error.value = ''
  results.value = []
  verdict.value = null
  requete.value = ''
  ran.value = true
  try {
    const sqlInstance = await getSql()
    const db = freshDb(sqlInstance, COMPTES)
    let out
    if (mode.value === 'prepared') {
      requete.value = "SELECT * FROM utilisateurs\nWHERE login = ? AND mot_de_passe = ?\n-- paramètres : [ " + JSON.stringify(login.value) + ', ' + JSON.stringify(motDePasse.value) + ' ]'
      const stmt = db.prepare('SELECT * FROM utilisateurs WHERE login = ? AND mot_de_passe = ?')
      stmt.bind([login.value, motDePasse.value])
      const rows = []
      while (stmt.step()) rows.push(stmt.getAsObject())
      stmt.free()
      out = rows.length ? [{ columns: Object.keys(rows[0]), values: rows.map((r) => Object.values(r)) }] : []
    } else {
      const q = `SELECT * FROM utilisateurs WHERE login = '${login.value}' AND mot_de_passe = '${motDePasse.value}'`
      requete.value = `SELECT * FROM utilisateurs\nWHERE login = '${login.value}' AND mot_de_passe = '${motDePasse.value}'`
      out = db.exec(q)
    }
    results.value = versResultats(out)
    const objs = enObjets(out)
    if (objs.length) {
      const u = objs[0]
      const injecte = mode.value === 'vulnerable' && /['-]/.test(login.value + motDePasse.value)
      verdict.value = {
        ok: true,
        texte: `Connecté en tant que « ${u.login} » (rôle ${u.role}).` +
          (injecte ? ' Vous n\'avez pourtant pas fourni le bon mot de passe : la requête a été détournée.' : ''),
      }
    } else {
      verdict.value = { ok: false, texte: 'Identifiants refusés.' +
        (mode.value === 'prepared' ? ' La requête préparée a traité votre saisie comme une simple donnée : l\'injection ne fonctionne plus.' : '') }
    }
    db.close()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function runDefi() {
  loading.value = true
  error.value = ''
  results.value = []
  verdict.value = null
  requete.value = ''
  ran.value = true
  const d = defi.value
  try {
    const sqlInstance = await getSql()
    const db = freshDb(sqlInstance, d.schema)
    let out
    if (mode.value === 'prepared') {
      requete.value = d.prepare.sql + '\n-- paramètres : ' + JSON.stringify(d.prepare.params(saisies.value))
      const stmt = db.prepare(d.prepare.sql)
      stmt.bind(d.prepare.params(saisies.value))
      const rows = []
      while (stmt.step()) rows.push(stmt.getAsObject())
      stmt.free()
      out = rows.length ? [{ columns: Object.keys(rows[0]), values: rows.map((r) => Object.values(r)) }] : []
      // en mode aveugle, on ne révèle jamais les lignes (même corrigé) : la page ne montre que oui/non
      results.value = d.aveugle ? [] : versResultats(out)
      verdict.value = { ok: false, texte: 'Requête préparée : votre saisie est traitée comme une donnée, l\'injection est neutralisée. C\'est exactement le correctif à retenir.' }
      db.close()
      return
    }
    const q = d.requete(saisies.value)
    requete.value = q
    out = db.exec(q)
    const objs = enObjets(out)
    if (d.aveugle) {
      // la page ne montre aucune donnée : seulement la réaction oui/non (l'oracle)
      results.value = []
      const trouve = objs.length > 0
      const oracle = trouve
        ? '✅ Compte trouvé : votre condition est VRAIE.'
        : '❌ Compte inconnu : votre condition est FAUSSE (ou l\'identifiant n\'existe pas).'
      if (d.resolu(db, objs, saisies.value)) {
        verdict.value = { ok: true, texte: d.succes }
        resolus.value = { ...resolus.value, [d.id]: true }
        sauverProgres()
      } else if ((saisies.value.code || '').trim()) {
        verdict.value = { ok: false, texte: oracle + ` Mais le code « ${saisies.value.code} » n'est pas le bon, continuez à interroger la base.` }
      } else {
        verdict.value = { ok: false, texte: oracle + ' Notez la réponse, puis testez le chiffre ou la position suivante.' }
      }
      db.close()
      return
    }
    results.value = versResultats(out)
    if (d.resolu(db, objs, saisies.value)) {
      verdict.value = { ok: true, texte: d.succes }
      resolus.value = { ...resolus.value, [d.id]: true }
      sauverProgres()
    } else {
      verdict.value = { ok: false, texte: 'Objectif non atteint. Regardez la requête générée, et le coup de pouce si besoin.' }
    }
    db.close()
  } catch (e) {
    error.value = 'La base a renvoyé une erreur : ' + e.message + ' (une injection provoque souvent une erreur de syntaxe : ajustez vos apostrophes).'
  } finally {
    loading.value = false
  }
}

function montrerSolution() {
  verdict.value = { ok: false, texte: 'Coup de pouce : ' + defi.value.indice }
}

async function chargerEditor() {
  loading.value = true
  error.value = ''
  status.value = 'Chargement de la base…'
  try {
    const sqlInstance = await getSql()
    if (editorDb) editorDb.close()
    editorDb = freshDb(sqlInstance, COMPTES + CATALOGUE + PAIEMENTS)
    const tables = editorDb.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    schema.value = tables.length
      ? tables[0].values.map(([name]) => ({
          name,
          columns: editorDb.exec(`PRAGMA table_info(${name})`)[0].values.map((c) => c[1]),
        }))
      : []
    status.value = 'Base prête.'
  } catch (e) {
    error.value = e.message
    status.value = ''
  } finally {
    loading.value = false
  }
}

function runEditor() {
  if (!editorDb || !sql.value.trim()) return
  error.value = ''
  results.value = []
  requete.value = ''
  ran.value = true
  try {
    results.value = versResultats(editorDb.exec(sql.value))
    status.value = ''
  } catch (e) {
    error.value = e.message
  }
}

function reinit() {
  sql.value = ''
  results.value = []
  error.value = ''
  ran.value = false
  chargerEditor()
}

function sauverProgres() {
  try {
    localStorage.setItem(STORAGE_KEY + ':defis', JSON.stringify(Object.keys(resolus.value).filter((k) => resolus.value[k])))
  } catch (e) {}
}

function chargerProgres() {
  try {
    const p = JSON.parse(localStorage.getItem(STORAGE_KEY + ':defis') || '[]')
    if (Array.isArray(p)) resolus.value = Object.fromEntries(p.map((id) => [id, true]))
  } catch (e) {}
}

watch(defiId, () => {
  saisies.value = {}
  results.value = []
  verdict.value = null
  requete.value = ''
  error.value = ''
  ran.value = false
  mode.value = 'vulnerable'
})

onMounted(() => {
  if (props.type === 'editor') chargerEditor()
  if (props.type === 'defis') chargerProgres()
})
</script>

<style scoped>
.sqli {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  background: var(--vp-c-bg-soft);
}
.intro {
  margin-top: 0;
}
.mode {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0.6rem 0;
  font-size: 0.9em;
}
.form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: flex-end;
  margin: 0.6rem 0;
}
.form label {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}
.form input {
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  min-width: 14rem;
}
.exemples {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
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
  margin-top: 0.6rem;
}
.brief p {
  margin: 0.3rem 0;
}
.objectif {
  color: var(--vp-c-text-1);
}
.schema {
  margin: 0.6rem 0;
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
button {
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
  cursor: pointer;
}
button.secondary {
  background: transparent;
  color: var(--vp-c-brand-1);
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}
button.link {
  background: none;
  border: none;
  padding: 0;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
}
.status {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}
.requete {
  margin-top: 0.6rem;
}
.requete-label {
  font-size: 0.8em;
  color: var(--vp-c-text-2);
}
.requete pre {
  margin: 0.2rem 0 0;
  padding: 0.6rem;
  border-radius: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.85em;
  overflow-x: auto;
  white-space: pre-wrap;
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
  margin: 0;
  font-weight: 600;
}
.count {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}
.result {
  margin-top: 0.6rem;
}
.table-wrap {
  overflow-x: auto;
  max-height: 22rem;
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
</style>
