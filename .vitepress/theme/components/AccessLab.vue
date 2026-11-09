<template>
  <LabFrame class="alab-acces" :disabled="enCours" @reset="recommencer">
    <!-- ============================================ JOURNAL D'ACCÈS (exercice 1) -->
    <template v-if="type === 'logs'">
      <p class="intro">
        Le journal d'accès du serveur se remplit à chaque requête. Faites agir les visiteurs, puis
        lancez le script de l'attaquant (<code>192.168.1.4</code>) qui essaie les factures une à une.
        Comparez un journal que personne ne surveille et un journal analysé automatiquement.
      </p>
      <LabModes v-model="mode" :options="MODES_LOGS" :disabled="enCours" />
      <div class="form">
        <button class="secondary" :disabled="enCours" @click="visiteNormale('accueil')">Un visiteur ouvre l'accueil</button>
        <button class="secondary" :disabled="enCours" @click="visiteNormale('facture')">Le client 192.168.1.4 ouvre sa facture</button>
        <button :disabled="enCours" @click="enumerer">{{ enCours ? 'Énumération en cours…' : 'Script : essayer les factures 8987 à 8990' }}</button>
      </div>
      <div class="journal-acces">
        <div class="journal-titre">access.log</div>
        <div
          v-for="(l, i) in journal"
          :key="i"
          class="ligne"
          :class="{ suspecte: mode === 'auto' && suspectes.has(i) }"
        >{{ l.texte }}</div>
      </div>
      <LabCode v-if="mode === 'auto'" label="Règle de détection appliquée à chaque nouvelle ligne :" :code="REGLE" />
      <LabVerdict :verdict="verdictLogs" />
    </template>

    <!-- ============================================ IDOR (exercice 2) -->
    <template v-else-if="type === 'idor'">
      <p class="intro">
        Vous êtes connecté en tant qu'<strong>Alice</strong> (<code>Auth::id() = 1</code>). Votre facture
        porte le numéro <code>8986</code>. Changez le numéro dans l'adresse et regardez ce que renvoie
        <code>FactureController@index</code>.
      </p>
      <LabModes v-model="mode" :options="MODES_IDOR" :disabled="enCours" />
      <div class="form">
        <label class="grow">Adresse demandée au serveur
          <span class="url">
            <span class="url-fixe">/facture?id=</span>
            <input v-model="idSaisi" spellcheck="false" inputmode="numeric" @keydown.enter="demanderFacture()" />
          </span>
        </label>
        <button @click="demanderFacture()">Charger la page</button>
      </div>
      <div class="exemples">
        Essayez :
        <button class="link" @click="demanderFacture('8986')"><code>8986</code> (la vôtre)</button>,
        puis
        <button class="link" @click="demanderFacture('8985')"><code>8985</code></button>,
        <button class="link" @click="demanderFacture('8987')"><code>8987</code></button>,
        ou
        <button class="link" @click="enumererIdor">tous les numéros de 8980 à 8990</button>.
      </div>
    </template>

    <!-- ============================================ ROUTES D'ADMINISTRATION (exercices 3 et 4) -->
    <template v-else>
      <p class="intro" v-if="type === 'admin'">
        Choisissez qui navigue et quelle adresse il tape. Le routeur cherche la route, exécute
        les middlewares éventuels, puis le contrôleur.
      </p>
      <p class="intro" v-else>
        La nouvelle route <code>/admin/factures</code> appelle <code>FactureController@all</code>,
        qui renvoie les factures de <strong>tous</strong> les clients. Comparez une route ajoutée
        à la suite du fichier et une route placée dans le groupe protégé.
      </p>
      <LabModes v-model="mode" :options="type === 'admin' ? MODES_ADMIN : MODES_ADMIN_FACTURES" />
      <div class="form">
        <label>Navigue en tant que
          <select v-model="qui">
            <option v-for="u in VISITEURS" :key="u.value" :value="u.value">{{ u.label }}</option>
          </select>
        </label>
        <label class="grow">Adresse tapée
          <span class="url">
            <span class="url-fixe">GET</span>
            <input v-model="chemin" spellcheck="false" @keydown.enter="naviguer()" />
          </span>
        </label>
        <button @click="naviguer()">Charger la page</button>
      </div>
      <div class="exemples">
        Essayez :
        <template v-for="(c, i) in cheminsExemples" :key="c">
          <button class="link" @click="naviguer(c)"><code>{{ c }}</code></button>{{ i < cheminsExemples.length - 1 ? ', ' : '' }}
        </template>
        en changeant de visiteur.
      </div>
      <LabCode label="Fichier routes/web.php (→ marque la route trouvée) :" :code="routesAffichees" />
    </template>

    <!-- ============================================ affichage commun (idor, admin) -->
    <template v-if="type !== 'logs'">
      <div v-if="enumeration.length" class="table-wrap">
        <table>
          <thead><tr><th>Requête</th><th>Réponse</th><th>Ce qu'Alice obtient</th></tr></thead>
          <tbody>
            <tr v-for="e in enumeration" :key="e.id" :class="{ fuite: e.fuite }">
              <td class="mono">/facture?id={{ e.id }}</td><td>{{ e.statut }}</td><td>{{ e.obtenu }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <template v-else>
        <LabCode label="Requête HTTP reçue par le serveur :" :code="requete" />
        <LabCode label="Code exécuté (avec les valeurs du moment) :" :code="trace" />
        <LabCode label="Réponse envoyée :" :code="statut" />
        <div v-if="page" class="ecran">
          <div class="ecran-barre">🌐 navigateur, session : {{ nomSession }}</div>
          <div class="ecran-page">
            <template v-if="page.kind === 'erreur'">
              <p class="page-erreur">{{ page.titre }}</p>
            </template>
            <template v-else>
              <h4>{{ page.titre }}</h4>
              <p v-if="page.texte">{{ page.texte }}</p>
              <table v-if="page.lignes">
                <thead><tr><th v-for="c in page.colonnes" :key="c">{{ c }}</th></tr></thead>
                <tbody><tr v-for="(r, i) in page.lignes" :key="i"><td v-for="(v, j) in r" :key="j">{{ v }}</td></tr></tbody>
              </table>
            </template>
          </div>
        </div>
      </template>
      <LabVerdict :verdict="verdict" />
    </template>
  </LabFrame>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import LabFrame from './lab/LabFrame.vue'
import LabModes from './lab/LabModes.vue'
import LabCode from './lab/LabCode.vue'
import LabVerdict from './lab/LabVerdict.vue'

// logs (ex. 1), idor (ex. 2), admin (ex. 3), admin-factures (ex. 4)
const props = defineProps({ type: { type: String, default: 'idor' } })

/* ---------- Données communes ---------- */
const USERS = [
  { id: 1, nom: 'Alice', email: 'alice@exemple.fr', role: 'membre' },
  { id: 2, nom: 'Bob', email: 'bob@exemple.fr', role: 'membre' },
  { id: 3, nom: 'Chloé', email: 'chloe@exemple.fr', role: 'membre' },
  { id: 4, nom: 'David', email: 'david@exemple.fr', role: 'membre' },
  { id: 5, nom: 'Zoé', email: 'zoe@exemple.fr', role: 'admin' },
]
// Les factures sont numérotées à la suite : 8986 est la dernière émise (celle d'Alice).
const FACTURES = [
  { id: 8982, user_id: 2, montant: '120,00 €', adresse: '4 rue des Lilas, Angers' },
  { id: 8983, user_id: 3, montant: '89,90 €', adresse: '12 bd Foch, Nantes' },
  { id: 8984, user_id: 2, montant: '45,00 €', adresse: '4 rue des Lilas, Angers' },
  { id: 8985, user_id: 4, montant: '310,00 €', adresse: '7 place Ney, Le Mans' },
  { id: 8986, user_id: 1, montant: '59,90 €', adresse: '3 allée Verte, Tours' },
]
const nomDe = (id) => USERS.find((u) => u.id === id)?.nom ?? '?'

const mode = ref('vulnerable')
const verdict = ref(null)
const requete = ref('')
const trace = ref('')
const statut = ref('')
const page = ref(null)
const enCours = ref(false)
const enumeration = ref([])

function wait(ms) { return new Promise((r) => setTimeout(r, ms)) }

function viderSortie() {
  verdict.value = null
  requete.value = ''
  trace.value = ''
  statut.value = ''
  page.value = null
  enumeration.value = []
}

/* ---------- Démo : journal d'accès (exercice 1) ---------- */
const MODES_LOGS = [
  { value: 'manuel', label: 'Journal seul (personne ne le lit en direct)' },
  { value: 'auto', label: 'Journal + détection automatique' },
]
const SEUIL = 3
const REGLE = `Pour chaque adresse IP, sur la dernière minute :
  compter les identifiants différents demandés sur /facture
  si ce nombre atteint ${SEUIL} : ALERTE (énumération probable)`
const JOURNAL_DEPART = [
  { ip: '127.0.0.1', user: 'frank', req: 'GET /apache_pb.gif', code: 200, taille: 2326 },
  { ip: '192.168.1.1', user: '-', req: 'GET /index.html', code: 200, taille: 2761 },
  { ip: '192.168.1.3', user: '-', req: 'GET /secret.html', code: 403, taille: 289 },
]
const journal = ref([])
const alerte = ref(null)
const attaqueFaite = ref(false)
let seconde = 0

function heure() {
  const s = 36 + seconde
  seconde++
  const mm = 55 + Math.floor(s / 60)
  return `10/Oct/2024:13:${mm}:${String(s % 60).padStart(2, '0')}`
}
function ajouterLigne(l) {
  const texte = `${l.ip.padEnd(11)} - ${l.user.padEnd(5)} [${heure()}] "${l.req} HTTP/1.0" ${l.code} ${l.taille}`
  journal.value.push({ ...l, texte })
  analyser()
}
// Lignes /facture?id=… de chaque IP : la règle de détection automatique.
const parIp = computed(() => {
  const m = {}
  journal.value.forEach((l, i) => {
    const id = /^GET \/facture\?id=(\d+)/.exec(l.req)?.[1]
    if (!id) return
    if (!m[l.ip]) m[l.ip] = { ids: new Set(), lignes: [] }
    m[l.ip].ids.add(id)
    m[l.ip].lignes.push(i)
  })
  return m
})
const suspectes = computed(() => {
  const s = new Set()
  for (const v of Object.values(parIp.value)) if (v.ids.size >= SEUIL) v.lignes.forEach((i) => s.add(i))
  return s
})
function analyser() {
  if (alerte.value) return
  for (const [ip, v] of Object.entries(parIp.value)) {
    if (v.ids.size >= SEUIL) alerte.value = { ip, ligne: journal.value.length }
  }
}
function visiteNormale(quoi) {
  if (quoi === 'accueil') ajouterLigne({ ip: '192.168.1.1', user: '-', req: 'GET /index.html', code: 200, taille: 2761 })
  else ajouterLigne({ ip: '192.168.1.4', user: '-', req: 'GET /facture?id=8986', code: 200, taille: 512 })
}
async function enumerer() {
  enCours.value = true
  if (!journal.value.some((l) => l.req === 'GET /facture?id=8986')) visiteNormale('facture')
  for (const id of [8987, 8988, 8989, 8990]) {
    await wait(350)
    ajouterLigne({ ip: '192.168.1.4', user: '-', req: `GET /facture?id=${id}`, code: 404, taille: 512 })
    if (id === 8988) {
      // Le trafic normal continue pendant l'attaque.
      await wait(200)
      ajouterLigne({ ip: '192.168.1.7', user: '-', req: 'GET /index.html', code: 200, taille: 2761 })
    }
  }
  attaqueFaite.value = true
  enCours.value = false
}
const verdictLogs = computed(() => {
  if (mode.value === 'auto' && alerte.value) {
    const v = parIp.value[alerte.value.ip]
    return {
      ok: true,
      texte: `Alerte envoyée dès la ligne ${alerte.value.ligne} : ${alerte.value.ip} a demandé ${v.ids.size} factures différentes en quelques secondes. L'équipe est prévenue pendant l'attaque.`,
      lignes: [...v.ids].map((id) => `/facture?id=${id}`),
    }
  }
  if (mode.value === 'manuel' && attaqueFaite.value) {
    return {
      ok: false,
      texte: "L'énumération est bien écrite dans le journal, mais rien ne se passe : personne ne lit ces lignes au moment où elles arrivent. Noyée dans des millions de lignes par jour, elle passerait inaperçue.",
    }
  }
  if (mode.value === 'auto' && journal.value.length > JOURNAL_DEPART.length) {
    return { ok: true, texte: 'Aucune alerte : un client qui consulte sa propre facture, même plusieurs fois, est un comportement normal.' }
  }
  return null
})
function resetLogs() {
  seconde = 0
  journal.value = []
  alerte.value = null
  attaqueFaite.value = false
  JOURNAL_DEPART.forEach(ajouterLigne)
}

/* ---------- Démo : IDOR (exercice 2) ---------- */
const MODES_IDOR = [
  { value: 'vulnerable', label: 'Contrôleur d\'origine (vérifie seulement que la facture existe)' },
  { value: 'corrige', label: 'Contrôleur corrigé (checkIfUserCanAccessFacture)' },
]
const ALICE = 1
const idSaisi = ref('8986')

// Ce que fait FactureController@index pour un identifiant donné, dans le mode courant.
function executerIndex(idBrut) {
  const id = String(idBrut).trim()
  const f = FACTURES.find((x) => String(x.id) === id)
  const desc = f ? `facture n°${f.id}, user_id = ${f.user_id} (${nomDe(f.user_id)})` : 'null (aucune facture)'
  const l = [
    `$id = $request->input('id');      // '${id}'`,
    `$facture = Facture::find($id);    // ${desc}`,
  ]
  if (mode.value === 'vulnerable') {
    if (f) {
      l.push(`if ($facture) {                   // vrai : elle existe`)
      l.push(`    return view('facture', ['facture' => $facture]);`)
      return { f, code: 200, lignes: l }
    }
    l.push(`if ($facture) { … }               // faux`)
    l.push('return abort(404);')
    return { f, code: 404, lignes: l }
  }
  if (!f) {
    l.push(`if (! $facture) {                 // vrai : elle n'existe pas`)
    l.push('    return abort(404);')
    return { f, code: 404, lignes: l }
  }
  l.push(`if (! $facture) { … }             // faux : elle existe`)
  const ok = f.user_id === ALICE
  l.push(`if (! $this->checkIfUserCanAccessFacture($facture)) {`)
  l.push(`    // $facture->user_id === Auth::id()  →  ${f.user_id} === ${ALICE}  →  ${ok ? 'true' : 'false'}`)
  if (!ok) {
    l.push('    return abort(403);')
    return { f, code: 403, lignes: l }
  }
  l.push('}                                 // condition fausse : on continue')
  l.push(`return view('facture', ['facture' => $facture]);`)
  return { f, code: 200, lignes: l }
}

const TEXTES_STATUT = { 200: 'OK', 302: 'Found', 403: 'Forbidden', 404: 'Not Found' }
const ligneStatut = (code) => `HTTP/1.1 ${code} ${TEXTES_STATUT[code]}`

function demanderFacture(id) {
  if (id !== undefined) idSaisi.value = id
  viderSortie()
  const r = executerIndex(idSaisi.value)
  requete.value = `GET /facture?id=${idSaisi.value.trim()} HTTP/1.1\nHost: site.fr\nCookie: laravel_session=…   (session d'Alice, Auth::id() = 1)`
  trace.value = r.lignes.join('\n')
  statut.value = ligneStatut(r.code)
  if (r.code === 200) {
    page.value = {
      titre: `Facture n°${r.f.id}`,
      colonnes: ['Client', 'Adresse', 'Montant'],
      lignes: [[nomDe(r.f.user_id), r.f.adresse, r.f.montant]],
    }
  } else {
    page.value = { kind: 'erreur', titre: `${r.code} | ${TEXTES_STATUT[r.code]}` }
  }
  if (r.code === 200 && r.f.user_id !== ALICE) {
    verdict.value = {
      ok: true,
      texte: `Faille IDOR : Alice lit la facture de ${nomDe(r.f.user_id)}, avec son adresse et son montant. Il a suffi de changer le numéro dans l'URL.`,
    }
  } else if (r.code === 200) {
    verdict.value = { ton: 'info', texte: 'Accès normal : cette facture appartient bien à Alice.' }
  } else if (r.code === 403) {
    verdict.value = {
      ok: false,
      texte: `Bloqué : la facture existe, mais elle appartient à ${nomDe(r.f.user_id)}. Le serveur répond 403 sans rien en montrer.`,
    }
  } else {
    verdict.value = { ok: false, texte: "404 : aucune facture ne porte ce numéro. Rien n'a fuité." }
  }
}

function enumererIdor() {
  viderSortie()
  let fuites = 0
  for (let id = 8980; id <= 8990; id++) {
    const r = executerIndex(id)
    const fuite = r.code === 200 && r.f.user_id !== ALICE
    if (fuite) fuites++
    enumeration.value.push({
      id,
      statut: ligneStatut(r.code).replace('HTTP/1.1 ', ''),
      obtenu: r.code === 200 ? `facture de ${nomDe(r.f.user_id)} (${r.f.montant})` : 'rien',
      fuite,
    })
  }
  verdict.value = fuites
    ? { ok: true, texte: `${fuites} factures d'autres clients récupérées en 11 requêtes. Un script ferait la même chose sur des milliers de numéros.` }
    : { ok: false, texte: 'Aucune facture d\'un autre client ne sort : seulement des 403 (elle existe mais n\'est pas à vous) et des 404 (elle n\'existe pas).' }
}

/* ---------- Démo : routes d'administration (exercices 3 et 4) ---------- */
const MODES_ADMIN = [
  { value: 'vulnerable', label: 'Routeur d\'origine (aucun contrôle)' },
  { value: 'corrige', label: 'Routeur corrigé (groupe middleware admin)' },
]
const MODES_ADMIN_FACTURES = [
  { value: 'vulnerable', label: 'Route ajoutée à la suite, hors du groupe' },
  { value: 'corrige', label: 'Route ajoutée dans le groupe admin' },
]
const VISITEURS = [
  { value: 'invite', label: 'Visiteur non connecté' },
  { value: 'alice', label: 'Alice (rôle membre)' },
  { value: 'zoe', label: 'Zoé (rôle admin)' },
]
const SESSIONS = {
  invite: { nom: 'aucune', user: null },
  alice: { nom: 'Alice (membre)', user: USERS[0] },
  zoe: { nom: 'Zoé (admin)', user: USERS[4] },
}
const qui = ref('alice')
const chemin = ref('/admin')

// Chaque ligne du fichier de routes : [texte, route éventuelle { uri, action, admin }].
const R = (uri, action, admin = false) => ({ uri, action, admin })
const ROUTES = {
  'admin:vulnerable': [
    ['<?php', null],
    ["Route::get('/', 'HomeController@index');", R('/', 'HomeController@index')],
    ["Route::get('/search', 'HomeController@index');", R('/search', 'HomeController@index')],
    ["Route::get('/facture', 'FactureController@index');", R('/facture', 'FactureController@index')],
    ["Route::get('/admin', 'AdminController@index');", R('/admin', 'AdminController@index')],
    ["Route::get('/admin/users', 'UserController@index');", R('/admin/users', 'UserController@index')],
  ],
  'admin:corrige': [
    ['<?php', null],
    ["Route::get('/', 'HomeController@index');", R('/', 'HomeController@index')],
    ["Route::get('/search', 'HomeController@index');", R('/search', 'HomeController@index')],
    ["Route::get('/facture', 'FactureController@index');", R('/facture', 'FactureController@index')],
    ['', null],
    ["Route::middleware(['admin'])->group(function () {", null],
    ["    Route::get('/admin', 'AdminController@index');", R('/admin', 'AdminController@index', true)],
    ["    Route::get('/admin/users', 'UserController@index');", R('/admin/users', 'UserController@index', true)],
    ['});', null],
  ],
}
ROUTES['admin-factures:vulnerable'] = [
  ...ROUTES['admin:corrige'],
  ["Route::get('/admin/factures', 'FactureController@all');", R('/admin/factures', 'FactureController@all')],
]
ROUTES['admin-factures:corrige'] = [
  ...ROUTES['admin:corrige'].slice(0, -1),
  ["    Route::get('/admin/factures', 'FactureController@all');", R('/admin/factures', 'FactureController@all', true)],
  ['});', null],
]

const cheminsExemples = computed(() =>
  props.type === 'admin' ? ['/', '/admin', '/admin/users'] : ['/admin/factures', '/admin/users'],
)
const routesCourantes = computed(() => ROUTES[`${props.type}:${mode.value}`] || ROUTES['admin:vulnerable'])
const routeTrouvee = ref(null)
const routesAffichees = computed(() =>
  routesCourantes.value.map(([t, r]) => (r && r.uri === routeTrouvee.value ? '→ ' : '  ') + t).join('\n'),
)
const nomSession = computed(() => (props.type === 'idor' ? 'Alice' : SESSIONS[qui.value].nom))

// Exemple de middleware admin (le TP n'en donne pas le code) : un visiteur non connecté est
// redirigé vers /login, un membre connecté sans le rôle admin reçoit un 403.
const MIDDLEWARE = '// middleware admin (exemple, exécuté avant le contrôleur)'

// Ce que produit chaque contrôleur quand il est atteint.
function pageDe(action) {
  if (action === 'HomeController@index') return { titre: 'Accueil', texte: 'Bienvenue sur le site. Page publique.' }
  if (action === 'FactureController@index') return { titre: 'Facture', texte: 'Le contrôle du propriétaire se fait dans le contrôleur : voir l\'exercice 2.' }
  if (action === 'AdminController@index') {
    return {
      titre: 'Administration',
      texte: '5 utilisateurs, 5 factures, 734,80 € encaissés. Liens : gérer les utilisateurs, supprimer un compte, changer un rôle.',
    }
  }
  if (action === 'UserController@index') {
    return { titre: 'Utilisateurs', colonnes: ['id', 'Nom', 'Email', 'Rôle'], lignes: USERS.map((u) => [u.id, u.nom, u.email, u.role]) }
  }
  return {
    titre: 'Toutes les factures',
    colonnes: ['n°', 'Client', 'Adresse', 'Montant'],
    lignes: FACTURES.map((f) => [f.id, nomDe(f.user_id), f.adresse, f.montant]),
  }
}

function naviguer(c) {
  if (c !== undefined) chemin.value = c
  viderSortie()
  let uri = chemin.value.trim() || '/'
  if (!uri.startsWith('/')) uri = '/' + uri
  const sansQuery = uri.split('?')[0].replace(/(.)\/+$/, '$1')
  const s = SESSIONS[qui.value]
  const route = routesCourantes.value.map(([, r]) => r).find((r) => r && r.uri === sansQuery) || null
  routeTrouvee.value = route ? route.uri : null
  requete.value = `GET ${uri} HTTP/1.1\nHost: site.fr` +
    (s.user ? `\nCookie: laravel_session=…   (session ${/^[AEIOUYÉ]/.test(s.user.nom) ? 'd\'' : 'de '}${s.user.nom}, rôle ${s.user.role})` : '\n(aucun cookie de session : visiteur non connecté)')
  const sensible = sansQuery.startsWith('/admin')
  if (!route) {
    trace.value = `Aucune route ne correspond à ${sansQuery}`
    statut.value = ligneStatut(404)
    page.value = { kind: 'erreur', titre: '404 | Not Found' }
    verdict.value = { ton: 'info', texte: 'Cette route n\'existe pas dans ce fichier : le serveur répond 404.' }
    return
  }
  const l = [`Route trouvée : GET ${route.uri} → ${route.action}`]
  if (route.admin) {
    l.push('', MIDDLEWARE, 'if (! Auth::check()) {')
    if (!s.user) {
      l.push('    // connecté : non  →  condition vraie', "    return redirect('/login');", '}', '', `${route.action} n'est jamais exécuté.`)
      trace.value = l.join('\n')
      statut.value = ligneStatut(302) + '\nLocation: /login'
      page.value = { kind: 'erreur', titre: 'Redirection vers /login : connectez-vous d\'abord' }
      verdict.value = { ok: false, texte: 'Bloqué par le middleware admin : le visiteur n\'est pas connecté, il est renvoyé vers /login et le contrôleur ne s\'exécute pas.' }
      return
    }
    const passe = s.user.role === 'admin'
    l.push('    // connecté : oui  →  condition fausse, on continue', '}', "if (Auth::user()->role !== 'admin') {")
    l.push(`    // rôle : '${s.user.role}'  →  ${passe ? 'condition fausse, on continue' : 'condition vraie'}`)
    if (!passe) {
      l.push('    abort(403);', '}', '', `${route.action} n'est jamais exécuté.`)
      trace.value = l.join('\n')
      statut.value = ligneStatut(403)
      page.value = { kind: 'erreur', titre: '403 | Forbidden' }
      verdict.value = { ok: false, texte: `Bloqué par le middleware admin : ${s.user.nom} a une session valide mais pas le rôle admin (403), le contrôleur ne s'exécute pas.` }
      return
    }
    l.push('}', 'return $next($request);', '')
  } else if (sensible) {
    l.push('Aucun middleware sur cette route : le contrôleur s\'exécute directement.')
  }
  l.push(`${route.action}()  // page générée`)
  trace.value = l.join('\n')
  statut.value = ligneStatut(200)
  page.value = pageDe(route.action)
  if (!sensible) {
    verdict.value = { ton: 'info', texte: 'Page publique : accessible à tous, c\'est normal.' }
  } else if (s.user && s.user.role === 'admin') {
    verdict.value = { ton: 'info', texte: `Accès normal : ${s.user.nom} est administratrice. Essayez maintenant avec Alice ou un visiteur non connecté.` }
  } else {
    verdict.value = {
      ok: true,
      texte: `Faille : ${s.user ? `${s.user.nom}, simple membre,` : 'un visiteur non connecté'} ouvre ${sansQuery} en tapant l'adresse. Rien ne vérifie le rôle.`,
    }
  }
}

/* ---------- Commun ---------- */
// Remet la démo dans son état de départ (mode, saisies, journal, résultats).
function recommencer() {
  mode.value = props.type === 'logs' ? 'manuel' : 'vulnerable'
  viderSortie()
  if (props.type === 'logs') resetLogs()
  else if (props.type === 'idor') idSaisi.value = '8986'
  else {
    qui.value = 'alice'
    chemin.value = props.type === 'admin' ? '/admin' : '/admin/factures'
    routeTrouvee.value = null
  }
}

// Changer de version rejoue la dernière requête, pour comparer directement.
watch(mode, () => {
  if (props.type === 'idor') {
    if (enumeration.value.length) enumererIdor()
    else if (requete.value) demanderFacture()
  } else if (props.type !== 'logs' && requete.value) {
    naviguer()
  }
})
watch(qui, () => { if (requete.value) naviguer() })

onMounted(recommencer)
</script>

<style scoped>
.form input { width: 100%; }
.form select {
  padding: 0.35rem 0.5rem; border: 1px solid var(--vp-c-divider); border-radius: 4px;
  background: var(--vp-c-bg); color: var(--vp-c-text-1); font-size: 0.95em;
}
.url { display: flex; align-items: stretch; }
.url-fixe {
  padding: 0.35rem 0.5rem; border: 1px solid var(--vp-c-divider); border-right: 0;
  border-radius: 4px 0 0 4px; background: var(--vp-c-bg-alt);
  font-family: var(--vp-font-family-mono); font-size: 0.9em; color: var(--vp-c-text-2); white-space: nowrap;
}
.url input { border-radius: 0 4px 4px 0; }
table { font-size: 0.85em; margin: 0; }
tr.fuite td { color: var(--vp-c-danger-1); font-weight: 600; }
.ecran { margin-top: 0.6rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden; }
.ecran-barre { background: var(--vp-c-bg); padding: 0.3rem 0.6rem; font-size: 0.8em; color: var(--vp-c-text-2); border-bottom: 1px solid var(--vp-c-divider); }
.ecran-page { background: #fff; color: #1b1b1f; padding: 0.6rem 0.8rem; font-size: 0.9em; }
.ecran-page h4 { margin: 0 0 0.4rem; font-size: 1.05em; color: #1b1b1f; }
.ecran-page p { margin: 0.2rem 0; }
.ecran-page table { display: table; width: 100%; border-collapse: collapse; margin: 0.4rem 0 0; }
.ecran-page th, .ecran-page td { border: 1px solid #e2e2e3; padding: 0.25rem 0.5rem; color: #1b1b1f; background: #fff; }
.ecran-page th { background: #f6f6f7; }
.page-erreur { color: #67676c; font-size: 1.2em; letter-spacing: 0.05em; text-align: center; padding: 1.2rem 0; margin: 0; }
.journal-acces {
  margin-top: 0.6rem; border-radius: 4px; background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider); font-family: var(--vp-font-family-mono);
  font-size: 0.8em; max-height: 18rem; overflow: auto;
}
.journal-titre { padding: 0.25rem 0.6rem; color: var(--vp-c-text-2); border-bottom: 1px solid var(--vp-c-divider); }
.ligne { padding: 0.1rem 0.6rem; white-space: pre; }
.ligne.suspecte { background: var(--vp-c-danger-soft); color: var(--vp-c-danger-1); font-weight: 600; }
</style>
