<template>
  <LabFrame class="sqli" :class="'sqli-' + type" :disabled="loading" @reset="recommencer">
    <!-- ============================================ NIVEAU 1 : formulaire de login -->
    <template v-if="type === 'login'">
      <p class="intro">
        Un formulaire de connexion, comme il en existe des milliers. Derrière, cette requête
        est construite <strong>en collant</strong> vos saisies :
      </p>
      <LabModes v-model="mode" :options="MODES_LOGIN" />
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

    <!-- ============================================ FICHE UTILISATEUR (exercice 1) et FAUX AMI (exercice 2) -->
    <template v-else-if="type === 'fiche' || type === 'fauxami'">
      <p class="intro" v-if="type === 'fiche'">
        La page <code>fiche.php</code> colle l'identifiant reçu dans l'URL :
        <code>"SELECT * FROM users WHERE id = $id"</code>. Le tableau montre les lignes que la base renvoie.
      </p>
      <p class="intro" v-else>
        Trois façons d'exécuter la même recherche par identifiant. Comparez ce que la base reçoit
        et ce qu'elle renvoie pour une même saisie.
      </p>
      <LabModes v-model="mode" :options="type === 'fiche' ? MODES_FICHE : MODES_FAUXAMI" />
      <div class="form">
        <label class="grow">Adresse demandée au serveur
          <span class="url">
            <span class="url-fixe">fiche.php?id=</span>
            <input v-model="saisie" spellcheck="false" placeholder="1" @keydown.enter="runFiche" />
          </span>
        </label>
        <button @click="runFiche" :disabled="loading">Charger la page</button>
      </div>
      <div class="exemples">
        Essayez :
        <button class="link" @click="saisie = '1'; runFiche()"><code>1</code></button>
        puis
        <button class="link" @click="saisie = '1 OR 1=1'; runFiche()"><code>1 OR 1=1</code></button>
      </div>
    </template>

    <!-- ============================================ RECHERCHE (exercice 3) -->
    <template v-else-if="type === 'recherche'">
      <p class="intro">
        La page <code>search.php</code> cherche dans les titres des articles (on suppose les bugs PHP
        réglés : seule la requête change d'une version à l'autre).
      </p>
      <LabModes v-model="mode" :options="MODES_RECHERCHE" />
      <div class="form">
        <label class="grow">Recherche
          <input v-model="saisie" spellcheck="false" placeholder="sécurité" @keydown.enter="runRecherche" />
        </label>
        <button @click="runRecherche" :disabled="loading">Rechercher</button>
      </div>
      <div class="exemples">
        Essayez :
        <button class="link" @click="saisie = 'sécurité'; runRecherche()"><code>sécurité</code></button>
        puis
        <button class="link" @click="saisie = &quot;' UNION SELECT name, password FROM users --&quot;; runRecherche()">
          <code>' UNION SELECT name, password FROM users --</code>
        </button>
      </div>
    </template>

    <!-- ============================================ INSERTION (exercice 4) -->
    <template v-else-if="type === 'insertion'">
      <p class="intro">
        Le formulaire d'inscription ajoute une ligne dans la table <code>users</code>. La base est
        conservée d'un envoi à l'autre : « Recommencer » la remet dans son état de départ.
      </p>
      <LabModes v-model="mode" :options="MODES_INSERTION" />
      <div class="form">
        <label class="grow">Nom
          <input v-model="saisie" spellcheck="false" placeholder="Chloé" @keydown.enter="runInsertion" />
        </label>
        <label class="grow">Email
          <input v-model="email" spellcheck="false" placeholder="chloe@exemple.fr" @keydown.enter="runInsertion" />
        </label>
        <button @click="runInsertion" :disabled="loading">S'inscrire</button>
      </div>
      <div class="exemples">
        Essayez :
        <button class="link" @click="saisie = 'Chloé'; email = 'chloe@exemple.fr'; runInsertion()">
          <code>Chloé</code>
        </button>
        puis
        <button class="link" @click="saisie = &quot;', ''); DROP TABLE users; --&quot;; email = 'x@exemple.fr'; runInsertion()">
          <code>', ''); DROP TABLE users; --</code>
        </button>
      </div>
    </template>

    <!-- ============================================ NIVEAU 3 : épreuves -->
    <LabDefis
      v-else-if="type === 'defis'"
      v-model="defiId"
      :defis="DEFIS"
      :resolus="resolus"
      :disabled="loading"
      v-slot="{ defi: d }"
    >
      <LabModes v-model="mode" :options="MODES_DEFIS" />
      <div class="form">
        <label v-for="champ in d.champs" :key="champ.name">
          {{ champ.label }}
          <input v-model="saisies[champ.name]" spellcheck="false" :placeholder="champ.placeholder" />
        </label>
        <button @click="runDefi" :disabled="loading">Envoyer</button>
        <button class="secondary" @click="montrerSolution" :disabled="loading">Coup de pouce</button>
      </div>
    </LabDefis>

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
          <span class="status">{{ status }}</span>
        </div>
      </div>
    </template>

    <!-- ============================================ affichage commun -->
    <LabCode label="Requête envoyée à la base :" :code="requete" />

    <div v-if="error" class="error">{{ error }}</div>

    <LabVerdict :verdict="verdict" />

    <p v-if="resultLabel && results.length" class="count">{{ resultLabel }}</p>
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
  </LabFrame>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import LabFrame from './lab/LabFrame.vue'
import LabModes from './lab/LabModes.vue'
import LabCode from './lab/LabCode.vue'
import LabVerdict from './lab/LabVerdict.vue'
import LabDefis from './lab/LabDefis.vue'
import { useProgression } from './lab/useProgression.js'

const props = defineProps({
  // 'login' : formulaire vulnérable + bascule préparée ; 'editor' : bac à sable libre ; 'defis' : épreuves
  // 'fiche' (ex. 1), 'fauxami' (ex. 2), 'recherche' (ex. 3), 'insertion' (ex. 4) : démos des exercices
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

// --- bases des démos des exercices 1 à 4 (mêmes noms de tables et colonnes que le code PHP du TP)
const USERS = `
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO users (name, email) VALUES
 ('Alice Martin',  'alice@exemple.fr'),
 ('Bruno Petit',   'bruno@exemple.fr'),
 ('Chantal Roux',  'chantal@exemple.fr'),
 ('David Leroy',   'david@exemple.fr');
`
const ARTICLES = `
CREATE TABLE articles (id INTEGER PRIMARY KEY, title TEXT, content TEXT);
INSERT INTO articles (title, content) VALUES
 ('Bien choisir son mot de passe',  'Longueur, phrases de passe et gestionnaire.'),
 ('La sécurité des formulaires',    'Toute saisie est suspecte.'),
 ('Pourquoi les requêtes préparées ?', 'Une donnée ne doit jamais devenir du code.'),
 ('Sauvegarder sa base',            'La règle du 3-2-1.');
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, password TEXT);
INSERT INTO users (name, password) VALUES
 ('admin',   'Sup3rS3cret!'),
 ('jdupont', 'azerty123');
`
const MOTS_DE_PASSE = ['Sup3rS3cret!', 'azerty123']

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

// démos des exercices 1 à 4
const saisie = ref('')
const email = ref('')
const resultLabel = ref('')
let insertDb = null

// editor
const sql = ref('')
const schema = ref([])
let editorDb = null

// defis
const defiId = ref(DEFIS[0].id)
const defi = computed(() => DEFIS.find((d) => d.id === defiId.value))
const saisies = ref({})
const { resolus, charger: chargerProgres, marquer, effacer } = useProgression(STORAGE_KEY + ':defis')

// Ce que PDO lève réellement (vérifié en PHP 8.3 + MariaDB, préparation émulée ou native) quand on
// passe des valeurs à execute() alors que la requête n'a aucun emplacement (les ? sont entre apostrophes).
const ERREUR_HY093 = 'PDOException : SQLSTATE[HY093]: Invalid parameter number: number of bound variables does not match number of tokens'

const MODES_LOGIN = [
  { value: 'vulnerable', label: 'Version vulnérable (concaténation)' },
  { value: 'prepared', label: 'Version corrigée (requête préparée)' },
]
const MODES_DEFIS = [
  { value: 'vulnerable', label: 'Formulaire vulnérable' },
  { value: 'prepared', label: 'Le même en requête préparée' },
]

const MODES_FICHE = [
  { value: 'vulnerable', label: 'Code vulnérable (concaténation)' },
  { value: 'prepared', label: 'Code corrigé (requête préparée)' },
]
const MODES_FAUXAMI = [
  { value: 'vulnerable', label: 'query() sur la requête collée' },
  { value: 'fauxami', label: 'prepare() sur la requête collée (faux ami)' },
  { value: 'prepared', label: 'Vraie requête préparée (? + execute)' },
]
const MODES_RECHERCHE = [
  { value: 'vulnerable', label: "Concaténation : LIKE '%$query%'" },
  { value: 'guillemets', label: "Placeholder entre apostrophes : LIKE '%?%'" },
  { value: 'prepared', label: 'Corrigé : LIKE ? et les % dans la donnée' },
]
const MODES_INSERTION = [
  { value: 'vulnerable', label: 'Version A (concaténation)' },
  { value: 'guillemets', label: "Version B ('?', '?')" },
  { value: 'prepared', label: 'Version corrigée (?, ?)' },
]

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

// exécute une requête préparée (avec ou sans paramètres) et renvoie le format de db.exec()
function executer(db, texte, params) {
  const stmt = db.prepare(texte)
  if (params) stmt.bind(params)
  const rows = []
  while (stmt.step()) rows.push(stmt.getAsObject())
  stmt.free()
  return rows.length ? [{ columns: Object.keys(rows[0]), values: rows.map((r) => Object.values(r)) }] : []
}

function preparerEssai() {
  error.value = ''
  results.value = []
  verdict.value = null
  requete.value = ''
  resultLabel.value = ''
  ran.value = true
}

// exercice 1 (fiche) et exercice 2 (faux ami) : fiche.php?id=…
async function runFiche() {
  loading.value = true
  preparerEssai()
  const id = saisie.value
  const colle = `SELECT * FROM users WHERE id = ${id}`
  try {
    const db = freshDb(await getSql(), USERS)
    let out
    try {
      if (mode.value === 'prepared') {
        requete.value = 'prepare("SELECT * FROM users WHERE id = ?")\nexecute(' + JSON.stringify([id]) + ')'
        // Comme MariaDB/MySQL (et non SQLite) : la chaîne comparée à une colonne INT est convertie
        // en nombre d'après ses premiers chiffres ('1 OR 1=1' devient 1, vérifié en PHP 8.3 + MariaDB 11.4).
        const m = String(id).match(/^\s*-?\d+/)
        out = executer(db, 'SELECT * FROM users WHERE id = ?', [m ? Number(m[0]) : 0])
      } else if (mode.value === 'fauxami') {
        requete.value = `prepare("${colle}")\nexecute()\n-- la saisie est déjà dans le texte préparé, execute() ne reçoit rien`
        out = executer(db, colle)
      } else {
        requete.value = props.type === 'fauxami' ? `query("${colle}")` : colle
        out = db.exec(colle)
      }
    } finally {
      db.close()
    }
    results.value = versResultats(out)
    resultLabel.value = 'Lignes renvoyées par la base :'
    const n = out.length ? out[0].values.length : 0
    if (mode.value === 'prepared') {
      verdict.value = {
        ok: false,
        texte: n
          ? `Une seule fiche : la valeur « ${id} » a servi de donnée, rien de plus.` +
            (/\D/.test(String(id).trim()) ? ' MariaDB la convertit en nombre pour la comparer à id (ses premiers chiffres) : le reste n\'est jamais exécuté.' : '')
          : `Aucune ligne : la valeur « ${id} » a servi de donnée, et aucun id ne lui correspond. L'injection est neutralisée.`,
      }
    } else if (n > 1) {
      verdict.value = {
        ok: true,
        texte: `La base renvoie ${n} utilisateurs pour une seule fiche demandée : votre saisie est devenue du code SQL.` +
          (mode.value === 'fauxami' ? ' Le prepare() n\'a rien changé : la saisie était déjà collée dans la requête.' : ''),
      }
    } else {
      verdict.value = { ton: 'info', texte: n ? 'Une seule fiche, comme prévu. Essayez maintenant une saisie qui ajoute une condition.' : 'Aucun utilisateur ne porte cet identifiant.' }
    }
  } catch (e) {
    error.value = 'La base a renvoyé une erreur : ' + e.message
  } finally {
    loading.value = false
  }
}

// exercice 3 : search.php?query=…
async function runRecherche() {
  loading.value = true
  preparerEssai()
  const q = saisie.value
  try {
    const db = freshDb(await getSql(), ARTICLES)
    let out
    try {
      if (mode.value === 'prepared') {
        requete.value = 'SELECT title, content FROM articles\nWHERE title LIKE ?\n-- paramètres : ' + JSON.stringify(['%' + q + '%'])
        out = executer(db, 'SELECT title, content FROM articles WHERE title LIKE ?', ['%' + q + '%'])
      } else if (mode.value === 'guillemets') {
        // Comme PDO : la requête n'a aucun emplacement mais execute() reçoit une valeur : exception, rien n'est exécuté.
        requete.value = "SELECT title, content FROM articles\nWHERE title LIKE '%?%'\n-- execute(" + JSON.stringify([q]) + ') : 1 valeur pour 0 emplacement'
        error.value = ERREUR_HY093
        verdict.value = { ok: false, texte: 'La page plante, quelle que soit votre recherche. Le ? entre apostrophes n\'est pas un emplacement : PDO reçoit une valeur qu\'il ne peut placer nulle part. C\'est un bug, pas une faille.' }
        return
      } else {
        const texte = `SELECT title, content FROM articles\nWHERE title LIKE '%${q}%'`
        requete.value = texte
        out = db.exec(texte)
      }
    } finally {
      db.close()
    }
    results.value = versResultats(out)
    resultLabel.value = 'Articles affichés par la page :'
    const n = out.length ? out[0].values.length : 0
    const fuite = out.some((r) => r.values.some((row) => row.some((v) => MOTS_DE_PASSE.includes(v))))
    if (fuite) {
      verdict.value = { ok: true, texte: 'Des mots de passe s\'affichent parmi les articles : le UNION SELECT a recollé les colonnes de la table users dans le résultat.' }
    } else if (mode.value === 'prepared') {
      verdict.value = { ok: false, texte: (n ? `${n} article${n > 1 ? 's' : ''} trouvé${n > 1 ? 's' : ''}.` : 'Aucun titre ne contient ce texte.') + ' La recherche fonctionne et votre saisie reste une donnée, apostrophes comprises.' }
    } else {
      verdict.value = { ton: 'info', texte: `${n} article${n > 1 ? 's' : ''} trouvé${n > 1 ? 's' : ''}. Essayez maintenant une saisie qui ferme l'apostrophe.` }
    }
  } catch (e) {
    error.value = 'La base a renvoyé une erreur : ' + e.message + ' (une injection mal ajustée provoque souvent une erreur de syntaxe).'
  } finally {
    loading.value = false
  }
}

function tableUsersExiste(db) {
  return db.exec("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'users'").length > 0
}

// exercice 4 : inscription, la base est conservée d'un envoi à l'autre
async function runInsertion() {
  loading.value = true
  preparerEssai()
  const nom = saisie.value
  const mail = email.value
  try {
    if (!insertDb) insertDb = freshDb(await getSql(), USERS)
    const db = insertDb
    if (mode.value === 'prepared') {
      requete.value = 'INSERT INTO users (name, email) VALUES (?, ?)\n-- paramètres : ' + JSON.stringify([nom, mail])
      executer(db, 'INSERT INTO users (name, email) VALUES (?, ?)', [nom, mail])
    } else if (mode.value === 'guillemets') {
      // Comme PDO : aucun emplacement réel dans la requête mais deux valeurs passées à execute() : exception, rien n'est inséré.
      requete.value = "INSERT INTO users (name, email) VALUES ('?', '?')\n-- execute(" + JSON.stringify([nom, mail]) + ') : 2 valeurs pour 0 emplacement'
      error.value = ERREUR_HY093
      results.value = versResultats(db.exec('SELECT * FROM users'))
      resultLabel.value = 'Contenu de la table users après l\'envoi (inchangé) :'
      verdict.value = { ok: false, texte: 'L\'inscription plante, pour tout le monde : les ? entre apostrophes ne sont pas des emplacements, PDO refuse les valeurs et rien n\'est inséré. C\'est un bug, pas une faille.' }
      return
    } else {
      const texte = `INSERT INTO users (name, email) VALUES ('${nom}', '${mail}')`
      requete.value = texte
      db.exec(texte)
    }
    if (!tableUsersExiste(db)) {
      ran.value = false
      verdict.value = { ok: true, texte: 'La table users a été supprimée : votre saisie a terminé l\'INSERT puis enchaîné un DROP TABLE. Cliquez sur « Recommencer » pour la retrouver.' }
      return
    }
    results.value = versResultats(db.exec('SELECT * FROM users'))
    resultLabel.value = 'Contenu de la table users après l\'envoi :'
    if (mode.value === 'prepared') {
      verdict.value = { ok: true, texte: `Utilisateur ajouté. Son nom est exactement « ${nom} » : même avec des apostrophes, la saisie est restée une donnée.` }
    } else {
      verdict.value = { ton: 'info', texte: 'Utilisateur ajouté. Tout va bien… tant que personne ne tape d\'apostrophe.' }
    }
  } catch (e) {
    error.value = 'La base a renvoyé une erreur : ' + e.message +
      (/no such table/.test(e.message) ? ' (la table a été supprimée : cliquez sur « Recommencer »).' : '')
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
        marquer(d.id)
      } else if ((saisies.value.code || '').trim()) {
        verdict.value = { ton: 'info', texte: oracle + ` Mais le code « ${saisies.value.code} » n'est pas le bon, continuez à interroger la base.` }
      } else {
        verdict.value = { ton: 'info', texte: oracle + ' Notez la réponse, puis testez le chiffre ou la position suivante.' }
      }
      db.close()
      return
    }
    results.value = versResultats(out)
    if (d.resolu(db, objs, saisies.value)) {
      verdict.value = { ok: true, texte: d.succes }
      marquer(d.id)
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
  verdict.value = { ton: 'info', texte: 'Coup de pouce : ' + defi.value.indice }
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

// Remet l'exercice dans son état de départ : saisies, mode, résultats, base de
// l'éditeur et, pour les épreuves, la progression enregistrée dans le navigateur.
function recommencer() {
  mode.value = 'vulnerable'
  login.value = ''
  motDePasse.value = ''
  saisies.value = {}
  saisie.value = ''
  email.value = ''
  resultLabel.value = ''
  if (insertDb) {
    insertDb.close()
    insertDb = null
  }
  results.value = []
  requete.value = ''
  verdict.value = null
  error.value = ''
  ran.value = false
  if (props.type === 'defis') {
    defiId.value = DEFIS[0].id
    effacer()
  }
  if (props.type === 'editor') reinit()
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
.form input { min-width: 14rem; }
.url { display: flex; align-items: stretch; }
.url-fixe {
  padding: 0.35rem 0.5rem; border: 1px solid var(--vp-c-divider); border-right: none;
  border-radius: 4px 0 0 4px; background: var(--vp-c-default-soft);
  font-family: var(--vp-font-family-mono); font-size: 0.9em; color: var(--vp-c-text-2); white-space: nowrap;
}
.url input { flex: 1; min-width: 8rem; border-radius: 0 4px 4px 0; }
.schema { margin: 0.6rem 0; font-size: 0.9em; }
.schema summary { cursor: pointer; }
.schema ul { margin: 0.5rem 0 0 1rem; padding: 0; }
.editor textarea {
  width: 100%; font-family: var(--vp-font-family-mono); font-size: 0.9em; padding: 0.6rem;
  border: 1px solid var(--vp-c-divider); border-radius: 4px;
  background: var(--vp-c-bg); color: var(--vp-c-text-1); resize: vertical;
}
.actions { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; margin-top: 0.5rem; }
.status { font-size: 0.85em; color: var(--vp-c-text-2); }
.count { font-size: 0.9em; color: var(--vp-c-text-2); }
.result { margin-top: 0.6rem; }
.table-wrap { margin: 0; max-height: 22rem; overflow-y: auto; }
.result table { font-size: 0.85em; margin: 0; }
.result th, .result td { white-space: nowrap; }
</style>
